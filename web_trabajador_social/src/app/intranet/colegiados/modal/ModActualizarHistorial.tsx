import ModalCustom from "../../components/ModalCustom";
import { useState, useRef, useEffect, use } from "react";
import ModalHeader from '../../components/ModalHeader';
import toast from "react-hot-toast";
import { alertKit } from "alert-kit";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { ValueMsg } from "../../api/model/interface/valueMsg";
import Lista from "../../api/model/interface/lista";
import { actualizarHabilitacion, registrarHabilitacion } from "../../api/network/ctsp";
import { BusquedaHistorialHabilitacion } from "../../api/model/interface/habilitacion";
import { useUserFromToken } from "../../components/hooks/useUserFromToken";
import { getTodayFormattedYYYYMMDD } from "../../tools/helper";

type Props = {
    // idColegiado: number,

    obj: BusquedaHistorialHabilitacion | null
    title: string
    show: boolean
    loadTable: () => void
    hide: () => void
}

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const INITIAL_FORM_STATE = {
    historial_habilitacion_id: 0,
    fecha_inicio: "",
    fecha_fin: "",
    observacion_actualizacion: "",
    usuario_modifica: 0
};

export default function ModActualizarHistorial(props: Props) {


    const { user } = useUserFromToken();

    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs para los inputs
    // const fechaInicioRef = useRef<HTMLInputElement>(null);
    const fechaFinRef = useRef<HTMLInputElement>(null);
    const observacionActualizacionRef = useRef<HTMLTextAreaElement>(null);

    const abortController = useRef(new AbortController());

    useEffect(() => {
        if (props.show && props.obj) {
            setFormData({
                historial_habilitacion_id: props.obj.historial_habilitacion_id,
                fecha_inicio: props.obj.fecha_inicio,
                fecha_fin: props.obj.fecha_fin,
                observacion_actualizacion: "",
                usuario_modifica: user?.usuario_id ?? 0
            });
        }
        if (!props.show) {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [props.show]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        

        if (!formData.fecha_fin) {
            toast.error('Por favor seleccione la fecha fin');
            fechaFinRef.current?.focus()
            setIsSubmitting(false);
            return;
        }
        if (!formData.observacion_actualizacion) {
            toast.error('Por favor ingrese la observación');
            setIsSubmitting(false);
            observacionActualizacionRef.current?.focus()
            return;
        }

        // Validar que la fecha fin sea mayor a la fecha de inicio
        const fechaInicio = new Date(props.obj?.fecha_inicio ?? "");
        const fechaFin = new Date(formData.fecha_fin);
        const hoy = getTodayFormattedYYYYMMDD()

        // console.log(props.obj?.fecha_inicio ?? "")
        // console.log(formData.fecha_fin)
        //console.log(hoy)

        if (!props.obj?.fecha_inicio) {
            toast.error('No hay fecha de inicio para comparar');
            setIsSubmitting(false);
            return;
        }
        if (formData.fecha_fin < props.obj?.fecha_inicio) {
            toast.error('La fecha fin debe ser mayor o igual a la fecha de inicio');
            fechaFinRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (fechaFin.toDateString() <= hoy) {
            toast.error('La fecha fin debe ser mayor o igual a la fecha de hoy');
            fechaFinRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);

        alertKit.question({
            headerTitle: "Mensaje",
            message: "¿Esta seguro de continuar?",
            onClose: () => {
                // console.log("The alert was closed");
            },
        }, async (value) => {

            if (value) {

                const parsedFormData = {
                    historial_habilitacion_id: formData.historial_habilitacion_id,
                    fecha_fin: formData.fecha_fin,
                    observacion_actualizacion: formData.observacion_actualizacion.trim().toUpperCase(),
                    usuario_modifica: user?.usuario_id ?? 0
                };

                const response = await actualizarHabilitacion<Lista>(parsedFormData, abortController.current)

                if (response instanceof Response) {

                    // console.log(response)

                    const data = response.data.rs as ValueMsg[]

                    if (data[0].value == 1) {
                        alertKit.success({
                            headerTitle: "Mensaje",
                            message: data[0].msg,
                            onClose: () => {
                                //console.log("The alert was closed");
                            },
                        }, () => {
                            props.loadTable?.()
                            props.hide()
                        });
                    }

                    if (data[0].value == 2) {
                        alertKit.warning({
                            headerTitle: "Mensaje",
                            message: data[0].msg,
                            onClose: () => {
                                //console.log("The alert was closed");
                            },
                        }, () => {
                            props.hide()
                        });
                    }

                    if (data[0].value == 0) {
                        alertKit.error({
                            headerTitle: "Mensaje",
                            message: data[0].msg,
                            onClose: () => {
                                //console.log("The alert was closed");
                            },
                        }, () => {
                            //console.log("Success clicked");
                        });
                    }

                }

                if (response instanceof RestError) {
                    //if (response.getType() === Types.CANCELED) return;

                    alertKit.error({
                        headerTitle: "Mensaje",
                        message: "Ocurrio un problema al hacer la operación",
                        onClose: () => {
                            //console.log("The alert was closed");
                        },
                    }, () => {
                        //console.log("Success clicked");
                    });
                }
            }
        });

        setIsSubmitting(false);
    };

    return (
        <ModalCustom
            onOpen={() => { }}
            onHidden={resetForm}
            isOpen={props.show}
            onClose={props.hide}
        >
            <form onSubmit={handleSubmit} className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#15233c] border-0 rounded-2xl shadow-xl bg-clip-border w-[400px]">
                <ModalHeader title={props.title} onClose={props.hide} />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 px-3 py-5">
                    {/* Fecha Inicio */}
                    {/* <div className="relative">
                    <label htmlFor="fecha_inicio" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Fecha Inicio <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      id="fecha_inicio"
                      name="fecha_inicio"
                      value={formData.fecha_inicio}
                      onChange={handleInputChange}
                      ref={fechaInicioRef}
                      className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div> */}

                    {/* Fecha Fin */}
                    <div className="relative">
                        <label htmlFor="fecha_fin" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Fecha Fin <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            id="fecha_fin"
                            name="fecha_fin"
                            value={formData.fecha_fin || ""}
                            onChange={handleInputChange}
                            ref={fechaFinRef}
                            className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                </div>
                <div className="relative px-3 pb-4">
                    <label htmlFor="observacion_actualizacion" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Observación <span className="text-red-500">*</span></label>
                    <textarea
                        id="observacion_actualizacion"
                        name="observacion_actualizacion"
                        value={formData.observacion_actualizacion || ""}
                        onChange={handleInputChange}
                        ref={observacionActualizacionRef}
                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end gap-3 border-t border-gray-400 dark:border-[#33456a] p-3">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-red-500 rounded-lg"
                        onClick={props.hide}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                        disabled={isSubmitting}
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </ModalCustom>
    );
}
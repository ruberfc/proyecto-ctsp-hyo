import ModalCustom from "../../components/ModalCustom";
import { useState, useRef } from "react";
import ModalHeader from '../../components/ModalHeader';
import toast from "react-hot-toast";
import { alertKit } from "alert-kit";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { ValueMsg } from "../../api/model/interface/valueMsg";
import Lista from "../../api/model/interface/lista";
import { registrarHabilitacion } from "../../api/network/ctsp";

type Props = {
    idColegiado: number,
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
    colegiado_id: "",
    fecha_inicio: getToday(),
    fecha_fin: "",
    observacion_registro: ""
};

export default function ModCrearHistorial(props: Props) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs para los inputs
    const fechaInicioRef = useRef<HTMLInputElement>(null);
    const fechaFinRef = useRef<HTMLInputElement>(null);
    const observacionRegistroRef = useRef<HTMLTextAreaElement>(null);

    const abortController = useRef(new AbortController());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
      setFormData({
        colegiado_id: "0",
        fecha_inicio: getToday(),
        fecha_fin: "",
        observacion_registro: ""
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.fecha_fin) {
            toast.error('Por favor seleccione la fecha fin');
            fechaFinRef.current?.focus()
            setIsSubmitting(false);
            return;
        }
        if (!formData.observacion_registro) {
            toast.error('Por favor ingrese la observación');
            setIsSubmitting(false);
            observacionRegistroRef.current?.focus()
            return;
        }

        // Validar que la fecha fin sea mayor a la fecha de inicio
        const fechaInicio = new Date(formData.fecha_inicio);
        const fechaFin = new Date(formData.fecha_fin);
        
        if (fechaFin <= fechaInicio) {
            toast.error('La fecha fin debe ser mayor a la fecha de inicio');
            fechaFinRef.current?.focus()
            setIsSubmitting(false);
            return;
        }

        alertKit.question({
            headerTitle: "Mensaje",
            message: "¿Esta seguro de continuar?",
            onClose: () => {
                // console.log("The alert was closed");
            },
        }, async (value) => {

            if (value) {

                const parsedFormData = {
                    ...formData,

                    colegiado_id: props.idColegiado,
                    observacion_registro: formData.observacion_registro.trim().toUpperCase()
                };

                const response = await registrarHabilitacion<Lista>(parsedFormData, abortController.current)
                    
                if (response instanceof Response) {

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
            onOpen={resetForm}
            onHidden={resetForm}
            isOpen={props.show}
            onClose={props.hide}
        >
            <form onSubmit={handleSubmit} className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#15233c] border-0 rounded-2xl shadow-xl bg-clip-border w-[400px]">
                <ModalHeader title={props.title} onClose={props.hide} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 py-5">
                  {/* Fecha Inicio */}
                  <div className="relative">
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
                  </div>
                  {/* Fecha Fin */}
                  <div className="relative">
                    <label htmlFor="fecha_fin" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Fecha Fin <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="fecha_fin"
                        name="fecha_fin"
                        value={formData.fecha_fin}
                        onChange={handleInputChange}
                        ref={fechaFinRef}
                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="relative px-3 pb-4">
                  <label htmlFor="observacion_registro" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Observación <span className="text-red-500">*</span></label>
                  <textarea
                      id="observacion_registro"
                      name="observacion_registro"
                      value={formData.observacion_registro}
                      onChange={handleInputChange}
                      ref={observacionRegistroRef}
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
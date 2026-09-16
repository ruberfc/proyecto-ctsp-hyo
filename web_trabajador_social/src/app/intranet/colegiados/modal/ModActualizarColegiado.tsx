import ModalCustom from "../../components/ModalCustom";
import { useState, useRef, useEffect } from "react";
import ModalHeader from '../../components/ModalHeader';
import { ColegiadoFiltro, FormActualizarColegiado } from "../../api/model/interface/colegiado";
import toast from "react-hot-toast";
import { actualizarColegiado, especialidadesLista, tiposDocumentoLista } from "../../api/network/ctsp";
import Lista from "../../api/model/interface/lista";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { ValueMsg } from "../../api/model/interface/valueMsg";
import { alertKit } from "alert-kit";
import { Especialidad, TipoDocumento } from "../../api/model/interface/tablas/tablas";
import { useCatalogStore } from '@/store/catalogStore';

type Props = {
    title: string;
    show: boolean;
    loadTable: (forceRefresh?: boolean) => void;
    hide: () => void;
    colFiltro: ColegiadoFiltro | null;
}

const INITIAL_FORM_STATE: FormActualizarColegiado = {
    colegiado_id: 0,
    codigo_colegiado: '',
    tipo_documento_id: 0,
    numero_documento: '',
    nombres: '',
    apellidos: '',
    celular: '',
    correo_personal: '',
    direccion: '',
    sexo: 0,
    fecha_nacimiento: '',
    especialidad_id: 0,
    estado: 0,
};

export default function ModActualizarColegiado(props: Props) {

    const [formData, setFormData] = useState<FormActualizarColegiado>(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [dataTipDoc, setDataTipDoc] = useState<TipoDocumento[]>([]);
    // const [loadTipDoc, setLoadTipDoc] = useState<Boolean>(false);

    const [dataEsp, setDataEsp] = useState<Especialidad[]>([]);
    // const [loadEsp, setLoadEsp] = useState<Boolean>(false);

    // Referencias para los inputs
    const codigoColegiadoRef = useRef<HTMLInputElement>(null);
    const tipoDocumentoRef = useRef<HTMLSelectElement>(null);
    const numeroDocumentoRef = useRef<HTMLInputElement>(null);
    const nombresRef = useRef<HTMLInputElement>(null);
    const apellidosRef = useRef<HTMLInputElement>(null);
    const celularRef = useRef<HTMLInputElement>(null);
    const correoPersonalRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);
    const sexoRef = useRef<HTMLSelectElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const especialidadRef = useRef<HTMLSelectElement>(null);

    const abortController = useRef(new AbortController());
    const { tiposDocumento, especialidades, setTiposDocumento, setEspecialidades } = useCatalogStore();

    // Cargar datos al abrir el modal o cuando colFiltro cambie
    useEffect(() => {
        if (props.show && props.colFiltro) {

            setFormData({
                ...props.colFiltro,

                colegiado_id: props.colFiltro.colegiado_id,

                //Asegurarse de que los campos numéricos se carguen como números
                tipo_documento_id: parseInt(props.colFiltro.tipo_documento_id.toString()),
                sexo: parseInt(props.colFiltro.sexo.toString()),
                especialidad_id: parseInt(props.colFiltro.especialidad_id.toString()),
                estado: props.colFiltro.estado,

            });
        } else if (!props.show) {
            // Resetear el formulario cuando se cierra el modal
            setFormData(INITIAL_FORM_STATE);
        }
    }, [props.show, props.colFiltro]);

    const loadDataTipDoc = async () => {
        if (tiposDocumento.length > 0) {
            setDataTipDoc(tiposDocumento);
            return;
        }

        setDataTipDoc([]);
        // setLoadTipDoc(true);

        const response = await tiposDocumentoLista<Lista>(abortController.current);
        if (response instanceof Response) {
            const data = response.data.rs as TipoDocumento[];
            setDataTipDoc(data);
            setTiposDocumento(data);
        }
        if (response instanceof RestError) {
            console.log(response.getMessage());
        }

        // setLoadTipDoc(false);
    };

    const loadDataEsp = async () => {
        if (especialidades.length > 0) {
            setDataEsp(especialidades);
            return;
        }

        setDataEsp([]);
        // setLoadEsp(true);

        const response = await especialidadesLista<Lista>(abortController.current);
        if (response instanceof Response) {
            const data = response.data.rs as Especialidad[];
            setDataEsp(data);
            setEspecialidades(data);
        }
        if (response instanceof RestError) {
            console.log(response.getMessage());
        }

        // setLoadEsp(false);
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    useEffect(() => {
        if (!props.show) return;

        if (tiposDocumento.length > 0) {
            setDataTipDoc(tiposDocumento);
        } else {
            loadDataTipDoc();
        }

        if (especialidades.length > 0) {
            setDataEsp(especialidades);
        } else {
            loadDataEsp();
        }
    }, [props.show, tiposDocumento, especialidades]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        // Validar campos requeridos
        if (!formData.codigo_colegiado) {
            toast.error('Por favor ingrese el código de colegiado');
            codigoColegiadoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.tipo_documento_id || formData.tipo_documento_id === 0) {
            toast.error('Por favor seleccione un tipo de documento');
            tipoDocumentoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.numero_documento) {
            toast.error('Por favor ingrese el número de documento');
            numeroDocumentoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.apellidos) {
            toast.error('Por favor ingrese los apellidos');
            apellidosRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.nombres) {
            toast.error('Por favor ingrese los nombres');
            nombresRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.celular) {
            toast.error('Por favor ingrese el número de celular');
            celularRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.correo_personal) {
            toast.error('Por favor ingrese el correo personal');
            correoPersonalRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.sexo || formData.sexo === 0) {
            toast.error('Por favor seleccione el sexo');
            sexoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.fecha_nacimiento) {
            toast.error('Por favor seleccione la fecha de nacimiento');
            fechaNacimientoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.especialidad_id || formData.especialidad_id === 0) {
            toast.error('Por favor seleccione la especialidad');
            especialidadRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        alertKit.question({
            headerTitle: "Mensaje",
            message: "¿Esta seguro de actualizar?",
            onClose: () => {
                // console.log("The alert was closed");
            },
        }, async (value) => {
            if (value) {
                const parsedFormData = {
                    ...formData,

                    codigo_colegiado: formData.codigo_colegiado.trim().toUpperCase(),
                    tipo_documento_id: parseInt(formData.tipo_documento_id.toString()),
                    numero_documento: formData.numero_documento.trim().toUpperCase(),
                    apellidos: formData.apellidos.trim().toUpperCase(),
                    nombres: formData.nombres.trim().toUpperCase(),
                    celular: formData.celular.trim().toUpperCase(),
                    correo_personal: formData.correo_personal.trim().toLowerCase(),
                    direccion: formData.direccion.trim().toUpperCase(),
                    sexo: parseInt(formData.sexo.toString()),
                    especialidad_id: parseInt(formData.especialidad_id.toString()),
                    estado: parseInt(formData.estado.toString())
                };

                const response = await actualizarColegiado<Lista>(parsedFormData, abortController.current);

                if (response instanceof Response) {
                    const data = response.data.rs as ValueMsg[];

                    if (data[0].value == 1) {
                        alertKit.success({
                            headerTitle: "Mensaje",
                            message: data[0].msg,
                            onClose: () => {
                                //console.log("The alert was closed");
                            },
                        }, () => {
                            props.loadTable?.(true);
                            props.hide();
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
                            props.loadTable?.(true);
                            props.hide();
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
                            props.hide();
                        });
                    }
                }

                if (response instanceof RestError) {
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
            onOpen={() => {
                loadDataTipDoc();
                loadDataEsp();
            }}
            onHidden={() => {
                resetForm();
            }}
            isOpen={props.show}
            onClose={props.hide}
        >
            <form onSubmit={handleSubmit} className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#15233c] border-0 rounded-2xl shadow-xl bg-clip-border w-[700px]">
                {/* Header */}
                <ModalHeader title={props.title} onClose={props.hide} />

                {/* Body */}
                <div className="px-3 py-5">
                    {/* Formulario para Colegiado */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Código Colegiado */}
                        <div className="relative">
                            <label htmlFor="codigo_colegiado" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Código Colegiado <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="codigo_colegiado"
                                name="codigo_colegiado"
                                value={formData.codigo_colegiado}
                                onChange={handleInputChange}
                                ref={codigoColegiadoRef}
                                className="block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Tipo de documento */}
                        <div className="relative">
                            <label htmlFor="tipo_documento_id" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Tipo de Documento <span className="text-red-500">*</span></label>
                            <select
                                id="tipo_documento_id"
                                name="tipo_documento_id"
                                value={formData.tipo_documento_id}
                                onChange={handleInputChange}
                                ref={tipoDocumentoRef}
                                className="block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="0">SELECCIONE</option>
                                {dataTipDoc.map((item, index) => (
                                    <option key={index} value={item.tipo_documento_id}>
                                        {item.nombre_documento}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Numero de documento */}
                        <div className="relative">
                            <label htmlFor="numero_documento" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Número de Documento <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="numero_documento"
                                name="numero_documento"
                                value={formData.numero_documento}
                                onChange={handleInputChange}
                                ref={numeroDocumentoRef}
                                className="block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Apellidos */}
                                <div className="relative">
                                    <label htmlFor="apellidos" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Apellidos <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="apellidos"
                                        name="apellidos"
                                        value={formData.apellidos}
                                        onChange={handleInputChange}
                                        ref={apellidosRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Nombres */}
                                <div className="relative">
                                    <label htmlFor="nombres" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Nombres <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="nombres"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleInputChange}
                                        ref={nombresRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Celular */}
                                <div className="relative">
                                    <label htmlFor="celular" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Celular <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        id="celular"
                                        name="celular"
                                        value={formData.celular}
                                        onChange={handleInputChange}
                                        ref={celularRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Correo personal */}
                                <div className="relative">
                                    <label htmlFor="correo_personal" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Correo Personal <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        id="correo_personal"
                                        name="correo_personal"
                                        value={formData.correo_personal}
                                        onChange={handleInputChange}
                                        ref={correoPersonalRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Direccion (Full width) */}
                        <div className="md:col-span-3 relative">
                            <label htmlFor="direccion" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                ref={direccionRef}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Sexo, Fecha de nacimiento, y Especialidad in one row */}
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Sexo */}
                                <div className="relative">
                                    <label htmlFor="sexo" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Sexo <span className="text-red-500">*</span></label>
                                    <select
                                        id="sexo"
                                        name="sexo"
                                        value={formData.sexo}
                                        onChange={handleInputChange}
                                        ref={sexoRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="0">SELECCIONE</option>
                                        <option value="1">MASCULINO</option>
                                        <option value="2">FEMENINO</option>
                                    </select>
                                </div>

                                {/* Fecha de nacimiento */}
                                <div className="relative">
                                    <label htmlFor="fecha_nacimiento" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">F. Nacimiento <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        id="fecha_nacimiento"
                                        name="fecha_nacimiento"
                                        value={formData.fecha_nacimiento}
                                        onChange={handleInputChange}
                                        ref={fechaNacimientoRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Especialidad */}
                                <div className="relative">
                                    <label htmlFor="especialidad_id" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Especialidad <span className="text-red-500">*</span></label>
                                    <select
                                        id="especialidad_id"
                                        name="especialidad_id"
                                        value={formData.especialidad_id}
                                        onChange={handleInputChange}
                                        ref={especialidadRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="0">SELECCIONE</option>
                                        {dataEsp.map((item, index) => (
                                            <option key={index} value={item.especialidad_id}>
                                                {item.nombre_especialidad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="md:col-span-1 relative">
                            <label htmlFor="estado" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] px-1 transition-colors duration-200">Estado</label>
                            <div className="px-3 py-1.5 border border-gray-300 dark:border-[#33456a] rounded-lg w-full flex items-center mt-1">
                                <label htmlFor="estado" className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="estado"
                                        className="sr-only peer"
                                        checked={formData.estado === 1}
                                        onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked ? 1 : 0 }))}
                                    />
                                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-4 after:h-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className={`ms-3 text-sm font-medium ${formData.estado === 1 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formData.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-wrap justify-center mt-5 mb-0">
                        <span className="text-sm text-stone-400 dark:text-[#8fa3bf]">
                            Todos los campos con <span className="text-red-500">*</span> son obligatorios
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-400 dark:border-[#33456a] p-3">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </ModalCustom>
    );
} 
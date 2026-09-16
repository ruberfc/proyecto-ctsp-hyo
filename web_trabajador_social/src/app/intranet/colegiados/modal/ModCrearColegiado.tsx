import ModalCustom from "../../components/ModalCustom";
import { useEffect, useRef, useState } from "react";
import ModalHeader from '../../components/ModalHeader';
import { Especialidad, TipoDocumento } from "../../api/model/interface/tablas/tablas";
import { FormRegistrarColegiado } from "../../api/model/interface/colegiado";
import { especialidadesLista, registrarColegiado, tiposDocumentoLista } from "../../api/network/ctsp";
import Lista from "../../api/model/interface/lista";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import toast from "react-hot-toast";
import { alertKit } from "alert-kit";
import { ValueMsg } from "../../api/model/interface/valueMsg";
import { useCatalogStore } from '@/store/catalogStore';

type Props = {
    title: string
    show: boolean
    loadTable: (forceRefresh?: boolean) => void
    hide: () => void
}

const INITIAL_FORM_STATE: FormRegistrarColegiado = {
    codigo_colegiado: "",
    tipo_documento_id: 0,
    numero_documento: "",
    nombres: "",
    apellidos: "",
    celular: "",
    correo_personal: "",
    direccion: "",
    sexo: 0,
    fecha_nacimiento: "",
    especialidad_id: 0,
    usuario_registra: 0,
};

export default function ModCrearColegiado(props: Props) {

    const [formData, setFormData] = useState<FormRegistrarColegiado>(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [dataTipDoc, setDataTipDoc] = useState<TipoDocumento[]>([])
    // const [loadTipDoc, setLoadTipDoc] = useState<Boolean>(false)

    const [dataEsp, setDataEsp] = useState<Especialidad[]>([])
    // const [loadEsp, setLoadEsp] = useState<Boolean>(false)

    const abortController = useRef(new AbortController());

    // Store global de catálogos persistidos en localStorage.
    const { tiposDocumento, especialidades, setTiposDocumento, setEspecialidades } = useCatalogStore();

    // Referencias para los inputs
    const codigoColegiadoRef = useRef<HTMLInputElement>(null);
    const tipoDocumentoIdRef = useRef<HTMLSelectElement>(null);
    const numeroDocumentoRef = useRef<HTMLInputElement>(null);
    const nombresRef = useRef<HTMLInputElement>(null);
    const apellidosRef = useRef<HTMLInputElement>(null);
    const celularRef = useRef<HTMLInputElement>(null);
    const correoPersonalRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);
    const sexoRef = useRef<HTMLSelectElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const especialidadIdRef = useRef<HTMLSelectElement>(null);

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loadDataTipDoc = async () => {
        if (tiposDocumento.length > 0) {
            // Si ya tenemos los tipos de documento en el store, los reutilizamos.
            setDataTipDoc(tiposDocumento);
            return;
        }

        setDataTipDoc([])
        // setLoadTipDoc(true)

        const response = await tiposDocumentoLista<Lista>(abortController.current)
        if (response instanceof Response) {
            const data = response.data.rs as TipoDocumento[]
            setDataTipDoc(data)
            setTiposDocumento(data)
        }
        if (response instanceof RestError) {
            console.log(response.getMessage())
        }

        // setLoadTipDoc(false)
    }


    const loadDataEsp = async () => {
        if (especialidades.length > 0) {
            // Reutilizar el catálogo de especialidades ya cargado.
            setDataEsp(especialidades);
            return;
        }

        setDataEsp([])
        // setLoadEsp(true)

        const response = await especialidadesLista<Lista>(abortController.current)
        if (response instanceof Response) {
            const data = response.data.rs as Especialidad[]
            setDataEsp(data)
            setEspecialidades(data)
        }
        if (response instanceof RestError) {
            console.log(response.getMessage())
        }

        // setLoadEsp(false)
    }

    useEffect(() => {
        if (!props.show) return;

        // Cuando se abre el modal, usamos primero el store cacheado.
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        // Validar campos requeridos
        if (!formData.codigo_colegiado || formData.codigo_colegiado === "") {
            toast.error('Por favor ingrese el código');
            codigoColegiadoRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.tipo_documento_id || formData.tipo_documento_id === 0 || formData.tipo_documento_id.toString() === '0') {
            toast.error('Por favor seleccione un tipo de documento');
            tipoDocumentoIdRef.current?.focus();
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

        if (!formData.sexo || formData.sexo === 0 || formData.sexo.toString() === '0') {
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

        if (!formData.especialidad_id || formData.especialidad_id === 0 || formData.especialidad_id.toString() === '0') {
            toast.error('Por favor seleccione la especialidad');
            especialidadIdRef.current?.focus();
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

                    codigo_colegiado: formData.codigo_colegiado.trim().toUpperCase(),
                    tipo_documento_id: parseInt(formData.tipo_documento_id.toString()),
                    numero_documento: formData.numero_documento.trim().toUpperCase(),
                    apellidos: formData.apellidos.trim().toUpperCase(),
                    nombres: formData.nombres.trim().toUpperCase(),
                    celular: formData.celular.trim().toUpperCase(),
                    correo_personal: formData.correo_personal.trim(),
                    direccion: formData.direccion.trim().toUpperCase(),
                    sexo: parseInt(formData.sexo.toString()),
                    especialidad_id: parseInt(formData.especialidad_id.toString())
                };

                const response = await registrarColegiado<Lista>(parsedFormData, abortController.current)
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
                            props.loadTable?.(true)
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

        setIsSubmitting(false)

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
            <form onSubmit={handleSubmit} className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#15233c] border-0 rounded-2xl shadow-xl bg-clip-border w-[650px]">
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
                                onChange={(event) => {
                                    const selectedId = parseInt(event.currentTarget.value);
                                    //setIdTipDoc(selectedId);
                                    setFormData(prev => ({
                                        ...prev,
                                        tipo_documento_id: selectedId
                                    }));
                                }}
                                ref={tipoDocumentoIdRef}
                                className="block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value={0}>SELECCIONE</option>
                                {
                                    dataTipDoc.map((item, index) => {
                                        return (
                                            <option key={index} value={item.tipo_documento_id}>
                                                {item.nombre_documento}
                                            </option>
                                        );
                                    })
                                }

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
                            <label htmlFor="direccion" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Dirección </label>
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
                                        onChange={(event) => {
                                            const selectedId = parseInt(event.currentTarget.value);

                                            setFormData(prev => ({
                                                ...prev,
                                                especialidad_id: selectedId
                                            }));
                                        }}
                                        ref={especialidadIdRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value={0}>SELECCIONE</option>
                                        {
                                            dataEsp.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.especialidad_id}>
                                                        {item.nombre_especialidad}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Estado in one column, spanning 2 cols */}
                        {/* <div className="md:col-span-2 relative">
                           <label htmlFor="Estado" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Estado <span className="text-red-500">*</span></label>
                           <select
                                id="Estado"
                                name="Estado"
                                value={formData.es}
                                onChange={handleInputChange}
                                required
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="">SELECCIONE</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div> */}

                    </div>

                    <div className="relative flex flex-wrap justify-center mt-5 mb-0">
                        <span className="text-sm text-gray-500 dark:text-[#8fa3bf]">
                            Todos los campos con <span className="text-red-500">*</span> son obligatorios
                        </span>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-400 dark:border-[#33456a] p-3">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-red-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-500"
                        onClick={props.hide}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </ModalCustom>
    )
}
import ModalCustom from "../../components/ModalCustom";
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalHeader from '../../components/ModalHeader';
import { UsuarioFiltro, FormActualizarUsuario } from "../../api/model/interface/usuario";
import toast from "react-hot-toast";
import { actualizarUsuario } from "../../api/network/ctsp"; // Asumimos esta función
import Lista from "../../api/model/interface/lista";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { ValueMsg } from "../../api/model/interface/valueMsg";
import { alertKit } from "alert-kit";

type Props = {
    title: string;
    show: boolean;
    loadTable: (forceRefresh?: boolean) => void;
    hide: () => void;
    useFiltro: UsuarioFiltro | null

}

const INITIAL_FORM_STATE: FormActualizarUsuario = {
    tipo_documento_id: 0,
    numero_documento: '',
    nombres: '',
    apellidos: '',
    celular: '',
    correo_personal: '',
    direccion: '',
    rol_id: 0,
    sexo: 0,
    fecha_nacimiento: '',
    usuario: '',
    clave: '',
    estado: false,
    usuario_id: 0
};

export default function ModActualizarUsuario(props: Props) {

    //console.log(props.useFiltro)

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormActualizarUsuario>(INITIAL_FORM_STATE);
    const [_isSubmitting, setIsSubmitting] = useState(false);

    // Referencias para los inputs
    const tipoDocumentoRef = useRef<HTMLSelectElement>(null);
    const numeroDocumentoRef = useRef<HTMLInputElement>(null);
    const nombresRef = useRef<HTMLInputElement>(null);
    const apellidosRef = useRef<HTMLInputElement>(null);
    const celularRef = useRef<HTMLInputElement>(null);
    const correoPersonalRef = useRef<HTMLInputElement>(null);
    const direccionRef = useRef<HTMLInputElement>(null);
    const rolRef = useRef<HTMLSelectElement>(null);
    const sexoRef = useRef<HTMLSelectElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const usuarioRef = useRef<HTMLInputElement>(null);
    const claveRef = useRef<HTMLInputElement>(null);


    const abortController = useRef(new AbortController());

    // Cargar datos al abrir el modal o cuando useFiltro cambie
    useEffect(() => {
        if (props.show && props.useFiltro) {
            setFormData({
                ...props.useFiltro,
                // Asegurarse de que los campos numéricos se carguen como números
                tipo_documento_id: parseInt(props.useFiltro.tipo_documento_id.toString()),
                rol_id: parseInt(props.useFiltro.rol_id.toString()),
                sexo: parseInt(props.useFiltro.sexo.toString()),

                // Convertir estado de number (1/0) a boolean (true/false)
                estado: props.useFiltro.estado === 1,
                // La clave no se carga para seguridad, se deja vacía para que el usuario la cambie si lo desea
                // clave: '',

                usuario_id: props.useFiltro.usuario_id // Aseguramos que usuario_id se copie
            });
        } else if (!props.show) {
            // Resetear el formulario cuando se cierra el modal
            setFormData(INITIAL_FORM_STATE);
        }
    }, [props.show, props.useFiltro]);


    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

        // Validar campos requeridos (podría ajustarse para actualización)
        if (!formData.tipo_documento_id || formData.tipo_documento_id === 0 || formData.tipo_documento_id.toString() === '0') {
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

        if (!formData.rol_id || formData.rol_id === 0 || formData.rol_id.toString() === '0') {
            toast.error('Por favor seleccione un rol');
            rolRef.current?.focus();
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

        // El usuario y la clave podrían ser opcionales en una actualización,
        // o la clave podría manejarse en un campo separado si no se requiere reintroducirla
        if (!formData.usuario) {
            toast.error('Por favor ingrese el nombre de usuario');
            usuarioRef.current?.focus();
            setIsSubmitting(false);
            return;
        }

        if (!formData.clave) {
            toast.error('Por favor ingrese la contraseña');
            claveRef.current?.focus();
            setIsSubmitting(false);
            return;
        }


        alertKit.question({
            headerTitle: "Mensaje",
            message: "¿Esta seguro de actualizar?", // Mensaje de actualización
            onClose: () => {
                // console.log("The alert was closed");
            },
        }, async (value) => {

            if (value) {

                const parsedFormData = {
                    ...formData,

                    tipo_documento_id: parseInt(formData.tipo_documento_id.toString()),
                    numero_documento: formData.numero_documento.trim().toUpperCase(),
                    apellidos: formData.apellidos.trim().toUpperCase(),
                    nombres: formData.nombres.trim().toUpperCase(),
                    celular: formData.celular.trim().toUpperCase(),
                    correo_personal: formData.correo_personal.trim().toLowerCase(),
                    direccion: formData.direccion.trim().toUpperCase(),

                    rol_id: parseInt(formData.rol_id.toString()),
                    sexo: parseInt(formData.sexo.toString()),

                    usuario: formData.usuario.trim(),
                    clave :formData.clave.trim()
                };

                // Si la clave está vacía, no la enviamos para no sobrescribir una existente
                // Esto es una suposición común para actualizaciones
                //const finalFormData = formData.clave ? parsedFormData : { ...parsedFormData, clave: '' };

                //console.log("Parsed FormData before sending:", parsedFormData); // Para depuración
                //return;

                const response = await actualizarUsuario<Lista>(parsedFormData, abortController.current)

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
                            props.loadTable?.(true)
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
                            props.hide() // Solo ocultar, no recargar si hay error de validación del backend
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
            onOpen={() => { }}
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

                    {/* Formulario para usuario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <option value="1">DNI</option>
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
                                maxLength={12}
                                className="block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Apellidos (Full width) */}
                        <div className="relative">
                            <label htmlFor="apellidos" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Apellidos <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleInputChange}
                                ref={apellidosRef}
                                maxLength={150}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="nombres" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Nombres <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleInputChange}
                                ref={nombresRef}
                                maxLength={150}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

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
                                maxLength={15}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Correo personal */}
                        <div className="relative">
                            <label htmlFor="correo_personal" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Correo Personal</label>
                            <input
                                type="email"
                                id="correo_personal"
                                name="correo_personal"
                                value={formData.correo_personal}
                                onChange={handleInputChange}
                                ref={correoPersonalRef}
                                maxLength={100}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Direccion (Full width) */}
                        <div className="md:col-span-2 relative">
                            <label htmlFor="direccion" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                ref={direccionRef}
                                maxLength={250}
                                className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Sexo, Fecha de nacimiento, y Rol in one row */}
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Rol */}
                                <div className="relative">
                                    <label htmlFor="rol_id" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Rol <span className="text-red-500">*</span></label>
                                    <select
                                        id="rol_id"
                                        name="rol_id"
                                        value={formData.rol_id}
                                        onChange={handleInputChange}
                                        ref={rolRef}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="0">SELECCIONE</option>
                                        <option value="2">ADMINISTRADOR</option>
                                        {/* <option value="USER">Usuario</option>
                                        <option value="SOCIAL_WORKER">Trabajador Social</option> */}
                                    </select>
                                </div>

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
                            </div>
                        </div>

                        {/* Usuario, Contraseña, y Estado in one row */}
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                {/* Usuario */}
                                <div className="relative">
                                    <label htmlFor="usuario" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Usuario <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        name="usuario"
                                        value={formData.usuario}
                                        onChange={handleInputChange}
                                        ref={usuarioRef}
                                        maxLength={25}
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 px-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Contraseña */}
                                <div className="relative">
                                    <label htmlFor="clave" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] peer-focus:text-blue-600 dark:peer-focus:text-blue-400 px-1 transition-colors duration-200">Contraseña</label> {/* Clave no es obligatoria para actualizar */}
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="clave"
                                        name="clave"
                                        value={formData.clave}
                                        onChange={handleInputChange}
                                        ref={claveRef}
                                        maxLength={25}
                                        autoComplete="current-password"
                                        placeholder="Dejar vacío para no cambiar" // Indicamos que no es obligatoria
                                        className="peer block w-full border border-gray-300 dark:border-[#33456a] rounded-md py-2 pl-3 text-sm dark:bg-[#101e33] dark:text-[#e3e9f3] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-[#8fa3bf] hover:text-gray-600 dark:hover:text-[#e3e9f3] transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <FaEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Estado */}
                                <div className="relative">
                                    <label htmlFor="estado-toggle" className="absolute top-[-10px] left-3 bg-white dark:bg-[#15233c] text-sm text-gray-500 dark:text-[#8fa3bf] px-1 transition-colors duration-200">Estado</label>
                                    <div className="px-3 py-1.5 border border-gray-300 dark:border-[#33456a] rounded-lg w-full flex items-center mt-1">
                                        <label htmlFor="estado-toggle" className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id="estado-toggle"
                                                className="sr-only peer"
                                                checked={formData.estado}
                                                onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.checked }))}
                                            />
                                            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-4 after:h-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                            <span className={`ms-3 text-sm font-medium ${formData.estado ? 'text-green-600' : 'text-red-600'}`}>
                                                {formData.estado ? 'ACTIVO' : 'INACTIVO'}
                                            </span>
                                        </label>
                                    </div>
                                </div>

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
                    {/* <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-red-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-500"
                        onClick={props.hide}
                    >
                        Cancelar
                    </button> */}
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </ModalCustom>
    )
}

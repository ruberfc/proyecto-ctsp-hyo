import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { ColegiadoFiltro } from "../api/model/interface/colegiado"

type Props = {
    info: ColegiadoFiltro | null,
    children?: React.ReactNode
}

const CardDatosColegiado = (props: Props) => {
    return (
        <div className="border-t-6 border-blue-500 rounded-xl bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 dark:from-[#15233c] dark:via-[#1a2a45] dark:to-[#1f2f4a] p-4 shadow-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {/* Columna izquierda */}
                <div className="flex flex-col gap-2 text-sm">
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">CÓDIGO: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.codigo_colegiado}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">COLEGIADO: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.apellidos} {props.info?.nombres}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">ESPECIALIDAD: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.nombre_especialidad}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">ESTADO: </span>
                        <span className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full shadow-sm ${props.info?.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {props.info?.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                            {props.info?.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                    </div>
                </div>
                {/* Columna derecha */}
                <div className="flex flex-col gap-2 text-sm">
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">CELULAR: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.celular}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">CORREO: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.correo_personal}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-[#8fa3bf] uppercase tracking-wide">DIRECCIÓN: </span>
                        <span className="text-blue-700 dark:text-blue-400 font-bold">{props.info?.direccion}</span>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default CardDatosColegiado
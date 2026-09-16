import { ColegiadoFiltro } from "../../api/model/interface/colegiado";

import TitleDetalleCard from "../../components/TitleDetalleCard";
import CardDatosColegiado from "../../components/CardDataColegiado";
import { HiClipboardList } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { BusquedaHistorialHabilitacion } from "../../api/model/interface/habilitacion";
import { FaCheckCircle, FaEdit, FaLock, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import Lista from "../../api/model/interface/lista";
import Response from "../../api/model/class/response";
import RestError from "../../api/model/class/restError";
import { buscarHabilitacionesColegiado } from "../../api/network/ctsp";
import Loading from "../../components/Loading";
// import { RiExchangeFill } from "react-icons/ri";
import ModCrearHistorial from "../modal/ModCrearHistorial";
import { formatAndValidateDate, formatRegistrationDate, formatRegistrationTime } from "../../tools/helper";
import ModActualizarHistorial from "../modal/ModActualizarHistorial";
import { Tooltip } from "react-tooltip";

type Props = {
    hide: () => void;
    colFiltro: ColegiadoFiltro | null;
}

export default function HistorialHabilitacion(props: Props) {

    const [dataHisHab, setDataHisHab] = useState<BusquedaHistorialHabilitacion[]>([])
    const [loadTable, setLoadTable] = useState<boolean>(false)

    const [obj, setObj] = useState<BusquedaHistorialHabilitacion | null>(null)

    const abortController = useRef(new AbortController());


    // Modal Crear
    const [isOpenModalCre, setIsOpenModalCre] = useState(false)

    const handleOpenModalCre = () => {
        setIsOpenModalCre(true);
    };

    const handleCloseModalCre = () => {
        setIsOpenModalCre(false);
    };

    // Modal Actualizar
    const [isOpenModalAct, setIsOpenModalAct] = useState(false)

    const handleOpenModalAct = (obj: BusquedaHistorialHabilitacion) => {
        setObj(obj);
        setIsOpenModalAct(true);
    };

    const handleCloseModalAct = () => {
        setIsOpenModalAct(false);
    };

    useEffect(() => {
        if (props.colFiltro && props.colFiltro.colegiado_id != null) {
            LoadData(props.colFiltro.colegiado_id);
        }
    }, [props.colFiltro]);

    const LoadData = async (id: number) => {

        setDataHisHab([])
        setLoadTable(true)

        const response = await buscarHabilitacionesColegiado<Lista>(id, abortController.current)
        if (response instanceof Response) {

            const data = response.data.rs as BusquedaHistorialHabilitacion[]
            setDataHisHab(data)

        }
        if (response instanceof RestError) {
            //if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

        setLoadTable(false)
    }

    const reloadTable = () => {
        if (props.colFiltro?.colegiado_id != null) {
            LoadData(props.colFiltro.colegiado_id);
        }
    };

    return (
        <>
            <TitleDetalleCard title={"Historial de Habilitaciones"} hide={props.hide} />

            <CardDatosColegiado info={props.colFiltro}>
                <div className="flex">
                    <button
                        className="mt-1 mr-2 flex items-center rounded border-md p-2 text-xs font-semibold border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                        onClick={() => handleOpenModalCre()}
                    >
                        <FaPlusCircle className="w-4 h-4 mr-1.5" /> NUEVO
                    </button>
                </div>

            </CardDatosColegiado>

            {/* Cuerpo */}

            <h2 className="text-lg font-semibold text-gray-600 dark:text-[#8fa3bf] mb-2 flex items-center gap-2 mt-5"><HiClipboardList className="w-5 h-5 " /> Lista de Historial</h2>
            <div className="overflow-x-auto shadow-sm rounded-lg mb-2">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-[#263551]">
                    <thead className="bg-blue-600">
                        <tr>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Inicio</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Fin</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Observacion</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha Registro</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Usuario Registro</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-2 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#15233c] divide-y divide-gray-200 dark:divide-[#263551]">

                        {
                            loadTable ? (
                                <tr className="text-center bg-white dark:bg-[#15233c] hover:bg-gray-50 dark:hover:bg-[#1f2f4a]">
                                    <td colSpan={8} className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loading /> <span className="text-gray-600 dark:text-[#8fa3bf]">Cargando datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                dataHisHab.length == 0 ? (
                                    <tr className="text-center bg-white dark:bg-[#15233c] hover:bg-gray-50 dark:hover:bg-[#1f2f4a]">
                                        <td colSpan={8} className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-gray-600 dark:text-[#8fa3bf] uppercase">No hay datos disponibles</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    dataHisHab.map((item, index) => (
                                        <tr key={item.historial_habilitacion_id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-[#1a2a45]' : 'bg-white dark:bg-[#15233c]'} hover:bg-blue-50 dark:hover:bg-[#1f2f4a] transition duration-150 ease-in-out`} data-tooltip-id={`history-${item.historial_habilitacion_id}`}>
                                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-[#e8edf5]">
                                                <span
                                                    data-tooltip-id={`history-${item.historial_habilitacion_id}`}
                                                    className="font-bold uppercase text-upla-100 text-[12px] cursor-pointer ml-2"
                                                >
                                                    {index + 1}
                                                </span>
                                                <Tooltip
                                                    id={`history-${item.historial_habilitacion_id}`}
                                                    opacity={1}
                                                    arrowColor="blue"
                                                    variant="light"
                                                    className="border-2 border-blue-500 z-50"
                                                    place="bottom"
                                                >
                                                    <div className="flex flex-col py-1 gap-1">
                                                        <span className='font-bold uppercase text-blue-500 text-[12px]'> <span className="text-gray-800 font-normal">OBS. ACTUALIZACIÓN:</span> {`${item.observacion_actualizacion}`}</span>
                                                        <span className='font-bold uppercase text-blue-500 text-[12px]'> <span className="text-gray-800 font-normal">OBS. ESTADO:</span> {`${item.observacion_estado}`}</span>
                                                    </div>
                                                </Tooltip>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-[#e3e9f3]">
                                                <div className="text-center">{item.fecha_inicio === "1900-01-01" ? "-" : formatAndValidateDate(item.fecha_inicio)}</div>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap text-sm font-bold text-blue-700 dark:text-blue-400">
                                                <span className="text-center">{item.fecha_fin === "1900-01-01" ? "-" : formatAndValidateDate(item.fecha_fin)}</span>
                                            </td>
                                            <td className="2 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-[#c2cfe2]">{item.observacion_registro}</td>
                                            <td className="2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">
                                                {formatRegistrationDate(item.fecha_registra)} - {formatRegistrationTime(item.fecha_registra)}
                                            </td>
                                            <td className="2 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-[#c2cfe2]">{item.nombre_completo_usuario} { }</td>
                                            <td className="2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">
                                                <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                                    {item.estado === 1 ? 'HABILITADO' : 'INABILITADO'}
                                                </span>
                                            </td>
                                            <td className="2 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        //disabled={item.estado !== 1}
                                                        className={`text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105 ${item.estado !== 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        title="Editar"
                                                        onClick={() => handleOpenModalAct(item)}
                                                    >
                                                        {item.estado !== 1 ? <FaLock className="w-4 h-4 text-gray-400" /> : <FaEdit className="w-4 h-4" />}
                                                    </button>

                                                    {/* <button
                                                        disabled={item.estado !== 1}
                                                        className={`text-sky-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-sky-500 shadow-sm hover:shadow-md transform hover:scale-105 ${item.estado !== 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                        title="Detalle"
                                                    >
                                                        {item.estado !== 1 ? <FaLock className="w-4 h-4 text-gray-400" /> : <RiExchangeFill className="w-4 h-4" />}
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>


            <ModCrearHistorial title="Registrar Habilitación" show={isOpenModalCre} hide={handleCloseModalCre} loadTable={reloadTable} idColegiado={props.colFiltro?.colegiado_id ?? 0} />
            <ModActualizarHistorial title="Actualizar Habilitación" show={isOpenModalAct} hide={handleCloseModalAct} loadTable={reloadTable} obj={obj} />

        </>
    )
}
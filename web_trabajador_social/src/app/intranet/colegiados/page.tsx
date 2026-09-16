"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import ContentCard from '../components/ContentCard';
import { FaSearch, FaEdit, FaPlusCircle, FaUsers, FaCheckCircle, FaTimesCircle, FaList, FaFileExcel, FaTable, FaThLarge, FaEnvelope, FaBriefcase, FaPhone, FaMars, FaVenus } from 'react-icons/fa'; // Import icons
import { MdOutlineTabletAndroid } from "react-icons/md";
import TitleCard from '../components/TitleCard';
import { IoReloadCircle } from 'react-icons/io5';
import ModCrearColegiado from './modal/ModCrearColegiado';
import { ColegiadoFiltro } from '../api/model/interface/colegiado';
import Lista from '../api/model/interface/lista';
import Response from '../api/model/class/response';
import RestError from '../api/model/class/restError';
import { buscarcolegiadointranet } from '../api/network/ctsp';
import Loading from '../components/Loading';
import ModActualizarColegiado from './modal/ModActualizarColegiado';
import { useColegiadosStore } from '@/store/colegiadosStore';

import ModuloHistorialHabilitacion from './modulo/HistorialHabilitacion'
import { formatAndValidateDate, getTodayFormattedYYYYMMDD } from '../tools/helper';
import toast from 'react-hot-toast';
import { useUserFromToken } from '../components/hooks/useUserFromToken';
import { exportToExcelJSColegiados } from '../api/reporteExcel/colegiados';
import { Tooltip } from 'react-tooltip';
import { FaTableCells } from 'react-icons/fa6';

export default function ColegiadoPage() {

  const { user } = useUserFromToken();

  const [inputBusqueda, setInputBusqueda] = useState<string>('');

  const [loadTable, setLoadTable] = useState<boolean>(false);
  const [dataColegiado, setDataColegiado] = useState<ColegiadoFiltro[]>([]);

  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const [objColegiado, setObjColegiado] = useState<ColegiadoFiltro | null>(null);

  const refInputBusqueda = useRef<HTMLInputElement>(null)

  const abortController = useRef(new AbortController());

  const { cachedColegiados, lastSearchOption, lastSearchValue, setCachedColegiados, clearCachedColegiados } = useColegiadosStore();


  useEffect(() => {
    // Si ya existe información en cache,
    // reutilizamos el último resultado obtenido.
    if (cachedColegiados.length > 0) {

      // console.log("ColegiadoPage useEffect: Reutilizando cache de colegiados.");
      setDataColegiado(cachedColegiados);
      return;
    }

    // Si no existe cache, hacemos la primera consulta al backend.
    // console.log("ColegiadoPage useEffect: Cargando datos iniciales desde el backend.");

    LoadData(0, '');
  }, []);

  const resumen = useMemo(() => {
    const total = dataColegiado.length;
    const activos = dataColegiado.filter(c => c.estado === 1).length;
    const inactivos = total - activos;
    const habilitados = dataColegiado.filter(c => c.habilitacion === 1).length;
    const inhabilitados = total - habilitados;
    const masculinos = dataColegiado.filter(c => c.sexo === 1).length;
    const femeninos = dataColegiado.filter(c => c.sexo === 2).length;
    return { total, activos, inactivos, habilitados, inhabilitados, masculinos, femeninos };
  }, [dataColegiado]);

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

  const handleOpenModalAct = (c: ColegiadoFiltro) => {
    setObjColegiado(c)
    setIsOpenModalAct(true);
  };

  const handleCloseModalAct = () => {
    setIsOpenModalAct(false);
  };

  //Modulo Historial Habilitacion
  const [isModuloHistorial, setIsmoduloHistorial] = useState<boolean>(false);
  const handleOpenModuloHistorial = (obj: ColegiadoFiltro) => {
    setIsmoduloHistorial(true)

    setObjColegiado(obj)
  }

  const handleCloseModuloHistorial = () => {
    setIsmoduloHistorial(false)
  }


  const handleSearch = () => {
    if (inputBusqueda == "") {
      refInputBusqueda.current?.focus()
      return
    }
    LoadData(1, inputBusqueda.trim())
  };

  const handleRecharge = (forceRefresh: boolean = false) => {
    setInputBusqueda('')
    LoadData(0, "", forceRefresh)
  }

  const LoadData = async (opcion: number, busquedaInput: string, forceRefresh: boolean = false) => {

    setDataColegiado([]);
    setLoadTable(true);

    const obj = {
      tipo_busqueda: opcion,
      busqueda: busquedaInput
    };

    try {

      // =====================================================
      // 1. VERIFICAR SI PODEMOS REUTILIZAR EL CACHE
      // =====================================================
      if (
        !forceRefresh &&
        cachedColegiados.length > 0 &&
        lastSearchOption === opcion &&
        lastSearchValue === busquedaInput
      ) {

        // console.log("LoadData: Reutilizando cache de colegiados.");
        setDataColegiado(cachedColegiados);
        return;
      }

      // =====================================================
      // 2. CONSULTAR BACKEND
      // =====================================================

      // console.log("LoadData: Consultando información desde el backend.", { opcion, busquedaInput, forceRefresh });
      const response = await buscarcolegiadointranet<Lista>(obj, abortController.current);

      // =====================================================
      // 3. PROCESAR RESPUESTA EXITOSA
      // =====================================================
      if (response instanceof Response) {

        const data = response.data.rs as ColegiadoFiltro[];

        // Actualizar tabla
        setDataColegiado(data);

        // Actualizar cache
        setCachedColegiados(data, opcion, busquedaInput);

        return;
      }

      // =====================================================
      // 4. PROCESAR ERROR
      // =====================================================
      if (response instanceof RestError) {
        console.error("LoadData: Error al obtener colegiados:", response.getMessage());
      }

    } catch (error) {
      console.error("LoadData: Error inesperado:", error);
    } finally {
      // Siempre quitar el loading
      setLoadTable(false);
    }

  };

  const handleExportExcel = () => {

    if (user == null) {
      toast.error("No se pudo cargar los datos del usuario actual")
      return;
    }

    if (dataColegiado.length == 0) {
      toast.error("No haya registros para exportar")
      return;
    }

    try {
      // Lógica de exportación a Excel irá aquí
      exportToExcelJSColegiados(dataColegiado, `Reporte_Excel_Colegiados ${getTodayFormattedYYYYMMDD()}`, user.numero_documento, `${user.apellidos} ${user.nombres}`)
      toast.success("Excel generado exitosamente")
    } catch (err) {
      toast.error((err as Error).message || "Ocurrió un error al generar el Excel");
    }

  }

  const getInitials = (item: ColegiadoFiltro) => {
    const a = (item.apellidos ?? '').trim().charAt(0) || '';
    const n = (item.nombres ?? '').trim().charAt(0) || '';
    return (a + n).toUpperCase() || 'CT';
  };

  return (
    <ContentCard>

      {
        isModuloHistorial === true ? (
          <ModuloHistorialHabilitacion colFiltro={objColegiado} hide={handleCloseModuloHistorial} />
        ) : (
          <>

            <TitleCard title="Colegiados" />


            <div className="mb-5 flex flex-col md:flex-row items-stretch md:items-center gap-y-2 md:gap-y-0 md:gap-x-4">
              <div className="flex flex-row md:flex-grow">
                <input
                  type="text"
                  placeholder="Buscar de colegiado por dni o apellido paterno"
                  value={inputBusqueda}
                  onChange={(e) => setInputBusqueda(e.target.value)}
                  className="flex-grow px-3 py-1.5 text-sm border border-gray-300 dark:border-[#33456a] dark:bg-[#101e33] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-gray-600 text-white rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleRecharge(true)}
                className="w-full md:w-auto flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-stone-600 text-white rounded-lg hover:bg-stone-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-stone-500 transition duration-150 ease-in-out"
              >
                <IoReloadCircle className="w-4 h-4 mr-1.5" />
                Recargar
              </button>
              <button
                onClick={handleOpenModalCre}
                className="w-full md:w-auto flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <FaPlusCircle className="w-4 h-4 mr-1.5" />
                Nuevo
              </button>
              <button
                onClick={handleExportExcel}
                className="w-full md:w-auto flex-shrink-0 flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out ml-2"
              >
                <FaFileExcel className="w-5 h-5 mr-1.5" />
                Excel
              </button>

            </div>

            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-lg font-semibold text-gray-600 dark:text-[#8fa3bf] flex items-center gap-2">
                  <FaUsers className="w-5 h-5" /> Lista de Colegiados
                </h2>

                {/* Mini cards de resumen */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 text-white border border-blue-400 dark:border-emerald-400/50 shadow-md shadow-blue-500/30 dark:shadow-emerald-500/20">
                    Total: <span className="font-bold">{resumen.total}</span>
                  </span>
                  {/* <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                    <FaCheckCircle className="w-3 h-3" /> Activos: {resumen.activos}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                    <FaTimesCircle className="w-3 h-3" /> Inactivos: {resumen.inactivos}
                  </span> */}
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                    <FaCheckCircle className="w-3 h-3" /> Habilitados: {resumen.habilitados}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30">
                    <FaTimesCircle className="w-3 h-3" /> Inhabilitados: {resumen.inhabilitados}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-300 dark:border-fuchsia-500/40">
                    <FaVenus className="w-3.5 h-3.5" /> Mujeres: {resumen.femeninos}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-500/40">
                    <FaMars className="w-3.5 h-3.5" /> Varones: {resumen.masculinos}
                  </span>
                </div>
              </div>

              {/* Botón único de cambio de vista Tabla / Tarjetas */}
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500/40 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-200"
                aria-label={viewMode === 'table' ? 'Cambiar a vista de tarjetas' : 'Cambiar a vista de tabla'}
                title={viewMode === 'table' ? 'Cambiar a vista de tarjetas' : 'Cambiar a vista de tabla'}
              >
                {viewMode === 'table' ? (
                  <>
                    <FaThLarge className="w-3.5 h-3.5" />
                    <span>Tarjetas</span>
                  </>
                ) : (
                  <>
                    <FaTable className="w-3.5 h-3.5" />
                    <span>Tabla</span>
                  </>
                )}
              </button>
            </div>

            {viewMode === 'table' ? (
              <div className="overflow-x-auto shadow-sm rounded-lg mb-2">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-[#263551]">
                  <thead className="bg-blue-600">
                    <tr>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Código</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">N° Documento / Nombre</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Especialidad</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Habilidad</th>
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
                        dataColegiado.length == 0 ? (
                          <tr className="text-center bg-white dark:bg-[#15233c] hover:bg-gray-50 dark:hover:bg-[#1f2f4a]">
                            <td colSpan={8} className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-gray-600 dark:text-[#8fa3bf] uppercase">No hay datos disponibles</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          dataColegiado.map((item, index) => (
                            <tr key={item.colegiado_id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-[#1a2a45]' : 'bg-white dark:bg-[#15233c]'} hover:bg-blue-50 dark:hover:bg-[#1f2f4a] transition duration-150 ease-in-out`} data-tooltip-id={`colegiado-${item.colegiado_id}`}>
                              <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-[#e8edf5]">
                                <span
                                  data-tooltip-id={`colegiado-${item.colegiado_id}`}
                                  className="font-bold uppercase text-upla-100 text-[12px] cursor-pointer ml-2"
                                >
                                  {index + 1}
                                </span>
                                <Tooltip
                                  id={`colegiado-${item.colegiado_id}`}
                                  opacity={1}
                                  arrowColor="blue"
                                  variant="light"
                                  className="border-2 border-blue-500 z-50"
                                  place="bottom"
                                >
                                  <div className="flex flex-col py-1 gap-1">
                                    <span className='font-bold uppercase text-blue-500 text-[12px]'> <span className="text-gray-800 font-normal">CELULAR:</span> {`${item.celular ?? ''}`}</span>
                                    <span className='font-bold uppercase text-blue-500 text-[12px]'> <span className="text-gray-800 font-normal">DIRECCIÓN:</span> {`${item.direccion ?? ''}`}</span>
                                  </div>
                                </Tooltip>

                              </td>
                              <td className="px-2 py-2 whitespace-nowrap text-sm font-bold text-blue-700 dark:text-blue-400">{item.codigo_colegiado}</td>
                              <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-[#e3e9f3]"> <span className="font-bold">{item.numero_documento}  </span><br />{item.apellidos} {item.nombres}</td>


                              <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-[#c2cfe2]">{item.nombre_especialidad}</td>
                              <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-[#c2cfe2]">{item.correo_personal}</td>
                              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">
                                <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                  {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                                </span>
                              </td>
                              <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">
                                <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.habilitacion === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {item.habilitacion === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                  {item.habilitacion === 1 ? 'HABILITADO' : 'INABILITADO'}
                                </span>
                                <br />
                                <div className="text-center">{item.fecha_fin === "1900-01-01" ? "-" : formatAndValidateDate(item.fecha_fin)}</div>
                              </td>

                              <td className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    className="text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105"
                                    title="Editar"
                                    onClick={() => handleOpenModalAct(item)}
                                  >
                                    <FaEdit className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="text-blue-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-blue-500 shadow-sm hover:shadow-md transform hover:scale-105"
                                    title="Detalle"
                                    onClick={() => handleOpenModuloHistorial(item)}
                                  >
                                    <FaList className="w-4 h-4" />
                                  </button>
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
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
                {
                  loadTable ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-48 bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm animate-pulse" />
                    ))
                  ) : dataColegiado.length == 0 ? (
                    <div className="col-span-full flex items-center justify-center py-10 bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm">
                      <span className="text-gray-600 dark:text-[#8fa3bf] uppercase">No hay datos disponibles</span>
                    </div>
                  ) : (
                    dataColegiado.map((item, index) => (
                      <div key={item.colegiado_id} className="group relative bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col gap-3">

                        {/* Cabecera: avatar + código */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                              {getInitials(item)}
                            </div>
                            <div className="min-w-0">
                              <p title={item.apellidos + " " + item.nombres} className="text-sm font-bold text-gray-800 dark:text-[#e8edf5] truncate">{item.apellidos} {item.nombres}</p>
                              <p className="text-xs text-gray-500 dark:text-[#8fa3bf]">DNI: {item.numero_documento}</p>
                            </div>
                          </div>
                          <span className="flex-shrink-0 px-2 py-1 text-[11px] font-bold rounded-md bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">{item.codigo_colegiado}</span>
                        </div>

                        <div className="border-t border-gray-100 dark:border-[#263551]" />

                        {/* Información */}
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2.5">
                            <FaBriefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-[#c2cfe2]">{item.nombre_especialidad}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <FaEnvelope className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-[#c2cfe2] truncate">{item.correo_personal}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <MdOutlineTabletAndroid className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-[#c2cfe2]">{item.celular ?? '-'}</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 inline-flex items-center text-[11px] leading-4 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                            {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                          </span>
                          <span className={`px-2 py-1 inline-flex items-center text-[11px] leading-4 font-semibold rounded-md ${item.habilitacion === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.habilitacion === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                            {item.habilitacion === 1 ? 'HABILITADO' : 'INABILITADO'}
                          </span>
                          {item.fecha_fin !== "1900-01-01" && (
                            <span className="text-[11px] text-gray-500 dark:text-[#8fa3bf] font-medium">{formatAndValidateDate(item.fecha_fin)}</span>
                          )}
                        </div>

                        {/* Acciones */}

                        <div className="flex items-center justify-between gap-2 pt-2 mt-auto border-t border-gray-100 dark:border-[#263551]">
                          {/* Numeración */}
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
                            {index + 1}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-yellow-600 border border-yellow-300 dark:border-yellow-500/40 hover:bg-yellow-500 hover:text-white transition-all duration-200"
                              title="Editar"
                              onClick={() => handleOpenModalAct(item)}
                            >
                              <FaEdit className="w-3.5 h-3.5" />
                              Editar
                            </button>
                            <button
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-blue-600 border border-blue-300 dark:border-blue-500/40 hover:bg-blue-500 hover:text-white transition-all duration-200"
                              title="Detalle"
                              onClick={() => handleOpenModuloHistorial(item)}
                            >
                              <FaList className="w-3.5 h-3.5" />
                              Historial
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )
                }
              </div>
            )}

            <ModCrearColegiado title={"Registrar Colegiado"} show={isOpenModalCre} loadTable={handleRecharge} hide={handleCloseModalCre} />

            <ModActualizarColegiado title={"Actualizar Colegiado"} show={isOpenModalAct} loadTable={handleRecharge} hide={handleCloseModalAct} colFiltro={objColegiado} />

          </>
        )
      }

    </ContentCard>
  );
}




"use client";

import React, { useEffect, useRef, useState } from 'react';
import ContentCard from '../components/ContentCard';
import { FaSearch, FaEdit, FaPlusCircle, FaUserCog, FaCheckCircle, FaTimesCircle, FaTable, FaThLarge, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa'; // Import icons
import TitleCard from '../components/TitleCard';
import ModCrearUsuario from './modal/ModCrearUsuario';
import { IoReloadCircle } from 'react-icons/io5';
import Lista from '../api/model/interface/lista';
import { busquedaDocumentoOApellidos } from '../api/network/ctsp';
import Response from '../api/model/class/response';
import RestError from '../api/model/class/restError';
import { UsuarioFiltro } from '../api/model/interface/usuario';
import Loading from '../components/Loading';
import ModActualizarUsuario from './modal/ModActualizarUsuario';
import { useUsuariosStore } from '@/store/usuariosStore';
import { MdOutlineTabletAndroid } from 'react-icons/md';

export default function UsuariosPage() {

  const [inputBusqueda, setInputBusqueda] = useState<string>('');

  const [loadTable, setLoadTable] = useState<boolean>(false);
  const [dataUsuario, setDataUsuario] = useState<UsuarioFiltro[]>([]);

  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const [objUsuario, setObjUsuario] = useState<UsuarioFiltro | null>(null);

  const refInputBusqueda = useRef<HTMLInputElement>(null)

  const abortController = useRef(new AbortController());

  const { cachedUsuarios, lastSearchOption, lastSearchValue, setCachedUsuarios, clearCachedUsuarios } = useUsuariosStore();

  // useEffect(() => {
  //   // Carga inicial: reutiliza cache si existe y los criterios son los mismos
  //   if (cachedUsuarios.length > 0 && lastSearchOption === 0 && lastSearchValue === '') {
  //     setDataUsuario(cachedUsuarios);
  //     return;
  //   }

  //   LoadData(0, '');
  // }, [cachedUsuarios, lastSearchOption, lastSearchValue]);


   useEffect(() => {
      // Si ya existe información en cache,
      // reutilizamos el último resultado obtenido.
      if (cachedUsuarios.length > 0) {
  
        setDataUsuario(cachedUsuarios);
        return;
      }
  
      // Si no existe cache, hacemos la primera consulta al backend.
  
      LoadData(0, '');
    }, []);


  // Modal Crear
  const [isOpenModalCrear, setIsOpenModalCrear] = useState(false)

  const handleOpenModalCre = () => {
    setIsOpenModalCrear(true);
  };

  const handleCloseModalCre = () => {
    setIsOpenModalCrear(false);
  };

  // Modal Actualizar
  const [isOpenModalAct, setIsOpenModalAct] = useState(false)

  const handleOpenModalAct = (u: UsuarioFiltro) => {

    setObjUsuario(u)

    setIsOpenModalAct(true);
  };

  const handleCloseModalAct = () => {
    setIsOpenModalAct(false);
  };

  const handleSearch = () => {
    if(inputBusqueda == ""){
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

    setDataUsuario([]);
    setLoadTable(true);

    const obj = {
      opcion: opcion,
      busqueda: busquedaInput,
    };

    try {

      // =====================================================
      // 1. VERIFICAR SI PODEMOS REUTILIZAR EL CACHE
      // =====================================================
      if (
        !forceRefresh &&
        cachedUsuarios.length > 0 &&
        lastSearchOption === opcion &&
        lastSearchValue === busquedaInput
      ) {
        // console.log("LoadData Usuarios: Reutilizando cache de usuarios.");
        setDataUsuario(cachedUsuarios);
        return;
      }

      // =====================================================
      // 2. CONSULTAR BACKEND
      // =====================================================
      const response = await busquedaDocumentoOApellidos<Lista>(obj, abortController.current);

      // =====================================================
      // 3. PROCESAR RESPUESTA EXITOSA
      // =====================================================
      if (response instanceof Response) {
        const data = response.data.rs as UsuarioFiltro[];

        // Actualizar tabla
        setDataUsuario(data);

        // Actualizar cache
        setCachedUsuarios(data, opcion, busquedaInput);

        return;
      }

      // =====================================================
      // 4. PROCESAR ERROR
      // =====================================================
      if (response instanceof RestError) {
        console.error('LoadData Usuarios: Error al obtener usuarios:', response.getMessage());
      }

    } catch (error) {
      console.error('LoadData Usuarios: Error inesperado:', error);
    } finally {
      // Siempre quitar el loading
      setLoadTable(false);
    }

  };

  const getInitials = (item: UsuarioFiltro) => {
    const a = (item.apellidos ?? '').trim().charAt(0) || '';
    const n = (item.nombres ?? '').trim().charAt(0) || '';
    return (a + n).toUpperCase() || 'US';
  };

  return (
    <ContentCard>
      <TitleCard title="Usuarios" />

      {/* Search Input and Button */}
      <div className="mb-5 flex flex-col md:flex-row items-stretch md:items-center gap-y-2 md:gap-y-0 md:gap-x-4">
        <div className="flex flex-row md:flex-grow">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={inputBusqueda}
            ref={refInputBusqueda}
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
      </div>

      {/* User Table */}
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <h2 className="text-lg font-semibold text-gray-600 dark:text-[#8fa3bf] flex items-center gap-2"><FaUserCog className="w-5 h-5 " /> Lista de Usuarios</h2>

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
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Celular / Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Rol</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#15233c] divide-y divide-gray-200 dark:divide-[#263551]">

            {
              loadTable ? (
                <tr className="text-center bg-white dark:bg-[#15233c] hover:bg-gray-50 dark:hover:bg-[#1f2f4a]">
                  <td colSpan={6} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Loading /> <span className="text-gray-600 dark:text-[#8fa3bf]">Cargando datos...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                dataUsuario.length == 0 ? (
                  <tr className="text-center bg-white dark:bg-[#15233c] hover:bg-gray-50 dark:hover:bg-[#1f2f4a]">
                    <td colSpan={6} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-600 dark:text-[#8fa3bf] uppercase">No hay datos disponibles</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  dataUsuario.map((item, index) => (
                    <tr key={item.usuario_id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-[#1a2a45]' : 'bg-white dark:bg-[#15233c]'}
                      } hover:bg-blue-50 dark:hover:bg-[#1f2f4a] transition duration-150 ease-in-out`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-[#e8edf5]">{++index}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-[#e3e9f3]">{item.apellidos} {item.nombres}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">{item.celular} <br/> {item.correo_personal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">{item.nombre_rol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#c2cfe2]">
                        <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                          {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="text-yellow-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-yellow-500 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Editar"
                            onClick={ () => handleOpenModalAct(item) }
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          {/* <button
                            className="text-red-600 hover:text-white transition-all duration-200 p-1.5 rounded-full hover:bg-red-500 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Eliminar"
                          >
                            <FaTrash className="w-4 h-4" />
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
      ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
        {
          loadTable ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm animate-pulse" />
            ))
          ) : dataUsuario.length == 0 ? (
            <div className="col-span-full flex items-center justify-center py-10 bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm">
              <span className="text-gray-600 dark:text-[#8fa3bf] uppercase">No hay datos disponibles</span>
            </div>
          ) : (
            dataUsuario.map((item, index) => (
              <div key={item.usuario_id} className="group bg-white dark:bg-[#15233c] rounded-xl border border-gray-200 dark:border-[#263551] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col gap-3">

                {/* Cabecera: avatar + rol */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                      {getInitials(item)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-[#e8edf5] truncate">{item.apellidos} {item.nombres}</p>
                      <p className="text-xs text-gray-500 dark:text-[#8fa3bf]">{item.nombre_documento}: {item.numero_documento}</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 px-2 py-1 text-[11px] font-bold rounded-md bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">{item.nombre_rol}</span>
                </div>

                <div className="border-t border-gray-100 dark:border-[#263551]" />

                {/* Información */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2.5">
                    <MdOutlineTabletAndroid className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-[#c2cfe2]">{item.celular}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FaEnvelope className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-[#c2cfe2] truncate">{item.correo_personal}</span>
                  </div>
                  {/* <div className="flex items-center gap-2.5">
                    <FaUser className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-[#c2cfe2]">{item.usuario}</span>
                  </div> */}
                </div>

                {/* Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-1 inline-flex items-center text-[11px] leading-4 font-semibold rounded-md ${item.estado === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.estado === 1 ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    {item.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </div>

                {/* Numeración + Acciones */}
                <div className="flex items-center justify-between gap-2 pt-2 mt-auto border-t border-gray-100 dark:border-[#263551]">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
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
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
      )}

      {/* Modal Crear Usuario */}
      <ModCrearUsuario title={"Registrar Usuario"} show={isOpenModalCrear} loadTable={handleRecharge} hide={handleCloseModalCre} />

      {/* Modal Actualizar Usuario */}
      <ModActualizarUsuario title={"Actualizar Usuario"} show={isOpenModalAct} useFiltro={objUsuario} loadTable={handleRecharge} hide={handleCloseModalAct} />

    </ContentCard>
  );
} 
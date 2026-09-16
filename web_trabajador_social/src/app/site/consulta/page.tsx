"use client";
import React, { useRef, useState } from 'react';
import PageContainer from "@/app/site/components/PageContainer";
import { FaSearch, FaUser, FaIdCard, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { ColegiadoWeb } from '@/app/intranet/api/model/interface/colegiado';
import Lista from '@/app/intranet/api/model/interface/lista';
import { buscarcolegiadoweb } from '@/app/intranet/api/network/ctsp';
import Response from '@/app/intranet/api/model/class/response';
import RestError from '@/app/intranet/api/model/class/restError';
import toast, { Toaster } from 'react-hot-toast';


const MAX_INTENTOS = 5;
const BLOQUEO_MS = 10 * 60 * 1000; // 10 minutos
const COOLDOWN_MS = 2000; 

function ConsultaColegiado() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ColegiadoWeb[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<'codigo' | 'apellidos'>('codigo');


  const lastSearchTime = useRef(0);
  const lastQuery = useRef<string>(''); // guarda "tipo:termino" del último intento
  const attemptCount = useRef(0);
  const blockedUntil = useRef<number>(0);


  const searchTermRef = useRef<HTMLInputElement>(null)
  const abortController = useRef(new AbortController());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm === "") {
      // console.log("Ingrese los datos")
      toast.error("Ingrese el valor de busqueda")
      searchTermRef.current?.focus()
      return
    }

    const now = Date.now();

    // 1. ¿Está bloqueado todavía?
    if (now < blockedUntil.current) {
      const segundosRestantes = Math.ceil((blockedUntil.current - now) / 1000);
      const minutos = Math.floor(segundosRestantes / 60);
      const segundos = segundosRestantes % 60;
      toast.error(`Demasiados intentos. Probá de nuevo en ${minutos}m ${segundos}s`);
      return;
    }

    // 2. Cooldown normal entre búsquedas (evita spam de clicks)
    if (now - lastSearchTime.current < COOLDOWN_MS) {
      toast.error("Esperá un momento antes de buscar de nuevo");
      return;
    }

    // 3. Contar intentos repetidos con el MISMO término
    const currentQuery = `${searchType}:${searchTerm.trim().toLowerCase()}`;
    if (currentQuery === lastQuery.current) {
      attemptCount.current += 1;
    } else {
      lastQuery.current = currentQuery;
      attemptCount.current = 1;
    }

    // 4. Si superó el máximo, bloquear
    if (attemptCount.current > MAX_INTENTOS) {
      blockedUntil.current = now + BLOQUEO_MS;
      attemptCount.current = 0; // reset para el próximo ciclo, ya después del bloqueo
      toast.error("Demasiadas búsquedas repetidas. Bloqueado por 5 minutos.");
      return;
    }

    lastSearchTime.current = now;

    setIsLoading(true);
    setSearchResults([]); // Limpiar resultados anteriores

    // Determinar el tipo de búsqueda numérico para la API
    const tipoBusquedaApi = searchType === 'codigo' ? 1 : 2;

    const obj = {
      "tipo_busqueda": tipoBusquedaApi,
      "busqueda": searchTerm.trim()
    }

    const response = await buscarcolegiadoweb<Lista>(obj, abortController.current)
    //console.log(response)
    if (response instanceof Response) {

      const data = response.data.rs as ColegiadoWeb[]
      setSearchResults(data)
    }
    if (response instanceof RestError) {
      //if (response.getType() === Types.CANCELED) return;
      console.log(response.getMessage())
    }

    setIsLoading(false);

  };

  return (
    <PageContainer>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Consulta de Colegiado
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-xl max-w-2xl mx-auto">
              Busca información de colegiados activos en nuestro sistema
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 p-5 sm:p-8 rounded-3xl shadow-xl mb-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-slate-700">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="mb-6 grid grid-cols-6 gap-4">
                <button
                  type="button"
                  onClick={() => setSearchType('codigo')}
                  className={`col-span-3 flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center transition-all duration-200 max-sm:col-span-6 sm:px-6 ${searchType === 'codigo'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                >
                  <FaIdCard className="h-5 w-5" />
                  Buscar por Código
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('apellidos')}
                  className={`col-span-3 flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center transition-all duration-200 max-sm:col-span-6 sm:px-6 ${searchType === 'apellidos'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                >
                  <FaUser className="h-5 w-5" />
                  Buscar por Apellidos
                </button>
              </div>
              <div>
                <label htmlFor="search" className="block text-lg font-medium text-gray-700 dark:text-slate-200 mb-3">
                  {searchType === 'codigo' ? 'Ingrese el código de colegiado' : 'Ingrese los apellidos del colegiado'}
                </label>
                <div className="grid grid-cols-6 gap-3">
                  <div className="relative col-span-4 max-sm:col-span-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      ref={searchTermRef}
                      minLength={3}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full min-w-0 rounded-xl border border-gray-300 py-3 pl-10 pr-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600"
                      placeholder={searchType === 'codigo' ? 'Ej: C009 (mín. 3 caracteres)' : 'Ej: Ramírez (mín. 3 caracteres)'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="col-span-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50 max-sm:col-span-6"
                  >
                    {isLoading ? (
                      <FaSpinner className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <FaSearch className="h-4 w-4" />
                        Buscar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {searchResults.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 p-8 rounded-3xl shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <FaUser className="h-6 w-6 text-blue-600" />
                Resultados de la búsqueda
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Código</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Nombre</th>
                      {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Especialidad</th> */}
                      {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Fecha Colegiatura</th> */}
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Habilitacion</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                    {searchResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-blue-600">{result.codigo_colegiado}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 dark:text-slate-50">{result.nombres} {result.apellidos}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-600 dark:text-slate-300">{result.nombre_especialidad}</td> */}
                        {/* <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-600 dark:text-slate-300">
                          {new Date(result.fecha_nacimiento).toLocaleDateString()}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 w-fit ${result.habilitacion === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {result.habilitacion === 1 ? (
                              <FaCheckCircle className="h-3 w-3" />
                            ) : (
                              <FaTimesCircle className="h-3 w-3" />
                            )}
                            {result.habilitacion === 1 ? 'HABILITADO' : 'INHABILITADO'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {searchTerm && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-slate-300 text-lg">No se encontraron resultados para tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default ConsultaColegiado; 
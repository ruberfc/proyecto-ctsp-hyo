"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCatalogStore } from '@/store/catalogStore';
import { especialidadesLista, tiposDocumentoLista } from '@/app/intranet/api/network/ctsp';
import Response from '@/app/intranet/api/model/class/response';
import RestError from '@/app/intranet/api/model/class/restError';
import { Types } from '@/app/intranet/api/model/emun/types';
import Lista from '@/app/intranet/api/model/interface/lista';
import { Especialidad, TipoDocumento } from '@/app/intranet/api/model/interface/tablas/tablas';

export default function IntranetLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    tiposDocumento,
    especialidades,
    setTiposDocumento,
    setEspecialidades,
  } = useCatalogStore();

  useEffect(() => {
    const abortController = new AbortController();

    const loadCatalogs = async () => {
      if (tiposDocumento.length === 0) {
        const response = await tiposDocumentoLista<Lista>(abortController);
        if (response instanceof Response) {
          setTiposDocumento(response.data.rs as TipoDocumento[]);
        }
        if (response instanceof RestError) {
          // Ignorar cancelaciones (dev: React Strict Mode re-monta hooks y aborta peticiones).
          if (response.getType() === Types.CANCELED) return;
          //console.error('Error cargando tipos de documento:', response.getMessage());
        }
      }

      if (especialidades.length === 0) {
        const response = await especialidadesLista<Lista>(abortController);
        if (response instanceof Response) {
          setEspecialidades(response.data.rs as Especialidad[]);
        }
        if (response instanceof RestError) {
          // Ignorar cancelaciones esperadas en desarrollo.
          if (response.getType() === Types.CANCELED) return;
          //console.error('Error cargando especialidades:', response.getMessage());
        }
      }
    };

    if (tiposDocumento.length === 0 || especialidades.length === 0) {
      loadCatalogs();
    }

    return () => abortController.abort();
  }, [tiposDocumento.length, especialidades.length, setTiposDocumento, setEspecialidades]);

  return (
    <ProtectedRoute>

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Backdrop para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 opacity-50 bg-black z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-64 bg-gray-100 dark:bg-[#0d1b2e]">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 overflow-y-auto">
            <Toaster />
            {children}
          </main>
        </div>

    </ProtectedRoute>
  );
} 
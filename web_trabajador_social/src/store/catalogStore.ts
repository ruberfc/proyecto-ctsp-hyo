import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Especialidad, TipoDocumento } from '@/app/intranet/api/model/interface/tablas/tablas';

interface CatalogState {
  tiposDocumento: TipoDocumento[];
  especialidades: Especialidad[];
  setTiposDocumento: (items: TipoDocumento[]) => void;
  setEspecialidades: (items: Especialidad[]) => void;
  clearCatalogs: () => void;
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      tiposDocumento: [],
      especialidades: [],
      setTiposDocumento: (items) => set({ tiposDocumento: items }),
      setEspecialidades: (items) => set({ especialidades: items }),
      clearCatalogs: () => set({ tiposDocumento: [], especialidades: [] }),
    }),
    {
      name: 'catalog-store',
      storage: createJSONStorage(() => localStorage),
      // Este store persiste los catálogos de tablas en localStorage.
      // De esta forma, al recargar la página, no es necesario volver a pedirlos
      // mientras el catálogo siga siendo válido.
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ColegiadoFiltro } from '@/app/intranet/api/model/interface/colegiado';

interface ColegiadosState {
  cachedColegiados: ColegiadoFiltro[];
  lastSearchOption: number;
  lastSearchValue: string;
  setCachedColegiados: (items: ColegiadoFiltro[], option: number, value: string) => void;
  clearCachedColegiados: () => void;
}

export const useColegiadosStore = create<ColegiadosState>()(
  persist(
    (set) => ({
      cachedColegiados: [],
      lastSearchOption: 0,
      lastSearchValue: '',
      setCachedColegiados: (items, option, value) =>
        set({ cachedColegiados: items, lastSearchOption: option, lastSearchValue: value }),
      clearCachedColegiados: () => set({ cachedColegiados: [], lastSearchOption: 0, lastSearchValue: '' }),
    }),
    {
      name: 'colegiados-cache',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

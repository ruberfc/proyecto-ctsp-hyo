import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UsuarioFiltro } from '@/app/intranet/api/model/interface/usuario';

interface UsuariosState {
  cachedUsuarios: UsuarioFiltro[];
  lastSearchOption: number;
  lastSearchValue: string;
  setCachedUsuarios: (items: UsuarioFiltro[], option: number, value: string) => void;
  clearCachedUsuarios: () => void;
}

export const useUsuariosStore = create<UsuariosState>()(
  persist(
    (set) => ({
      cachedUsuarios: [],
      lastSearchOption: 0,
      lastSearchValue: '',
      setCachedUsuarios: (items, option, value) => set({ cachedUsuarios: items, lastSearchOption: option, lastSearchValue: value }),
      clearCachedUsuarios: () => set({ cachedUsuarios: [], lastSearchOption: 0, lastSearchValue: '' }),
    }),
    {
      name: 'usuarios-cache',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

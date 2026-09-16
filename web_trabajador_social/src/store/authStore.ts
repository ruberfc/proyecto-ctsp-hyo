import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useCatalogStore } from './catalogStore';
import { useColegiadosStore } from './colegiadosStore';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
  checkTokenExpiration: () => boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (token: string) => {
        //console.log("setAuth: Recibiendo token", token);
        set({
          token,
          isAuthenticated: true,
        });
        //console.log("setAuth: Estado del store después de set", get());
      },
      logout: () => {
        //console.log("logout: Ejecutando logout");
        try {
          // Primero eliminar persistencias en localStorage para evitar que
          // el middleware de persist vuelva a escribir el state antiguo.
          localStorage.removeItem('catalog-store');
          localStorage.removeItem('token-storage');
          localStorage.removeItem('colegiados-cache');
        } catch (e) {
          // ignore
        }

        // Limpiar el store de catálogos en memoria
        try {
          useCatalogStore.getState().clearCatalogs();
          useColegiadosStore.getState().clearCachedColegiados();
        } catch (e) {
          // ignore
        }

        // Finalmente actualizar el estado de autenticación en memoria
        set({
          token: null,
          isAuthenticated: false,
        });

        //console.log("logout: Estado del store después de logout", get());
      },
      checkTokenExpiration: () => {
        const token = (get() as AuthState).token;
        // console.log("checkTokenExpiration: Token actual", token);
        if (!token) return false;

        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationTime = payload.exp;
          const currentTime = Math.floor(Date.now() / 1000);

          // console.log("checkTokenExpiration: Exp time", expirationTime, "Current time", currentTime);

          if (currentTime > expirationTime) {
            // console.log("checkTokenExpiration: Token expirado");
            return false;
          }
          // console.log("checkTokenExpiration: Token válido");
          return true;
        } catch (error) {
          //console.error("checkTokenExpiration: Error decodificando o verificando token", error);
          return false;
        }
      },
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
        //console.log("setHasHydrated: Hydration state", state);
      },
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        //console.log('onRehydrateStorage: Hidratación iniciada', state);
        return (stateFromStorage, error) => {
          if (error) {
            //console.log('onRehydrateStorage: Error durante la hidratación', error);
          } else {
            (stateFromStorage as AuthState)?.setHasHydrated(true);
            //console.log('onRehydrateStorage: Hidratación finalizada', state);
          }
        };
      },
    }
  )
);

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { verificarEstadoToken } from '@/app/intranet/api/network/ctsp';
import { EstadoToken } from '@/app/intranet/api/model/interface/usuario';
import Response from '@/app/intranet/api/model/class/response';
import RestError from '@/app/intranet/api/model/class/restError';
import { Types } from '@/app/intranet/api/model/emun/types';

interface ProtectedRouteProps {
    children: React.ReactNode; // Las rutas que este componente protegerá
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const router = useRouter();
    // isVerifying: true mientras se está comprobando el token, muestra un spinner
    const [isVerifying, setIsVerifying] = useState(true);
    // Obtener el estado global de autenticación (token, si está autenticado, funciones de logout y chequeo de expiración)
    const { token, isAuthenticated, logout, checkTokenExpiration, _hasHydrated } = useAuthStore();

    // Función auxiliar para cerrar sesión y redirigir al login
    // const logoutRouter = () => {
    //     logout();
    //     router.push('/login');
    // }

    // Usar useRef para almacenar el AbortController de la petición actual.
    // Esto nos permite cancelarla si una nueva petición se inicia o el componente se desmonta.
    //const currentRequestAbortController = useRef<AbortController | null>(null);

    // useEffect se ejecuta cuando el componente se monta o cuando sus dependencias cambian.
    useEffect(() => {
        // console.log("ProtectedRoute useEffect: Inicio", { token, isAuthenticated, _hasHydrated });

        // Creamos un nuevo AbortController para esta ejecución específica del efecto.
        const controller = new AbortController();

        // Solo proceder si el store de Zustand se ha hidratado desde localStorage.
        if (!_hasHydrated) {
            setIsVerifying(true); // Asegurar que el spinner se muestre mientras se espera la hidratación
            return;
        }

        // console.log("ProtectedRoute useEffect: Store hidratado. Token antes de verificar:", token);

        // Función asíncrona para verificar el token con el backend y manejar la lógica de redirección.
        const verifyAuthentication = async () => {
            // Si no hay token en el store después de la hidratación, redirigir inmediatamente al login
            if (!token) {
                // console.log("ProtectedRoute: No hay token después de la hidratación, redirigiendo a /login.");
                //logoutRouter(); // Usar la función centralizada
                logout();
                router.push('/login');
                setIsVerifying(false); // Detener el spinner
                return; // Detiene la ejecución de la función
            }

            // Verifica la expiración del token localmente (decodificando el JWT del localStorage).
            // Si el token ha expirado localmente, cerrar sesión y redirigir
            if (!checkTokenExpiration()) {
                // console.log("ProtectedRoute: Token expirado localmente, redirigiendo a /login.");
                //logoutRouter(); // Usar la función centralizada
                setIsVerifying(false); // Detener el spinner
                logout();
                router.push('/login');
                return; // Detiene la ejecución
            }

            // Intenta verificar el estado del token con el backend.
            // Esto es crucial porque el backend es la fuente de verdad sobre la validez del token.
            try {
                const response = await verificarEstadoToken<EstadoToken>(controller) // Usamos el nuevo controlador creado para esta ejecución

                // Si la respuesta es una instancia de Response (éxito de la petición HTTP)
                if (response instanceof Response) {
                    const statusToken = response.data.status as boolean // Extrae el estado del token de la respuesta

                    // Si el backend dice que el token no es válido (status es false)
                    if (statusToken === false) {
                        // console.log("ProtectedRoute: Backend indica token inválido (status false), redirigiendo a /login.");
                        //logoutRouter(); // Usar la función centralizada
                        logout();
                        router.push('/login');
                        setIsVerifying(false); // Detener el spinner
                        return;
                    }

                    // Si el token es válido según el backend, detener el spinner de carga
                    // console.log("ProtectedRoute: Token válido según el backend.");
                    setIsVerifying(false); // Importante: detener spinner en éxito

                }
                // Si la respuesta es una instancia de RestError (error en la petición HTTP, ej. 401, 500)
                else if (response instanceof RestError) {
                    // Si el error es de tipo CANCELADO, no hacemos nada ya que es una cancelación esperada.
                    if (response.getType() === Types.CANCELED) {
                        // console.log("ProtectedRoute: Petición de verificación de token abortada (Tipo CANCELED).");
                        setIsVerifying(false); // Detener el spinner incluso si es cancelación
                        return; // No hacer logout ni redirigir
                    }
                    // Para cualquier otro tipo de RestError (ej. 401, 500), cerramos sesión y redirigimos.
                    // console.log("ProtectedRoute: Error de red o backend al verificar token (no CANCELED), redirigiendo a /login.", response);
                    //logoutRouter(); // Usar la función centralizada
                    logout();
                    router.push('/login');
                    setIsVerifying(false); // Asegurarse de que el spinner se detenga
                    return; // Detiene la ejecución
                }
            } catch (error) {
                // Esto captura errores que no son RestError o AxiosError envueltos, ej. errores de JS o de conexión.
                console.log("ProtectedRoute: Error inesperado en la verificación (fuera de RestError), redirigiendo a /login.", error);
                //logoutRouter(); // Usar la función centralizada
                logout();
                router.push('/login');
                setIsVerifying(false);
            }

        };

        // Ejecutar la verificación al montar el componente o cuando cambien las dependencias
        verifyAuthentication();

        // Configura un intervalo para verificar la expiración del token localmente cada minuto.
        // Esto asegura que la sesión expire incluso si el usuario no interactúa con la página.
        const interval = setInterval(() => {
            // Si el token ha expirado localmente durante el intervalo, redirige al login.
            if (!checkTokenExpiration()) {
                // console.log("ProtectedRoute: Verificación periódica: Token expirado, redirigiendo a /login.");
                //logoutRouter(); // Usar la función centralizada
                logout();
                router.push('/login');
            }
        }, 60000); // 60 segundos

        // Función de limpieza: se ejecuta al desmontar el componente
        return () => {
            clearInterval(interval); // Limpiar el intervalo para evitar fugas de memoria
            controller.abort(); // Cancelar la petición asociada a esta instancia del efecto
        };
    }, [token, router, logout, checkTokenExpiration, _hasHydrated, logout]); // Dependencias: ahora incluye

    // Mostrar un spinner de carga mientras se verifica la autenticación O si el store aún no se ha hidratado
    if (isVerifying || !_hasHydrated) {
        // console.log("ProtectedRoute: Mostrando spinner (isVerifying o !_hasHydrated)", { isVerifying, _hasHydrated });
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Si el usuario no está autenticado (después de la verificación), no renderizar nada (ya fue redirigido)
    if (!isAuthenticated) {
        // console.log("ProtectedRoute: Usuario no autenticado, retornando null.");
        return null;
    }

    // Si el usuario está autenticado y verificado, renderizar los componentes hijos
    // console.log("ProtectedRoute: Usuario autenticado y verificado, renderizando children.");
    return <>{children}</>;
} 
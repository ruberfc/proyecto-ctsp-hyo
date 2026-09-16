import { useEffect, useState } from "react"; // Importa los hooks useEffect y useState de React
import { jwtDecode } from "jwt-decode"; // Importa la función jwtDecode para decodificar JWT

export interface UserPayload { // Define la interfaz del payload esperado en el token
  usuario_id: number;           // ID del usuario
  usuario: string;              // Nombre de usuario
  rol_id: number;               // ID del rol
  nombre_rol: string;           // Nombre del rol
  tipo_documento_id: number;    // Tipo de documento
  numero_documento: string;     // Número de documento
  nombres: string;              // Nombres del usuario
  apellidos: string;            // Apellidos del usuario
  celular: string;              // Celular del usuario
  correo_personal: string;      // Correo personal
  direccion: string;            // Dirección
  sexo: string;                 // Sexo
  iat: number;                  // Fecha de emisión del token (issued at)
  exp: number;                  // Fecha de expiración del token (expiration)
} // Fin de la interfaz UserPayload

export function useUserFromToken(tokenKey: string = "token-storage") { // Hook para obtener el usuario desde el token
  const [user, setUser] = useState<UserPayload | null>(null); // Estado para el usuario decodificado
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando

  useEffect(() => { // Efecto que se ejecuta al montar o cambiar tokenKey
    let token: string | null = null; // Inicializa el token como null
    if (typeof window !== "undefined") { // Solo si estamos en el navegador
      const storage = localStorage.getItem(tokenKey); // Obtiene el valor de localStorage
      if (storage) {
        try {
          const parsed = JSON.parse(storage); // Parsea el JSON
          token = parsed?.state?.token || null; // Extrae el token real
        } catch (_e) {
          token = null; // Si hay error al parsear, pone null
        }
      }
    }
    if (token) { // Si hay token
      try {
        const decoded = jwtDecode<UserPayload>(token); // Decodifica el token
        setUser(decoded); // Guarda el usuario decodificado en el estado
      } catch (_e) { // Si ocurre un error al decodificar
        setUser(null); // Si hay error al decodificar, pone null
      }
    } else { // Si no hay token
      setUser(null); // Si no hay token, pone null
    }
    setLoading(false); // Termina la carga
  }, [tokenKey]); // Se ejecuta cuando cambia tokenKey

  return { user, loading }; // Devuelve el usuario y el estado de carga
} // Fin del hook
export class BuscarUsuario {
  opcion: number;
  busqueda: string;
} 


export class RegistrarUsuario {
  tipo_documento_id: number;
  numero_documento: string; 
  nombres: string;          
  apellidos: string;        
  celular: string;          
  correo_personal: string;  
  direccion: string;        
  rol_id: number;           
  sexo: number;             
  fecha_nacimiento: string;   
  usuario: string;          
  clave: string;            
}

export class ActulizarUsuario {
  usuario_id: number;       
  tipo_documento_id: number;
  numero_documento: string; 
  nombres: string;          
  apellidos: string;        
  celular: string;          
  correo_personal: string;  
  direccion: string;        
  rol_id: number;           
  sexo: number;             
  fecha_nacimiento: string; 
  usuario: string;          
  clave: string;            
  estado: number;           
}

export class LoginUsuario{
  usuario: string;
  clave: string;
}

/**
 * DTO para solicitar código de recuperación de contraseña (Paso 1)
 * Valida que el usuario exista y el correo coincida
 */
export class SolicitarRecuperacionUsuario {
  usuario: string;           // Usuario del sistema (login)
  correo_personal: string;   // Correo registrado en BD
}

/**
 * DTO para verificar código y establecer nueva contraseña (Paso 2)
 * Valida código vigente (25 min, no usado) y actualiza clave
 */
export class VerificarRecuperacionUsuario {
  usuario: string;           // Usuario del sistema
  codigo: string;            // Código de 6 dígitos recibido por email
  nueva_clave: string;       // Nueva contraseña
  confirmar_clave: string;   // Confirmación de nueva contraseña
}
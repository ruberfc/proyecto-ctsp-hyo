export class BuscarFilto {
    tipo_busqueda: number;
    busqueda: string;
}


export class RegistrarColegiado {
    codigo_colegiado: string;
    tipo_documento_id: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo_personal: string;
    direccion: string;
    sexo: number;
    fecha_nacimiento: string;
    especialidad_id: number;
    //clave: string;                 
    usuario_registra: number;
}


export class ActualizarColegiado {
    colegiado_id: number;
    codigo_colegiado: string;
    tipo_documento_id: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo_personal: string;
    direccion: string;
    sexo: number;
    fecha_nacimiento: string;
    especialidad_id: number;
    estado: number;
    usuario_modifica: number;
}

/**
 * DTO para solicitar código de recuperación de contraseña - Colegiado (Paso 1)
 * Valida que el colegiado exista y el correo coincida
 */
export class SolicitarRecuperacionColegiado {
  codigo_colegiado: string;  // Código único del colegiado
  correo_personal: string;   // Correo registrado en BD
}

/**
 * DTO para verificar código y establecer nueva contraseña - Colegiado (Paso 2)
 * Valida código vigente (25 min, no usado) y actualiza clave
 */
export class VerificarRecuperacionColegiado {
  codigo_colegiado: string;  // Código único del colegiado
  codigo: string;            // Código de 6 dígitos recibido por email
  nueva_clave: string;       // Nueva contraseña
  confirmar_clave: string;   // Confirmación de nueva contraseña
}
export interface UsuarioFiltro {
  usuario_id: number;
  tipo_documento_id: number;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo_personal: string;
  direccion: string;
  rol_id: number;
  sexo: number; // Podrías usar un enum si defines qué significa cada número
  //fecha_nacimiento: Date;
  fecha_nacimiento: string;
  usuario: string;
  clave: string;
  estado: number; // Por ejemplo: 1 = activo, 0 = inactivo
  // fecha_registro: Date;
  fecha_registro: string;
  nombre_documento: string;
  nombre_rol: string;
}

export interface FormRegistrarUsuario {
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

export interface FormActualizarUsuario {
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
  estado: boolean;
}

export interface Token {
  access_token: string;
}

export interface EstadoToken {
  status: boolean;
  payload: any;
}

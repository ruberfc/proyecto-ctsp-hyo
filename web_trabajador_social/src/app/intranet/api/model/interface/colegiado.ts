//IN
export interface FormRegistrarColegiado {
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

export interface FormActualizarColegiado {
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
  //usuario_modifica: number;
}


//OUT
export interface ColegiadoFiltro {
  colegiado_id: number;
  codigo_colegiado: string;
  tipo_documento_id: number;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo_personal: string;
  direccion: string;
  sexo: number; // Assuming 0, 1, or other numeric codes for sex
  fecha_nacimiento: string; // Stored as 'YYYY-MM-DD' string from SQL
  especialidad_id: number;
  estado: number; // Assuming numeric  1/2 status codes
  habilitacion: number; // Assuming numeric habilitation status
  token_colegiado: string;
  nombre_documento: string; // From the 'tipos_documento' table
  nombre_especialidad: string; // From the 'especialidades' table
  fecha_fin: string;
}

export interface ColegiadoWeb {
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
  habilitacion: number;
  token_colegiado: string;
  nombre_documento: string;
  nombre_especialidad: string;
  fecha_fin: string | null;
}
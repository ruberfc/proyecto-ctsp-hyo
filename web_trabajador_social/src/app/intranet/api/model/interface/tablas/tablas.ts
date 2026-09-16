export interface TipoDocumento {
    tipo_documento_id: number;
    nombre_documento: string;
    descripcion: string;
    estado: number;
    fecha_creacion: string;
} 


export interface Especialidad {
  especialidad_id: number;
  nombre_especialidad: string;
  descripcion: string;
  estado: number; // Assuming 0 or 1 for active/inactive status
  fecha_creacion: string; // ISO 8601 string from the database (e.g., "2025-05-30T08:32:14.000Z")
}
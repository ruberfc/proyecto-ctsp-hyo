// IN


// OUT
export interface BusquedaHistorialHabilitacion {
    historial_habilitacion_id: number;
    colegiado_id: number;
    fecha_inicio: string; // Formato 'YYYY-MM-DD' (desde COALESCE('1900-01-01'))
    fecha_fin: string; // Formato 'YYYY-MM-DD' (desde COALESCE('1900-01-01'))
    estado: number; // Generalmente 0 o 1 (desde COALESCE(..., 0))

    observacion_registro: string; // Desde COALESCE(..., '')
    observacion_actualizacion: string; // Desde COALESCE(..., '')
    observacion_estado: string; // Desde COALESCE(..., '')

    fecha_registra: string; // Formato 'YYYY-MM-DD' (desde COALESCE('1900-01-01'))
    fecha_modifica: string; // Formato 'YYYY-MM-DD' (desde COALESCE('1900-01-01'))

    usuario_registra: number; // Desde COALESCE(..., 0)
    usuario_modifica: number; // Desde COALESCE(..., 0)

    numero_documento: string; // Desde COALESCE(..., '') de la tabla 'usuarios'
    nombre_completo_usuario: string; // Desde COALESCE(..., '') de la tabla 'usuarios'
}
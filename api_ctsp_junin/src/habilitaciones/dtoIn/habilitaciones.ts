export class RegistrarHabilitacion {
    colegiado_id: number;
    fecha_inicio: string;
    fecha_fin: string;
    observacion_registro: string;
    // usuario_registra: number;
}

export class ActualizarHabilitacion {
    historial_habilitacion_id: number;
    fecha_fin: string;
    observacion_actualizacion: string;
    usuario_modifica: number;
}
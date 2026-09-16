import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SqlDataType } from 'src/database/interface/SqlDataType';
import { ActualizarHabilitacion, RegistrarHabilitacion } from './dtoIn/habilitaciones';
//import { ActualizarColegiado, RegistrarColegiado } from './dtoIn/colegiados';


@Injectable()
export class HabilitacionesService {
    constructor(
        private readonly dbs: DatabaseService,
    ) { }

    async buscarHabilitacionPorColegiadoId(colegiado_id: number): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_historial_habilitacion_por_colegiado_id', [
            { value: colegiado_id, type: SqlDataType.INT },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }

    async registrarHistorialHabilitacion(h: RegistrarHabilitacion, usuario_id: number ): Promise<any> {
        const result = await this.dbs.execSP('sp_registrar_historial_habilitacion', [
            { value: h.colegiado_id, type: SqlDataType.INT },
            { value: h.fecha_inicio, type: SqlDataType.VARCHAR },
            { value: h.fecha_fin, type: SqlDataType.VARCHAR },
            { value: h.observacion_registro, type: SqlDataType.VARCHAR },
            { value: usuario_id, type: SqlDataType.INT },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;

    }

    async actualizarHistorialHabilitacion(h: ActualizarHabilitacion, usuario_id: number ): Promise<any> {

        const result = await this.dbs.execSP('sp_actualizar_historial_habilitacion', [
            { value: h.historial_habilitacion_id, type: SqlDataType.INT },
            { value: h.fecha_fin, type: SqlDataType.VARCHAR },
            { value: h.observacion_actualizacion, type: SqlDataType.VARCHAR },
            { value: usuario_id, type: SqlDataType.INT },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;

    }

}
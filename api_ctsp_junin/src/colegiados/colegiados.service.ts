import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SqlDataType } from 'src/database/interface/SqlDataType';
import { ActualizarColegiado, RegistrarColegiado, SolicitarRecuperacionColegiado, VerificarRecuperacionColegiado } from './dtoIn/colegiados';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ColegiadosService {
    constructor(
        private readonly dbs: DatabaseService,
        private readonly mailService: MailService,
    ) { }


    async buscarColegiadoWeb(tipo_busqueda: number, busqueda: string): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_colegiado_web', [
            { value: tipo_busqueda, type: SqlDataType.INT },
            { value: busqueda, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }

    async buscarColegiadoIntranet(tipo_busqueda: number, busqueda: string): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_colegiado_intranet', [
            { value: tipo_busqueda, type: SqlDataType.INT },
            { value: busqueda, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }


    async registrarColegiado(c: RegistrarColegiado, usuario_registra: number): Promise<any> {
        const result = await this.dbs.execSP('sp_registrar_colegiado', [
            { value: c.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: c.tipo_documento_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR },
            { value: c.nombres, type: SqlDataType.VARCHAR },
            { value: c.apellidos, type: SqlDataType.VARCHAR },
            { value: c.celular, type: SqlDataType.VARCHAR },
            { value: c.correo_personal, type: SqlDataType.VARCHAR },
            { value: c.direccion, type: SqlDataType.VARCHAR },
            { value: c.sexo, type: SqlDataType.TINYINT },
            { value: c.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: c.especialidad_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR },
            { value: usuario_registra, type: SqlDataType.INT },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;

    }

    async actualizarColegiado(c: ActualizarColegiado): Promise<any> {
        const result = await this.dbs.execSP('sp_actualizar_colegiado', [
            { value: c.colegiado_id, type: SqlDataType.INT },
            { value: c.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: c.tipo_documento_id, type: SqlDataType.INT },
            { value: c.numero_documento, type: SqlDataType.VARCHAR },
            { value: c.nombres, type: SqlDataType.VARCHAR },
            { value: c.apellidos, type: SqlDataType.VARCHAR },
            { value: c.celular, type: SqlDataType.VARCHAR },
            { value: c.correo_personal, type: SqlDataType.VARCHAR },
            { value: c.direccion, type: SqlDataType.VARCHAR },
            { value: c.sexo, type: SqlDataType.TINYINT },
            { value: c.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: c.especialidad_id, type: SqlDataType.INT },
            { value: c.estado, type: SqlDataType.BOOLEAN },
            { value: c.usuario_modifica, type: SqlDataType.INT }
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }

    /**
     * PASO 1: Solicitar código de recuperación de contraseña - Colegiado
     * Llama al SP que valida codigo_colegiado+correo, genera código 6 dígitos,
     * lo guarda en BD (expira 25 min) y envía email
     */
    async solicitarRecuperacion(dto: SolicitarRecuperacionColegiado): Promise<any> {
        const result = await this.dbs.execSP('sp_solicitar_recuperacion_colegiado', [
            { value: dto.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: dto.correo_personal, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        const response = dataResults.length === 1 ? dataResults[0] : dataResults;

        // Si el SP retorna éxito (value=1), enviar email con el código
        if (response && response.length > 0 && response[0].value === 1) {
            const colegiadoData = response[0];
            await this.mailService.sendRecoveryCode(dto.correo_personal, {
                nombre: `${colegiadoData.nombres} ${colegiadoData.apellidos}`,
                codigo: colegiadoData.codigo_generado,
                tipo: 'colegiado',
                expiracionMinutos: 25,
            });
        }

        return response;
    }

    /**
     * PASO 2: Verificar código y actualizar contraseña - Colegiado
     * Llama al SP que valida código (vigente, no usado), actualiza clave y marca código usado
     */
    async verificarRecuperacion(dto: VerificarRecuperacionColegiado): Promise<any> {
        // Validación básica: contraseñas deben coincidir
        if (dto.nueva_clave !== dto.confirmar_clave) {
            return [{ value: 0, msg: 'Las contraseñas no coinciden' }];
        }

        const result = await this.dbs.execSP('sp_verificar_recuperacion_colegiado', [
            { value: dto.codigo_colegiado, type: SqlDataType.VARCHAR },
            { value: dto.codigo, type: SqlDataType.VARCHAR },
            { value: dto.nueva_clave, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }
}
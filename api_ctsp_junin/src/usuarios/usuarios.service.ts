import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SqlDataType } from 'src/database/interface/SqlDataType';
import { ActulizarUsuario, LoginUsuario, RegistrarUsuario, SolicitarRecuperacionUsuario, VerificarRecuperacionUsuario } from './dtoIn/usuarios';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsuariosService {
    constructor(
        private readonly dbs: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) { }

    async loginUsuario(u: LoginUsuario): Promise<any> {
        const result = await this.dbs.execSP('sp_login_usuario', [
            { value: u.usuario, type: SqlDataType.VARCHAR },
            { value: u.clave, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        const userData = dataResults.length === 1 ? dataResults[0] : dataResults;

        if (userData && userData.length > 0) {
            const user = userData[0];
            const payload = {
                usuario_id: user.usuario_id,
                usuario: user.usuario,
                rol_id: user.rol_id,
                nombre_rol: user.nombre_rol,
                tipo_documento_id: user.tipo_documento_id,
                numero_documento: user.numero_documento,
                nombres: user.nombres,
                apellidos: user.apellidos,
                celular: user.celular,
                correo_personal: user.correo_personal,
                direccion: user.direccion,
                sexo: user.sexo
            };
            return {
                access_token: this.jwtService.sign(payload),
                //user: user
            };
        }

        return null;
    }

    async findUsuariosDocumentosOApellidos(opcion: number, busqueda: string): Promise<any> {

        const result = await this.dbs.execSP('sp_buscar_usuario_por_documento_o_apellidos', [
            { value: opcion, type: SqlDataType.TINYINT },
            { value: busqueda, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }


    async registrarUsuario(u: RegistrarUsuario ): Promise<any> {

        const result = await this.dbs.execSP('sp_registrar_usuario', [
            { value: u.tipo_documento_id, type: SqlDataType.INT },
            { value: u.numero_documento, type: SqlDataType.VARCHAR },
            { value: u.nombres, type: SqlDataType.VARCHAR },
            { value: u.apellidos, type: SqlDataType.VARCHAR },
            { value: u.celular, type: SqlDataType.VARCHAR },
            { value: u.correo_personal, type: SqlDataType.VARCHAR },
            { value: u.direccion, type: SqlDataType.VARCHAR },
            { value: u.rol_id, type: SqlDataType.INT },
            { value: u.sexo, type: SqlDataType.TINYINT },
            { value: u.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: u.usuario, type: SqlDataType.VARCHAR },
            { value: u.clave, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }
    
    async actualizarUsuario(u: ActulizarUsuario ): Promise<any> {
        const result = await this.dbs.execSP('sp_actualizar_usuario', [
            { value: u.usuario_id, type: SqlDataType.INT },
            { value: u.tipo_documento_id, type: SqlDataType.INT },
            { value: u.numero_documento, type: SqlDataType.VARCHAR },
            { value: u.nombres, type: SqlDataType.VARCHAR },
            { value: u.apellidos, type: SqlDataType.VARCHAR },
            { value: u.celular, type: SqlDataType.VARCHAR },
            { value: u.correo_personal, type: SqlDataType.VARCHAR },
            { value: u.direccion, type: SqlDataType.VARCHAR },
            { value: u.rol_id, type: SqlDataType.INT },
            { value: u.sexo, type: SqlDataType.TINYINT },
            { value: u.fecha_nacimiento, type: SqlDataType.VARCHAR },
            { value: u.usuario, type: SqlDataType.VARCHAR },
            { value: u.clave, type: SqlDataType.VARCHAR },
            { value: u.estado, type: SqlDataType.BOOLEAN },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }

    /**
     * PASO 1: Solicitar código de recuperación de contraseña
     * Llama al SP que valida usuario+correo, genera código 6 dígitos,
     * lo guarda en BD (expira 25 min) y envía email
     */
    async solicitarRecuperacion(dto: SolicitarRecuperacionUsuario): Promise<any> {
        const result = await this.dbs.execSP('sp_solicitar_recuperacion_usuario', [
            { value: dto.usuario, type: SqlDataType.VARCHAR },
            { value: dto.correo_personal, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        const response = dataResults.length === 1 ? dataResults[0] : dataResults;

        // Si el SP retorna éxito (value=1), enviar email con el código
        if (response && response.length > 0 && response[0].value === 1) {
            const userData = response[0];
            // El SP debe retornar el código generado y el nombre del usuario
            await this.mailService.sendRecoveryCode(dto.correo_personal, {
                nombre: `${userData.nombres} ${userData.apellidos}`,
                codigo: userData.codigo_generado,
                tipo: 'usuario',
                expiracionMinutos: 25,
            });
        }

        return response;
    }

    /**
     * PASO 2: Verificar código y actualizar contraseña
     * Llama al SP que valida código (vigente, no usado), actualiza clave y marca código usado
     */
    async verificarRecuperacion(dto: VerificarRecuperacionUsuario): Promise<any> {
        // Validación básica: contraseñas deben coincidir
        if (dto.nueva_clave !== dto.confirmar_clave) {
            return [{ value: 0, msg: 'Las contraseñas no coinciden' }];
        }

        const result = await this.dbs.execSP('sp_verificar_recuperacion_usuario', [
            { value: dto.usuario, type: SqlDataType.VARCHAR },
            { value: dto.codigo, type: SqlDataType.VARCHAR },
            { value: dto.nueva_clave, type: SqlDataType.VARCHAR },
        ]);

        const dataResults = result.filter(item => Array.isArray(item));
        return dataResults.length === 1 ? dataResults[0] : dataResults;
    }
}
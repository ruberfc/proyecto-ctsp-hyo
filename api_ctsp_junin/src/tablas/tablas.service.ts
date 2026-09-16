import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TablasService {
    constructor(
        private readonly dbs: DatabaseService,
    ) { }

    async findAllEspecilidades(): Promise<any> {

        const query = 'SELECT especialidad_id, nombre_especialidad, descripcion, estado, fecha_creacion FROM especialidades WHERE estado = true;'

        const result = await this.dbs.execQuery(query)
        if (result.length === 0) {
            return null
        }
        return result
    }

    async findAllRoles(): Promise<any> {

        const query = 'SELECT rol_id, nombre_rol, descripcion, estado, fecha_creacion FROM roles;'

        const result = await this.dbs.execQuery(query)
        if (result.length === 0) {
            return null
        }
        return result
    }

    async findAllTiposDocumento(): Promise<any> {

        const query = 'SELECT tipo_documento_id, nombre_documento, descripcion, estado, fecha_creacion FROM tipos_documento;'

        const result = await this.dbs.execQuery(query)
        if (result.length === 0) {
            return null
        }
        return result
    }

}
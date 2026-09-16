import { ColegiadoFiltro } from './colegiado'
import { Especialidad, TipoDocumento } from './tablas/tablas'
import {UsuarioFiltro} from './usuario'
import {ValueMsg} from './valueMsg'

export default interface Lista {
    rs: UsuarioFiltro[] | 
    ColegiadoFiltro[] |
    TipoDocumento[] |
    Especialidad[] |
    ValueMsg[] | 
    any[]
}
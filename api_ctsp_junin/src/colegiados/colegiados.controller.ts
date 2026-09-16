import { Controller, Get, HttpException, HttpStatus, Post, UseGuards, Body, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ColegiadosService } from './colegiados.service';
import { ActualizarColegiado, BuscarFilto, RegistrarColegiado, SolicitarRecuperacionColegiado, VerificarRecuperacionColegiado } from './dtoIn/colegiados';
import { CustomRequest } from '../usuarios/interface/CustomRequest';

@ApiTags('Colegiados')
@Controller('colegiados')
export class ColegiadosController {
    constructor(private readonly cService: ColegiadosService) { }

    @Post('buscar-colegiado-web')
    @ApiOperation({
        summary: 'Buscar colegiado en la web',
        description: 'Permite buscar un colegiado utilizando un tipo de búsqueda y un término de búsqueda'
    })
    @ApiBody({
        type: BuscarFilto,
        description: 'Datos necesarios para realizar la búsqueda del colegiado',
        examples: {
            example1: {
                value: {
                    tipo_busqueda: 1,
                    busqueda: "12345678"
                },
                summary: 'Ejemplo de búsqueda por codigo'
            },
            example2: {
                value: {
                    tipo_busqueda: 2,
                    busqueda: "Pérez"
                },
                summary: 'Ejemplo de búsqueda por apellidos'
            }
        }
    })
    async buscarColegiadoWeb(@Body() filter: BuscarFilto) {
        try {
            const { tipo_busqueda, busqueda } = filter;
            const result = await this.cService.buscarColegiadoWeb(tipo_busqueda, busqueda);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('buscar-colegiado-intranet')
    @ApiOperation({
        summary: 'Buscar colegiado en la intranet',
        description: 'Permite buscar un colegiado en la intranet utilizando un tipo de búsqueda y un término de búsqueda'
    })
    @ApiBody({
        type: BuscarFilto,
        description: 'Datos necesarios para realizar la búsqueda del colegiado en la intranet',
        examples: {
            example1: {
                value: {
                    tipo_busqueda: 0,
                    busqueda: ""
                },
                summary: 'Ejemplo de búsqueda general'
            },
            example2: {
                value: {
                    tipo_busqueda: 1,
                    busqueda: "88888888"
                },
                summary: 'Ejemplo de búsqueda por coincidencia de número de documento o apellidos'
            }
        }
    })
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async buscarColegiadoIntranet(@Body() filter: BuscarFilto) {
        try {
            const { tipo_busqueda, busqueda } = filter;
            const result = await this.cService.buscarColegiadoIntranet(tipo_busqueda, busqueda);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('registrar-colegiado')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Registrar nuevo colegiado',
        description: 'Permite registrar un nuevo colegiado en el sistema. El ID del usuario que registra se obtiene del token JWT.'
    })
    @ApiBody({
        type: RegistrarColegiado,
        description: 'Datos del colegiado a registrar (usuario_registra se obtiene del token)',
        examples: {
            example1: {
                value: {
                    codigo_colegiado: "12345",
                    tipo_documento_id: 1,
                    numero_documento: "12345678",
                    nombres: "Juan",
                    apellidos: "Pérez García",
                    celular: "987654321",
                    correo_personal: "juan.perez@example.com",
                    direccion: "Av. Principal 123",
                    sexo: 1,
                    fecha_nacimiento: "1990-01-01",
                    especialidad_id: 1,
                },
                summary: 'Ejemplo de registro de colegiado'
            }
        }
    })
    async registrarColegiado(@Body() c: RegistrarColegiado, @Req() req: CustomRequest) {
        try {
            const usuario_registra = req.user.usuario_id;
            const result = await this.cService.registrarColegiado(c, usuario_registra);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('actualizar-colegiado')
    @ApiOperation({
        summary: 'Actualizar colegiado',
        description: 'Permite actualizar los datos de un colegiado existente en el sistema'
    })
    @ApiBody({
        type: ActualizarColegiado,
        description: 'Datos del colegiado a actualizar',
        examples: {
            example1: {
                value: {
                    colegiado_id: 1,
                    codigo_colegiado: "12345",
                    tipo_documento_id: 1,
                    numero_documento: "12345678",
                    nombres: "Juan",
                    apellidos: "Pérez García",
                    celular: "987654321",
                    correo_personal: "juan.perez@example.com",
                    direccion: "Av. Principal 123",
                    sexo: 1,
                    fecha_nacimiento: "1990-01-01",
                    especialidad_id: 1,
                    estado: 1,
                    usuario_modifica: 1
                },
                summary: 'Ejemplo de actualización de colegiado'
            }
        }
    })
    async actualizarColegiado(@Body() c: ActualizarColegiado) {
        try {
            const result = await this.cService.actualizarColegiado(c);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * PASO 1: Solicitar código de recuperación de contraseña - Colegiado
     * Endpoint público (sin autenticación) - Valida codigo_colegiado+correo y envía código por email
     */
    @Post('solicitar-recuperacion')
    @ApiOperation({
        summary: 'Solicitar código de recuperación de contraseña (Colegiado)',
        description: 'Valida que el colegiado exista y el correo coincida. Si es válido, genera un código de 6 dígitos, lo guarda (expira 25 min) y lo envía por email.'
    })
    @ApiBody({
        type: SolicitarRecuperacionColegiado,
        description: 'Código de colegiado y correo para solicitar recuperación',
        examples: {
            example1: {
                value: {
                    codigo_colegiado: "C12345",
                    correo_personal: "juan.perez@example.com"
                },
                summary: 'Solicitar código de recuperación (colegiado)'
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Código enviado al correo. Retorna { rs: [{ value: 1, msg: "Código enviado correctamente" }] }' })
    @ApiResponse({ status: 200, description: 'Colegiado no encontrado o correo no coincide. Retorna { rs: [{ value: 0, msg: "..." }] }' })
    async solicitarRecuperacion(@Body() dto: SolicitarRecuperacionColegiado) {
        try {
            const result = await this.cService.solicitarRecuperacion(dto);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'Error al solicitar recuperación',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * PASO 2: Verificar código y restablecer contraseña - Colegiado
     * Endpoint público (sin autenticación) - Valida código y actualiza contraseña
     */
    @Post('verificar-recuperacion')
    @ApiOperation({
        summary: 'Verificar código y restablecer contraseña (Colegiado)',
        description: 'Valida el código de 6 dígitos (vigente 25 min, uso único). Si es válido, actualiza la contraseña del colegiado.'
    })
    @ApiBody({
        type: VerificarRecuperacionColegiado,
        description: 'Código de colegiado, código recibido y nueva contraseña',
        examples: {
            example1: {
                value: {
                    codigo_colegiado: "C12345",
                    codigo: "123456",
                    nueva_clave: "nuevaPassword123",
                    confirmar_clave: "nuevaPassword123"
                },
                summary: 'Verificar código y cambiar contraseña (colegiado)'
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Contraseña actualizada. Retorna { rs: [{ value: 1, msg: "Contraseña actualizada correctamente" }] }' })
    @ApiResponse({ status: 200, description: 'Código inválido/expirado o contraseñas no coinciden. Retorna { rs: [{ value: 0, msg: "..." }] }' })
    async verificarRecuperacion(@Body() dto: VerificarRecuperacionColegiado) {
        try {
            const result = await this.cService.verificarRecuperacion(dto);
            return { rs: result };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message  || 'Error al verificar recuperación',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
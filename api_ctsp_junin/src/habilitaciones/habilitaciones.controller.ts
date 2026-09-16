import { Controller, Get, HttpException, HttpStatus, Post, UseGuards, Body, Param, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HabilitacionesService } from './habilitaciones.service';
import { get } from 'http';
import { ActualizarHabilitacion, RegistrarHabilitacion } from './dtoIn/habilitaciones';
import { CustomRequest } from 'src/usuarios/interface/CustomRequest';
// import { ActualizarColegiado, BuscarFilto, RegistrarColegiado } from './dtoIn/colegiados';

@ApiTags('Habilitaciones')
@Controller('habilitaciones')
export class HabilitacionesController {
    constructor(private readonly hService: HabilitacionesService) { }

    @Get('buscar-habilitacion-por-colegiado-id/:colegiado_id')
    @ApiOperation({
        summary: 'Buscar habilitación por Id de colegiado',
        description: 'Permite buscar el historial de habilitaciones de un colegiado específico'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'ID de colegiado inválido',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'number', example: 400 },
                message: { type: 'string', example: 'El Id del colegiado debe ser un número válido' }
            }
        }
    })
    async buscarHabilitacionPorColegiadoId(@Param('colegiado_id') colegiado_id: string) {
        try {
            const colegiadoId = parseInt(colegiado_id, 10);
            if (isNaN(colegiadoId)) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'El Id del colegiado debe ser un número válido',
                }, HttpStatus.BAD_REQUEST);
            }
            const result = await this.hService.buscarHabilitacionPorColegiadoId(colegiadoId);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('registrar-habilitacion')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Registrar nueva habilitación',
        description: 'Permite registrar una nueva habilitación para un colegiado'
    })
    @ApiBody({
        type: RegistrarHabilitacion,
        description: 'Datos de la habilitación a registrar',
        examples: {
            example1: {
                value: {
                    colegiado_id: 1,
                    fecha_inicio: "2024-01-01",
                    fecha_fin: "2024-12-31",
                    observacion_registro: "Habilitación regular",
                    usuario_registra: 1
                },
                summary: 'Ejemplo de registro de habilitación'
            }
        }
    })
    async RegistrarHabilitacion(@Body() h: RegistrarHabilitacion, @Req() req: CustomRequest) {
        try {
            const result = await this.hService.registrarHistorialHabilitacion(h, req.user.usuario_id);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('actualizar-habilitacion')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Actualizar habilitación',
        description: 'Permite actualizar una habilitación existente'
    })
    @ApiBody({
        type: ActualizarHabilitacion,
        description: 'Datos de la habilitación a actualizar',
        examples: {
            example1: {
                value: {
                    historial_habilitacion_id: 1,
                    fecha_fin: "2024-12-31",
                    observacion_actualizacion: "Actualización de fecha de fin",
                    usuario_modifica: 1
                },
                summary: 'Ejemplo de actualización de habilitación'
            }
        }
    })
    async actualizarHistorialHabilitacion(@Body() h: ActualizarHabilitacion, @Req() req: CustomRequest) {
        try {
            const result = await this.hService.actualizarHistorialHabilitacion(h, req.user.usuario_id);
            return {
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   

}
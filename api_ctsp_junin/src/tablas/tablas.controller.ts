import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TablasService } from './tablas.service';

@ApiTags('Tablas')
@Controller('tablas')
export class TablasController {
    constructor(private readonly tabService: TablasService) {}

    @Get('roles')
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async findAllRoles() {
        try {
            const result = await this.tabService.findAllRoles();
            return {
                // success: true,
                // message: '',
                rs: result
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An unexpected error occurred',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('especialidades')
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async findAllEspecilidades() {
        try {
            const result = await this.tabService.findAllEspecilidades();
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

    @Get('tipos-documento')
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async findAllTiposDocumento() {
        try {
            const result = await this.tabService.findAllTiposDocumento();
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
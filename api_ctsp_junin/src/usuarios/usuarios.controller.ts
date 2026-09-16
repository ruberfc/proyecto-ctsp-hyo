import { Controller, Get, HttpException, HttpStatus, Post, UseGuards, Body, Req, Headers } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from './usuarios.service';
import { ActulizarUsuario, BuscarUsuario, LoginUsuario, RegistrarUsuario, SolicitarRecuperacionUsuario, VerificarRecuperacionUsuario } from './dtoIn/usuarios';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser, CustomRequest } from './interface/CustomRequest';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly uService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login-usuario')
  @ApiBody({
    type: LoginUsuario,
    description: 'Datos para iniciar sesión de usuario',
    examples: {
      example1: {
        value: {
          usuario: "jperez",
          clave: "password123"
        },
        summary: 'Ejemplo de login de usuario'
      }
    }
  })
  async loginUsuario(@Body() u: LoginUsuario) {
    try {
      const result = await this.uService.loginUsuario(u);
      if (!result) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Credenciales inválidas',
        }, HttpStatus.UNAUTHORIZED);
      }
      return result;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message  || 'An unexpected error occurred',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('busqueda-documento-o-apellidos')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiBody({
    type: BuscarUsuario,
    description: 'Busqueda de usuario por documento o apellidos',
    examples: {
      example1: {
        value: {
          opcion: 0,
          busqueda: ""
        },
        summary: 'Ejemplo de busqueda de usuario por documento o apellidos'
      }
    }
  })
  async findUsuariosDocumentosOApellidos(@Body() usuario: BuscarUsuario) {
    try {
      const { opcion, busqueda } = usuario;
      const result = await this.uService.findUsuariosDocumentosOApellidos(opcion, busqueda);
      return { rs: result };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message  || 'An unexpected error occurred',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('registrar-usuario')
  @ApiBody({
    type: RegistrarUsuario,
    description: 'Datos para registrar un nuevo usuario',
    examples: {
      example1: {
        value: {
          tipo_documento_id: 1,
          numero_documento: "12345678",
          nombres: "Juan",
          apellidos: "Pérez",
          celular: "987654321",
          correo_personal: "juan.perez@example.com",
          direccion: "Av. Principal 123",
          rol_id: 1,
          sexo: 1,
          fecha_nacimiento: "1990-01-01",
          usuario: "jperez",
          clave: "password123"
        },
        summary: 'Ejemplo de registro de usuario'
      }
    }
  })
  async registrarUsuario(@Body() usuario: RegistrarUsuario) {
    try {
      const result = await this.uService.registrarUsuario(usuario);
      return { rs: result };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message  || 'An unexpected error occurred',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('actualizar-usuario')
  @ApiBody({
    type: ActulizarUsuario,
    description: 'Datos para actualizar un usuario existente',
    examples: {
      example1: {
        value: {
          usuario_id: 1,
          tipo_documento_id: 1,
          numero_documento: "12345678",
          nombres: "Juan",
          apellidos: "Pérez",
          celular: "987654321",
          correo_personal: "juan.perez@example.com",
          direccion: "Av. Principal 123",
          rol_id: 1,
          sexo: 1,
          fecha_nacimiento: "1990-01-01",
          usuario: "jperez",
          clave: "password123",
          estado: 1
        },
        summary: 'Ejemplo de actualización de usuario'
      }
    }
  })
  async actualizarUsuario(@Body() u: ActulizarUsuario) {
    try {
      const result = await this.uService.actualizarUsuario(u);
      return { rs: result };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message  || 'An unexpected error occurred',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * PASO 1: Solicitar código de recuperación de contraseña
   * Endpoint público (sin autenticación) - Valida usuario+correo y envía código por email
   */
  @Post('solicitar-recuperacion')
  @ApiOperation({
    summary: 'Solicitar código de recuperación de contraseña',
    description: 'Valida que el usuario exista y el correo coincida. Si es válido, genera un código de 6 dígitos, lo guarda (expira 25 min) y lo envía por email.'
  })
  @ApiBody({
    type: SolicitarRecuperacionUsuario,
    description: 'Usuario y correo para solicitar recuperación',
    examples: {
      example1: {
        value: {
          usuario: "jperez",
          correo_personal: "juan.perez@example.com"
        },
        summary: 'Solicitar código de recuperación'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Código enviado al correo. Retorna { rs: [{ value: 1, msg: "Código enviado correctamente" }] }' })
  @ApiResponse({ status: 200, description: 'Usuario no encontrado o correo no coincide. Retorna { rs: [{ value: 0, msg: "..." }] }' })
  async solicitarRecuperacion(@Body() dto: SolicitarRecuperacionUsuario) {
    try {
      const result = await this.uService.solicitarRecuperacion(dto);
      return { rs: result };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message  || 'Error al solicitar recuperación',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * PASO 2: Verificar código y restablecer contraseña
   * Endpoint público (sin autenticación) - Valida código y actualiza contraseña
   */
  @Post('verificar-recuperacion')
  @ApiOperation({
    summary: 'Verificar código y restablecer contraseña',
    description: 'Valida el código de 6 dígitos (vigente 25 min, uso único). Si es válido, actualiza la contraseña del usuario.'
  })
  @ApiBody({
    type: VerificarRecuperacionUsuario,
    description: 'Usuario, código recibido y nueva contraseña',
    examples: {
      example1: {
        value: {
          usuario: "jperez",
          codigo: "123456",
          nueva_clave: "nuevaPassword123",
          confirmar_clave: "nuevaPassword123"
        },
        summary: 'Verificar código y cambiar contraseña'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada. Retorna { rs: [{ value: 1, msg: "Contraseña actualizada correctamente" }] }' })
  @ApiResponse({ status: 200, description: 'Código inválido/expirado o contraseñas no coinciden. Retorna { rs: [{ value: 0, msg: "..." }] }' })
  async verificarRecuperacion(@Body() dto: VerificarRecuperacionUsuario) {
    try {
      const result = await this.uService.verificarRecuperacion(dto);
      return { rs: result };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (error as Error).message || 'Error al verificar recuperación',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('verificar-token')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verificar la validez de un token JWT',
    description: 'Verifica si un token JWT es válido y no ha caducado. El token debe ser enviado en el encabezado Authorization como Bearer token.'
  })
  @ApiResponse({ status: 200, description: 'Token válido' })
  @ApiResponse({ status: 401, description: 'Token inválido o caducado' })
  async verificarToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException({
        status: false,
        message: 'Token de autenticación no proporcionado o formato incorrecto (esperado: Bearer <token>)',
      }, HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      return { status: true, payload };
    } catch (error) {
      if ((error as Error).message  === 'TokenExpiredError') {
        throw new HttpException({ status: false, message: 'Token caducado' }, HttpStatus.UNAUTHORIZED);
      } else if ((error as Error).message  === 'JsonWebTokenError') {
        throw new HttpException({ status: false, message: 'Token inválido' }, HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException({ status: false, message: (error as Error).message  || 'Error inesperado al verificar el token' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get('perfil')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener perfil del usuario autenticado',
    description: 'Retorna la información del usuario que está autenticado a través de su token JWT.'
  })
  @ApiResponse({ status: 200, description: 'Información del perfil obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado si el token no es válido o está ausente.' })
  async getProfile(@Req() req: CustomRequest): Promise<AuthenticatedUser> {
    return req.user;
  }

}
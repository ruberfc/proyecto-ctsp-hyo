import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from '../usuarios/interface/CustomRequest';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: any): Promise<AuthenticatedUser> {
    if (!payload) {
      throw new UnauthorizedException();
    }
    
    return {
      usuario_id: payload.usuario_id,
      usuario: payload.usuario,
      rol_id: payload.rol_id,
      nombre_rol: payload.nombre_rol,
      tipo_documento_id: payload.tipo_documento_id,
      numero_documento: payload.numero_documento,
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      celular: payload.celular,
      correo_personal: payload.correo_personal,
    };
  }
} 
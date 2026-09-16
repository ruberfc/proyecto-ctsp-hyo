import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { RecoveryCodeData } from './interfaces/mail-options';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Envía el código de recuperación de contraseña por email
   * @param to Email destino
   * @param data Datos para el template (nombre, código, tipo, expiración)
   */
  async sendRecoveryCode(to: string, data: RecoveryCodeData): Promise<void> {
    const { nombre, codigo, tipo, expiracionMinutos } = data;
    const anio = new Date().getFullYear();

    // Convertir código a array para template (cada dígito separado)
    const codigoArray = codigo.split('');

    const tipoLabel = tipo === 'usuario' ? 'Usuario del Sistema' : 'Colegiado';

    try {
      await this.mailerService.sendMail({
        to,
        subject: `Código de recuperación - CTSP Huancayo (${tipoLabel})`,
        template: 'recovery-code', // Handlebars template sin extensión
        context: {
          nombre,
          codigo,
          codigoArray,
          tipo,
          tipoLabel,
          expiracionMinutos,
          anio,
          to,
        },
      });

      this.logger.log(`Código de recuperación enviado a ${to} (tipo: ${tipo})`);
    } catch (error) {
      this.logger.error(`Error enviando email a ${to}: ${(error as Error).message}`, (error as Error).stack);
      throw new Error(`No se pudo enviar el correo de recuperación: ${(error as Error).message}`);
    }
  }

  /**
   * Verifica la configuración del transporte de correo
   * Útil para health checks
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.mailerService.getTransporter().verify();
      return true;
    } catch (error) {
      this.logger.error(`Verificación de conexión SMTP fallida: ${(error as Error).message}`);
      return false;
    }
  }
}
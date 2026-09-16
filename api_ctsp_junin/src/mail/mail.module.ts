import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT') || 587,
          secure: configService.get<boolean>('MAIL_SECURE') || false, // true para 465, false para 587
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
          // Opciones adicionales para compatibilidad con distintos proveedores
          tls: {
            rejectUnauthorized: configService.get<string>('NODE_ENV') === 'production',
          },
        },
        defaults: {
          from: `"${configService.get<string>('MAIL_FROM_NAME') || 'CTSP Huancayo'}" <${configService.get<string>('MAIL_FROM') || configService.get<string>('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
            // Helpers personalizados para Handlebars
            helpers: {
              eq: (a: any, b: any) => a === b,
            },
          },
        },
        // Opciones de preview en desarrollo (Ethereal/Mailtrap)
        preview: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
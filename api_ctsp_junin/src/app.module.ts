import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

import { TablasModule } from './tablas/tablas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ColegiadosModule } from './colegiados/colegiados.module';
import { HabilitacionesModule } from './habilitaciones/habilitaciones.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST')!,
        port: +configService.get<number>('DB_PORT')!,
        username: configService.get('DB_USERNAME')!,
        password: configService.get('DB_PASSWORD')!,
        database: configService.get('DB_NAME')!,
        entities: [],
        synchronize: false,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
        extra: {
          connectionLimit: 10
        }
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    MailModule,        // Módulo de correo para recuperación de contraseña
    AuthModule,
    UsuariosModule,
    ColegiadosModule,
    HabilitacionesModule,
    TablasModule,
    // UsuarioModule,
    // IncidenciaModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
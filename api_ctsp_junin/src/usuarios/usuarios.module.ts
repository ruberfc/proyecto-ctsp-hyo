import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [DatabaseModule, AuthModule, MailModule],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService],
})
export class UsuariosModule {}
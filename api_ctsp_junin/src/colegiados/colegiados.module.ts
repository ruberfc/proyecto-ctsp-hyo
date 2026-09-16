import { Module } from '@nestjs/common';
import { ColegiadosController } from './colegiados.controller';
import { ColegiadosService } from './colegiados.service';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [DatabaseModule, MailModule],
    controllers: [ColegiadosController],
    providers: [ColegiadosService],
})
export class ColegiadosModule {}
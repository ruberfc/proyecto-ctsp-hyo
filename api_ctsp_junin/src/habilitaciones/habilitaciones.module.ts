import { Module } from '@nestjs/common';
import { HabilitacionesController } from './habilitaciones.controller';
import { HabilitacionesService } from './habilitaciones.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [HabilitacionesController],
    providers: [HabilitacionesService],
})
export class HabilitacionesModule {} 
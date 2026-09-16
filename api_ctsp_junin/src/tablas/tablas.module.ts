import { Module } from '@nestjs/common';
import { TablasController } from './tablas.controller';
import { TablasService } from './tablas.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TablasController],
    providers: [TablasService],
})
export class TablasModule {} 
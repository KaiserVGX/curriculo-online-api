import { Module } from '@nestjs/common';
import { EscolaridadesController } from './escolaridade.controller';
import { EscolaridadesService } from './escolaridade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscolaridadeModel } from './escolaridade.model';
import { CandidatoModule } from '../candidato/candidato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EscolaridadeModel]), 
    CandidatoModule
  ],
  controllers: [EscolaridadesController],
  providers: [EscolaridadesService]
})
export class EscolaridadesModule {}
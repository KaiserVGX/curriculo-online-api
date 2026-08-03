import { Module } from '@nestjs/common';
import { CandidatoController } from './candidato.controller';
import { CandidatoService } from './candidato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatoModel } from './candidato.model';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatoModel]), UsuariosModule],
  controllers: [CandidatoController],
  providers: [CandidatoService]
})
export class CandidatoModule {}

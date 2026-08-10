import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EscolaridadeModel } from './escolaridade.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatoService } from '../candidato/candidato.service';
import { EscolaridadeRequestDto } from './dto/escolaridade_request.dto';
import { promises } from 'dns';

@Injectable()
export class EscolaridadesService {
    constructor(
        @InjectRepository(EscolaridadeModel)
        private readonly escolaridadeRepository: Repository<EscolaridadeModel>,
        private readonly candidatoService: CandidatoService
    ){}

    async novaEscolaridade(
        usuarioId:string, 
        request: EscolaridadeRequestDto):Promise<void> {
        
       const candidato = await this.candidatoService
                .bucarCandidatoPorUsuarioId(usuarioId)
                
        await this.escolaridadeRepository.save({
            nomeInstituicao: request.nomeInstituicao,
            nomeCurso: request.nomeCurso,
            tipoEscolaridade: request.tipoEscolaridade,
            candidato,
            concluido: request.concluido,
            anoInicio: request.anoInicio,
            anoFim: request.anoFim
        })
    }

    async carregarEscolaridadeCandidato(usuarioId: string)
    :Promise<EscolaridadeModel[]> {
        return await this.escolaridadeRepository.find({
            where: {
                candidato: {
                    usuario: {
                        id: usuarioId
                    }
                }
            }
        })
    }
     

}
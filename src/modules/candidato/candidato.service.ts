import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidatoModel } from './candidato.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CandidatoRequestDto } from './dto/candidato_request.dto';

@Injectable()
export class CandidatoService {
    
    constructor(
        @InjectRepository(CandidatoModel)
        private readonly candidatoRepository: Repository<CandidatoModel>,
        private readonly usuarioService: UsuariosService
    ){}

    async adicionarDados(idUsuario: string, 
        request: CandidatoRequestDto):Promise<void> {
            const usuario = await this.usuarioService
            .buscarUsuarioPeloId(idUsuario)
    
            const existeDados = await this.bucarCandidatoPorCpf(request.cpf)

            if(!existeDados) {
                await this.candidatoRepository.save({
                    cpf: request.cpf,
                    estadoCivil: request.estadoCivil,
                    dataNascimento: request.dataNascimento,
                    nomeCompleto: request.nome,
                    sexo: request.sexo,
                    usuario
                })
            } else {
                await this.candidatoRepository.update(existeDados.id, request)
            }
        }

    async bucarCandidatoPorCpf(cpf: string): Promise<CandidatoModel | null>{
        return await this.candidatoRepository.findOneBy({ cpf })
    }

     async bucarCandidatoPorUsuarioId(usuarioId: string): Promise<CandidatoModel>{
        const candidato = await this.candidatoRepository
            .findOneBy({ usuario: { id: usuarioId } })
        if(!candidato) 
            throw new BadRequestException("Candidato não encontrado")
        return candidato    
    }

    
    
    
    async carregarDadosPeloUsuario(usuarioId: string):Promise<CandidatoModel> {
        const candidato = await this.candidatoRepository.findOne({
            where: {
                usuario: {
                    id: usuarioId
                }
            },
            relations: {
                usuario: true
            }
        })

        if(!candidato)throw new NotFoundException("Nenhum candidato encontrado")
        return candidato
    }
}
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidatoModel } from './candidato.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { candidatoRequestDto } from './dto/candidato_request.dto';

@Injectable()
export class CandidatoService {
    
    constructor(
        @InjectRepository(CandidatoModel)
        private readonly candidatoRepository: Repository<CandidatoModel>,
        private readonly usuarioService: UsuariosService
    ){}

    async adicionarDados(idUsuario: string, 
        request: candidatoRequestDto):Promise<void> {
        const usuario = await this.usuarioService
            .buscarUsuarioPeloId(idUsuario)
        
        const candidato = this.candidatoRepository.create({
            cpf: request.cpf,
            estadoCivil: request.estadocivil,
            dataNascimento: request.datanascimento,
            nomeCompleto: request.nome,
            sexo: request.sexo,
            usuario
        })    

        await this.candidatoRepository.save(candidato)
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
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioModel } from './usuario.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuarioModel)
        private readonly usuarioRepository: Repository<UsuarioModel> 
    ){}

    async addUsuario(request: UsuarioRequestDto){
        // TODO: validar se existe usuário cadastrado com mesmo email
        const existeUsuario = await this.usuarioRepository.existsBy({
            email: request.email
        })
        // TODO: Caso exista, emitir um erro de Bad Request
        if(existeUsuario) {
            throw new BadRequestException("Ops! Usuário já cadastrado.")
        }
        // TODO: criptografar a senha 8 - 12
        const hashPassword = await bcrypt.hash(request.senha, 12)
        // TODO: Iremos criar o objeto de usuário
        const usuario = this.usuarioRepository.create({
            email: request.email,
            senha: hashPassword,
            ativo: true
        }) 
        // TODO: Salvar o usuário
        await this.usuarioRepository.save(usuario) 
    }

    async listarUsuarios():Promise<UsuarioModel[]> {
        return await this.usuarioRepository.find()
    }

    async buscarUsuarioPeloId(usuarioId:string): Promise<UsuarioModel> {
        const usuario = await this.usuarioRepository.findOneBy({
            id: usuarioId
        })

        if(!usuario) throw new NotFoundException("Usuario não encontrado!")
        return usuario    
    }
    
    async buscarUsuarioPeloEmail(email:string): Promise<UsuarioModel> {
        const usuario = await this.usuarioRepository.findOneBy({
            email
        })

        if(!usuario) throw new NotFoundException("Usuario não encontrado!")
        return usuario    
    }

    async filtrar(data: {id: string, email: string})
    :Promise<UsuarioModel | null> {
        let result
        if(data.id)
            result = await this.usuarioRepository.findOneBy({id:data.id})
        if(data.email)
            result = await this.usuarioRepository.findOneBy({email:data.email})
        return result
    }

    async ativarOuDesativarUsuario(usuarioId:string):Promise<void> {}
}
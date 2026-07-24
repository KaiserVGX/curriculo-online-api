import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioMoel } from './usuario.model';
import { Repository } from 'typeorm';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import bcryt from 'bcrypt';
import { request } from 'http';
import { IsEmail } from 'class-validator';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuarioMoel)
        private readonly usuarioRepository: Repository<UsuarioMoel>
    ){}

    async addUsuario(Request: UsuarioRequestDto){
        const existeUsuario = await this.usuarioRepository.existsBy({
            email: Request.email
        })
    if(existeUsuario) {
        throw new BadRequestException("Ops! Usuario já cadastro.")
    }
    
    const hashPassword = await bcryt.hash(Request.senha, 12)
    const usuario = this.usuarioRepository.creste({
        email: Request.email,
        senha: hashPassword,
        ativo: true
    })

    await this.usuarioRepository.save(usuario)

}


}

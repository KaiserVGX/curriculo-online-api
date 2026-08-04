import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import bcrypt from 'bcrypt'
import { UsuarioRequestDto } from '../usuarios/dto/usuario_request.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuariosService
    ){}

    async logarUsuario(request: UsuarioRequestDto):Promise<string> {
        const usuario = await this.usuarioService
            .buscarUsuarioPeloEmail(request.email)
        
        const confirmarSenha = await bcrypt.compare(request.senha, usuario.senha)
        console.log("*****", confirmarSenha)
        if(!confirmarSenha) {
            throw new BadRequestException("Usuario ou senha inválido")
        }
        return "FQDPZeu5wfQTUuSJk4EytLPevTBEU3wdJRjL1Dy3HIrBnUN1ypWw"
    }
}
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import bcrypt from 'bcrypt'
import { UsuarioRequestDto } from '../usuarios/dto/usuario_request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth_response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService
    ){}

    async logarUsuario(request: UsuarioRequestDto):Promise<AuthResponseDto>{
        const usuario = await this.usuarioService
            .buscarUsuarioPeloEmail(request.email)
        
        const confirmaSenha = await bcrypt.compare(request.senha, usuario.senha)
        
        if(!confirmaSenha) {
            throw new BadRequestException("Usuário ou senha inválida")
        }

        // para passar as informações que irão no token
        const token = await this.jwtService.signAsync({
            sub: usuario.id
        })

        return { token }
    }
}
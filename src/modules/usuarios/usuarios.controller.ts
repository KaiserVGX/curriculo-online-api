import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import {  ApiTags } from '@nestjs/swagger';
import { usuarioAtual } from 'src/decorators/usuario_atual';
import { AuthGuard } from 'src/guards/auth_guard';
import { UsuarioModel } from './usuario.model';

@ApiTags('Usuario')
@Controller('usuarios')
@UseGuards(AuthGuard)
export class UsuariosController {
    constructor(
        private readonly usuarioService: UsuariosService
    ){}

    @Get("/me")
    async perfil(@usuarioAtual('sub') usuarioId: string):Promise<UsuarioModel> {
        return await this.usuarioService.buscarUsuarioPeloId(usuarioId)
    }

}
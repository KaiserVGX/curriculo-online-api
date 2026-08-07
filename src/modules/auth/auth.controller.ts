import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioRequestDto } from '../usuarios/dto/usuario_request.dto';
import { AuthResponseDto } from './dto/auth_response.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from '../usuarios/usuarios.service';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuariosService
    ){}

    @Post("/logar")
    async logar(@Body() request: UsuarioRequestDto): Promise<AuthResponseDto> {
        return await this.authService.logarUsuario(request)
    }

    @Post("/cadastar")
    @ApiOperation({
        summary: 'Registrar um novo usuário',
        description:'Cria um novo usuario para gerar um perfil'
    })
    @ApiBody({ type: UsuarioRequestDto })
    @ApiResponse({
        status: 201,
        description: 'Usuário criado com sucesso',
        type: UsuarioRequestDto
    })
    @ApiResponse({
        status: 400,
        description: 'Usuário com email já registrado',
        type: BadRequestException
    })
    async registrarUsuario(@Body() request: UsuarioRequestDto): Promise<void> {
        await this.usuarioService.addUsuario(request)
    }


}
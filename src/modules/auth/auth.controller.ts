import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioRequestDto } from '../usuarios/dto/usuario_request.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post()
    async logar(@Body() request: UsuarioRequestDto): Promise<string> {
        return await this.authService.logarUsuario(request)
    }
}

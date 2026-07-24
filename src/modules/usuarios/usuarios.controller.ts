import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioRequestDto } from './dto/usuario_request.dto';


@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly UsuarioService: UsuariosService
    ){}

    @Post()
    async registrarUsuario(@Body() Request: UsuarioRequestDto): Promise<void>
      await this.UsuarioService.addUsuario(Request)

}

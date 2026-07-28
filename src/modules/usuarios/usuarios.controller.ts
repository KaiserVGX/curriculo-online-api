import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { UsuarioModel } from './usuario.model';
import { UsuariosModule } from './usuarios.module';

@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuarioService: UsuariosService
    ){}

    @Post()
    async registrarUsuario(@Body() request: UsuarioRequestDto): Promise<void> {
        await this.usuarioService.addUsuario(request)
    }

    @Get()
    listarUsuarios() {
    return this.usuarioService.listarUsuarios();
}
    
    
    @Get("/filtar")
    async filtrarUsuario(
        @Query("data") data: {id: string, email: string})
        :Promise<UsuarioModel | null> {
            return await this.usuarioService.filtrar(data)
        }


}


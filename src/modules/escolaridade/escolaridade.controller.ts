import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { usuarioAtual } from 'src/decorators/usuario_atual';
import { AuthGuard } from 'src/guards/auth_guard';
import { EscolaridadesService } from './escolaridade.service';
import { EscolaridadeRequestDto } from './dto/escolaridade_request.dto';

@UseGuards(AuthGuard)
@Controller('escolaridades')
export class EscolaridadesController {

    constructor(
        private readonly escolaridadeService: EscolaridadesService
    ){}

    // Para add Escolaridade
    @Post()
    async addEscolaridade(
        @usuarioAtual('sub') usuarioId: string,
        @Body() request: EscolaridadeRequestDto
    )
    :Promise<void> {
        
    }

    // Para Editar escolaridade
    @Put("/:idEscolaridade")
    async editarEscolaridade(@usuarioAtual('sub') usuarioId: string):Promise<void> {}

    // Listar as escolaridade de um candidato
    @Get()
    async listarEscolaridadeDoCandidato(@usuarioAtual('sub') usuarioId: string): Promise<void> {}
    
    // Excluir uma escolaridade
    @Delete("/:idEscolaridade")
    async excluirEscolaridade(@usuarioAtual('sub') usuarioId: string):Promise<void> {}
}
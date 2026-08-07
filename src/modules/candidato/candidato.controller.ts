import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoRequestDto } from './dto/candidato_request.dto';
import { CandidatoModel } from './candidato.model';
import { AuthGuard } from 'src/guards/auth_guard';
import { usuarioAtual} from 'src/decorators/usuario_atual';

@UseGuards(AuthGuard)
@Controller('candidatos')
export class CandidatoController {

    constructor(
        private readonly candidatoService: CandidatoService
    ){}

    @Post()
    async addCandidato(
        @usuarioAtual('sub') usuarioId: string,
        @Body() request: CandidatoRequestDto):Promise<void> {
        await this.candidatoService.adicionarDados(usuarioId, request)
    }

    @Get()
    async carregarDadosCandidato(
        @usuarioAtual('sub') usuarioId: string)
        :Promise<CandidatoModel> {
        return await this.candidatoService
            .carregarDadosPeloUsuario(usuarioId)
    }
}
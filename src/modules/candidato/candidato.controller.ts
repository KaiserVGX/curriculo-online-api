import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { candidatoRequestDto } from './dto/candidato_request.dto';
import { CandidatoModel } from './candidato.model';

@Controller('candidato')
export class CandidatoController {
 
   constructor(
    private readonly candidatoService: CandidatoService
   ){}

   @Post()
   async addCandidato(
    @Body() request: candidatoRequestDto):Promise<void> {
    await this.candidatoService.adicionarDados(request.usuarioId, request)
   }

   @Get("/:id")
   async carregarDadosCandidato(@Param("id") usuarioId: string)
    :Promise<CandidatoModel> {
        return await this.candidatoService
            .carregarDadosPeloUsuario(usuarioId)
    }
   

}

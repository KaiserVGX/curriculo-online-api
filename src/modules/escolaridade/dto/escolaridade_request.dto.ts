import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { TipoEscolaridade } from "../escolaridade.model"

export class EscolaridadeRequestDto {
    
    @IsNotEmpty({ message: "Campo nome instituição é obrigratório"})
    nomeInstituicao: string

    @IsNotEmpty({ message: "Campo nome curso é obrigratório"})
    nomeCurso: string
    
    @IsEnum(TipoEscolaridade, {message: "Tipo invalido"})
    @IsNotEmpty({ message: "Campo Tipo Escolaridade é obrigratório"})
    tipoEscolaridade: TipoEscolaridade

    @IsOptional()
    @IsBoolean()
    concluido: boolean
    
    @IsNumber()
    @IsNotEmpty({ message: "Campo ano inicio é obrigratório"})
    anoInicio: number
    
    @IsOptional()
    @IsNumber()
    anoFim: number
}
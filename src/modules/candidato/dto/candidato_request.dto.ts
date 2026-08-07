import { IsDate, IsEnum, IsNotEmpty, MaxDate, MinLength, ValidationArguments } from "class-validator"
import { Type } from "class-transformer"
import { IsCPF } from "class-validator-cpf"
import { Sexo } from "../enums/sexo.enum"
import { EstadoCivil } from "../enums/estado-civil.enum"

export class CandidatoRequestDto {
    
    @IsNotEmpty({message: "Campo CPF é obrigatório"})
    @IsCPF({ message: "CPF Inválido!"})
    cpf: string
    
    @IsNotEmpty({message: "Campo NOME é obrigatório"})
    @MinLength(6, {
        message: (args: ValidationArguments) =>
        `O campo '${args.property}' deve conter no mínimo 
        ${args.constraints[0]} caracteres.`,
    })
    nome: string

    @IsNotEmpty({message: "Campo DATA NASCIMENTO é obrigatório"})
    @Type(() => Date)
    @IsDate({
        message: 'DATA NASCIMENTO deve ser uma data válida',
    })
    @MaxDate(new Date(), {
        message: 'DATA NASCIMENTO não pode ser uma data futura',
    })
    dataNascimento: Date

    @IsNotEmpty({message: "Campo SEXO é obrigatório"})
    @IsEnum(Sexo)
    sexo: Sexo

    @IsNotEmpty({message: "Campo ESTADO CIVIL é obrigatório"})
    @IsEnum(EstadoCivil)
    estadoCivil: EstadoCivil
}
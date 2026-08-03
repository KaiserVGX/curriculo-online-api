import { IsDate, isDate, IsEnum, IsNotEmpty, isNotEmpty, MaxDate, MinLength, ValidationArguments } from "class-validator"
import { Sexo } from "../enums/sexo.enum"
import { EstadoCivil } from "../enums/estado-civil.enum"
import { IsCPF } from "class-validator-cpf"
import { Type } from "class-transformer"

export class candidatoRequestDto{
  
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
    message: 'DATA DE NASCIMENTO deve ser uma data válida'
  })
  @MaxDate(new Date(),{
    message: 'DATA DE NACIMENTO não pode ser uma data futura'
  })
  datanascimento: Date

  @IsNotEmpty({message: "Campo SEXO é obrigatório"})
  @IsEnum(Sexo)
  sexo: Sexo

  @IsNotEmpty({message: "Campo ESTADO CIVIL é obrigatório"})
  @IsEnum(EstadoCivil)
  estadocivil: EstadoCivil

  @IsNotEmpty()
  usuarioId: string

}

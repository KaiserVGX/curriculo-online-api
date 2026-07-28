import { IsEmail, IsNotEmpty, MinLength, ValidationArguments } from "class-validator"

export class UsuarioRequestDto {
    
    @IsNotEmpty({ message: "Campo EMAIL obrigatório"})
    @IsEmail({},{message: "Informe um e-mail válido."})
    email:string

    @IsNotEmpty({ message: "Campo SENHA obrigatório"})
    @MinLength(6, {
    message: (args: ValidationArguments) =>
      `O campo '${args.property}' deve conter no mínimo 
        ${args.constraints[0]} caracteres.`,
    })
    senha:string
}
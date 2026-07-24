import { isEmail, IsNotEmpty, isNotEmpty, MinLength, ValidationArguments } from "class-validator";




export class UsuarioRequestDto {

    @isNotEmpty({ message: "Compo EMAIL obrigatorio"})
    @isEmail({},{message: "Informe um e-mail válido."})
    email:string
    
    @IsNotEmpty({ message: "Campo SENHA obrigatório"})
    @MinLength(6, {
    message: (args: ValidationArguments) =>
        `O campo '$(args.property)' deve conter no minimo ${args.constraints[0]} caracteres.`,
    })
    senha:string
}
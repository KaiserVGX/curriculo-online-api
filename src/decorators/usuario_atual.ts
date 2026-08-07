import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequisicaoAutenticada } from "src/guards/auth_guard";




export const usuarioAtual = createParamDecorator(
    (
        propriedade: string | undefined,
        contexto: ExecutionContext
    ) => {

        const requisicao = contexto
        .switchToHttp().getRequest<RequisicaoAutenticada>();

        const usuario = requisicao.usuario

        return propriedade ?
        usuario?.[propriedade as keyof typeof usuario]
        :
        usuario
    }
)
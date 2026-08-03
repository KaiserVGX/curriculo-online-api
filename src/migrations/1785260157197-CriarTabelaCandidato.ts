import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaCandidato1785260157197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        create table if not exists candidatos(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    dt_nascimento DATE NOT NULL,
    sexo VARCHAR(15) NOT NULL DEFAULT 'OUTROS',
    est_civil VARCHAR(15) NOT NULL DEFAULT 'SOLTEIRO',
    usuario_id UUID NOT NULL,
    CONSTRAINT fk_usuario_candidato FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON UPDATE NO ACTION
        ON DELETE CASCADE
      );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

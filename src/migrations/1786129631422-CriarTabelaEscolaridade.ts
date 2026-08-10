import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaEscolaridade1786129631422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
        create table if not exists escolaridade(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nm_instituicao VARCHAR(150) NOT NULL,
    nm_curso VARCHAR(150) NOT NULL,
    tipo VARCHAR(150) NOT NULL DEFAULT 'MEDIO',
    concluido BOOLEAN DEFAULT NOT NULL,
    ano_inicio INTEGER NOT NULL,
    ano_fim INTERGER
    candidato_id UUID NOT NULL,
    CONSTRAINT fk_usuario_candidato FOREIGN KEY (candidato_id)
        REFERENCES candidato(id) ON UPDATE NO ACTION
        ON DELETE CASCADE
      );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

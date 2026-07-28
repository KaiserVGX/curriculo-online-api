import { MigrationInterface, QueryRunner, Unique } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

export class CriarTabelaUsuario1784913810628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists usuarios(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    dt_cadastro TIMESTAMP NOT NULL DEFAULT now()
      );
    `)
}

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable("usuarios")
     
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746871707451 implements MigrationInterface {
    name = 'Migration1746871707451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tilte" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}

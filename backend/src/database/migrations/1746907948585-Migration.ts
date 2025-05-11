import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746907948585 implements MigrationInterface {
    name = 'Migration1746907948585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizes" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizes" DROP COLUMN "title"`);
    }

}

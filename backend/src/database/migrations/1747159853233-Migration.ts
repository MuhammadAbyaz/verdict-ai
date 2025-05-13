import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747159853233 implements MigrationInterface {
    name = 'Migration1747159853233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}

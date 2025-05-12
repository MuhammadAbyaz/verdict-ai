import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747067742457 implements MigrationInterface {
    name = 'Migration1747067742457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hearts" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hearts"`);
    }

}

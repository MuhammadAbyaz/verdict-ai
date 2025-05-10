import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746876387728 implements MigrationInterface {
    name = 'Migration1746876387728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "tilte" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "title" TO "tilte"`);
    }

}

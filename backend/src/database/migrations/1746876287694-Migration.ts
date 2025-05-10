import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746876287694 implements MigrationInterface {
    name = 'Migration1746876287694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "thumbnail" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "thumbnail" SET NOT NULL`);
    }

}

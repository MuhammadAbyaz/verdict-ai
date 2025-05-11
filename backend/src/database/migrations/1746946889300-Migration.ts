import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746946889300 implements MigrationInterface {
    name = 'Migration1746946889300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-course" ALTER COLUMN "testProgress" SET DEFAULT 'Unattempted'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-course" ALTER COLUMN "testProgress" DROP DEFAULT`);
    }

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746894275362 = void 0;
class Migration1746894275362 {
    constructor() {
        this.name = 'Migration1746894275362';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user-course" DROP COLUMN "progress"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "testId" uuid`);
        await queryRunner.query(`ALTER TABLE "user-course" ADD "moduleProgress" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user-course" ADD "testProgress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_94296641072b0f034d14e272cc6" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_94296641072b0f034d14e272cc6"`);
        await queryRunner.query(`ALTER TABLE "user-course" DROP COLUMN "testProgress"`);
        await queryRunner.query(`ALTER TABLE "user-course" DROP COLUMN "moduleProgress"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "testId"`);
        await queryRunner.query(`ALTER TABLE "user-course" ADD "progress" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "tests"`);
    }
}
exports.Migration1746894275362 = Migration1746894275362;
//# sourceMappingURL=1746894275362-Migration.js.map
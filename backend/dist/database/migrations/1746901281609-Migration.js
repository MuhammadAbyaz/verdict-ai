"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746901281609 = void 0;
class Migration1746901281609 {
    constructor() {
        this.name = 'Migration1746901281609';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "quizes" DROP CONSTRAINT "FK_0921273ca43878398b3afdd6634"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "testId" uuid`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "UQ_dc9991ea6115b0b50c59806b4ed" UNIQUE ("testId")`);
        await queryRunner.query(`ALTER TABLE "quizes" ADD CONSTRAINT "FK_0921273ca43878398b3afdd6634" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_dc9991ea6115b0b50c59806b4ed" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_dc9991ea6115b0b50c59806b4ed"`);
        await queryRunner.query(`ALTER TABLE "quizes" DROP CONSTRAINT "FK_0921273ca43878398b3afdd6634"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "UQ_dc9991ea6115b0b50c59806b4ed"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "testId"`);
        await queryRunner.query(`ALTER TABLE "quizes" ADD CONSTRAINT "FK_0921273ca43878398b3afdd6634" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Migration1746901281609 = Migration1746901281609;
//# sourceMappingURL=1746901281609-Migration.js.map
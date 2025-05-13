"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746946889300 = void 0;
class Migration1746946889300 {
    constructor() {
        this.name = 'Migration1746946889300';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user-course" ALTER COLUMN "testProgress" SET DEFAULT 'Unattempted'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user-course" ALTER COLUMN "testProgress" DROP DEFAULT`);
    }
}
exports.Migration1746946889300 = Migration1746946889300;
//# sourceMappingURL=1746946889300-Migration.js.map
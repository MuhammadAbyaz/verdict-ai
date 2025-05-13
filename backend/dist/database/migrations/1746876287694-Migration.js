"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746876287694 = void 0;
class Migration1746876287694 {
    constructor() {
        this.name = 'Migration1746876287694';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "thumbnail" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "thumbnail" SET NOT NULL`);
    }
}
exports.Migration1746876287694 = Migration1746876287694;
//# sourceMappingURL=1746876287694-Migration.js.map
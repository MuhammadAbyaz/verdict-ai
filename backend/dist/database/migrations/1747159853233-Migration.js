"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1747159853233 = void 0;
class Migration1747159853233 {
    constructor() {
        this.name = 'Migration1747159853233';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }
}
exports.Migration1747159853233 = Migration1747159853233;
//# sourceMappingURL=1747159853233-Migration.js.map
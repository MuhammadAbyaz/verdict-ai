"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746907948585 = void 0;
class Migration1746907948585 {
    constructor() {
        this.name = 'Migration1746907948585';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "quizes" ADD "title" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "quizes" DROP COLUMN "title"`);
    }
}
exports.Migration1746907948585 = Migration1746907948585;
//# sourceMappingURL=1746907948585-Migration.js.map
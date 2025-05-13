"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746876387728 = void 0;
class Migration1746876387728 {
    constructor() {
        this.name = 'Migration1746876387728';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "tilte" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "title" TO "tilte"`);
    }
}
exports.Migration1746876387728 = Migration1746876387728;
//# sourceMappingURL=1746876387728-Migration.js.map
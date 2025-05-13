"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1747067742457 = void 0;
class Migration1747067742457 {
    constructor() {
        this.name = 'Migration1747067742457';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "hearts" integer NOT NULL DEFAULT '10'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hearts"`);
    }
}
exports.Migration1747067742457 = Migration1747067742457;
//# sourceMappingURL=1747067742457-Migration.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746871707451 = void 0;
class Migration1746871707451 {
    constructor() {
        this.name = 'Migration1746871707451';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tilte" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "courses"`);
    }
}
exports.Migration1746871707451 = Migration1746871707451;
//# sourceMappingURL=1746871707451-Migration.js.map
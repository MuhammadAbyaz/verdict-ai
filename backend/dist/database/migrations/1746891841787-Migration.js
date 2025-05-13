"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1746891841787 = void 0;
class Migration1746891841787 {
    constructor() {
        this.name = 'Migration1746891841787';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying, "order" integer NOT NULL, "videoUrl" character varying, "moduleId" uuid, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "questionId" uuid, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "order" integer NOT NULL, "quizId" uuid, "correctOptionId" uuid, CONSTRAINT "REL_2d430ab05ee2d6fed1ae1f2b45" UNIQUE ("correctOptionId"), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "moduleId" uuid, CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "xp" integer NOT NULL, "courseId" uuid, CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, "progress" integer NOT NULL DEFAULT '0', "enrolledAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_968e4e3cf7d2d4ac9434bc770b0" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_16e7969589c0b789d9868782259" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_46b668c49a6c4154d4643d875a5" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d" FOREIGN KEY ("quizId") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_2d430ab05ee2d6fed1ae1f2b453" FOREIGN KEY ("correctOptionId") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizes" ADD CONSTRAINT "FK_0921273ca43878398b3afdd6634" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modules" ADD CONSTRAINT "FK_83489b37212a5a547bde8f89014" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-course" ADD CONSTRAINT "FK_4019794479179f9358f6b8f57ed" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-course" ADD CONSTRAINT "FK_a3d761aa5269f9af4758ab14cd6" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user-course" DROP CONSTRAINT "FK_a3d761aa5269f9af4758ab14cd6"`);
        await queryRunner.query(`ALTER TABLE "user-course" DROP CONSTRAINT "FK_4019794479179f9358f6b8f57ed"`);
        await queryRunner.query(`ALTER TABLE "modules" DROP CONSTRAINT "FK_83489b37212a5a547bde8f89014"`);
        await queryRunner.query(`ALTER TABLE "quizes" DROP CONSTRAINT "FK_0921273ca43878398b3afdd6634"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_2d430ab05ee2d6fed1ae1f2b453"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_46b668c49a6c4154d4643d875a5"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_16e7969589c0b789d9868782259"`);
        await queryRunner.query(`DROP TABLE "user-course"`);
        await queryRunner.query(`DROP TABLE "modules"`);
        await queryRunner.query(`DROP TABLE "quizes"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
    }
}
exports.Migration1746891841787 = Migration1746891841787;
//# sourceMappingURL=1746891841787-Migration.js.map
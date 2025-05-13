"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const course_entity_1 = require("../../course/entities/course.entity");
const question_entity_1 = require("../../question/entities/question.entity");
const typeorm_1 = require("typeorm");
let Test = class Test {
};
exports.Test = Test;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Test.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => course_entity_1.Course, (course) => course.test),
    __metadata("design:type", course_entity_1.Course)
], Test.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.test),
    __metadata("design:type", Array)
], Test.prototype, "questions", void 0);
exports.Test = Test = __decorate([
    (0, typeorm_1.Entity)('tests')
], Test);
//# sourceMappingURL=test.entity.js.map
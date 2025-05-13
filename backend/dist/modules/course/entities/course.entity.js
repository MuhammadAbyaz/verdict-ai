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
exports.Course = void 0;
const class_validator_1 = require("class-validator");
const course_levels_1 = require("../../../constants/course-levels");
const typeorm_1 = require("typeorm");
const module_entity_1 = require("../../module/entities/module.entity");
const user_course_entity_1 = require("../../user-course/entities/user-course.entity");
const test_entity_1 = require("../../test/entities/test.entity");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(course_levels_1.COURSE_LEVEL),
    (0, typeorm_1.Column)({
        enum: course_levels_1.COURSE_LEVEL,
    }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => module_entity_1.Module, (module) => module.course, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Course.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_course_entity_1.UserCourse, (uc) => uc.course),
    __metadata("design:type", Array)
], Course.prototype, "userCourses", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => test_entity_1.Test, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", test_entity_1.Test)
], Course.prototype, "test", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)('courses')
], Course);
//# sourceMappingURL=course.entity.js.map
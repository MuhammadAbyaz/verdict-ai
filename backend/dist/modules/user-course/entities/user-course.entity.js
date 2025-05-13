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
exports.UserCourse = void 0;
const test_progress_1 = require("../../../constants/test-progress");
const course_entity_1 = require("../../course/entities/course.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let UserCourse = class UserCourse {
};
exports.UserCourse = UserCourse;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserCourse.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserCourse.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userCourses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], UserCourse.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.userCourses, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.Course)
], UserCourse.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserCourse.prototype, "moduleProgress", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(test_progress_1.TEST_PROGRESS),
    (0, typeorm_1.Column)({
        enum: test_progress_1.TEST_PROGRESS,
        default: test_progress_1.TEST_PROGRESS.UNATTEMPTED,
    }),
    __metadata("design:type", String)
], UserCourse.prototype, "testProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserCourse.prototype, "enrolledAt", void 0);
exports.UserCourse = UserCourse = __decorate([
    (0, typeorm_1.Entity)('user-course')
], UserCourse);
//# sourceMappingURL=user-course.entity.js.map
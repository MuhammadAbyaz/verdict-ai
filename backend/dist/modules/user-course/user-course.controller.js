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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseController = void 0;
const common_1 = require("@nestjs/common");
const user_course_service_1 = require("./user-course.service");
const get_user_1 = require("../../database/strategies/get-user");
const user_entity_1 = require("../user/entities/user.entity");
const passport_1 = require("@nestjs/passport");
const user_course_dtos_1 = require("./user-course.dtos");
let UserCourseController = class UserCourseController {
    constructor(userCourseService) {
        this.userCourseService = userCourseService;
    }
    async getLeaderBoard(limit, res) {
        const response = await this.userCourseService.getLeaderBoard({ limit });
        return res.status(200).json(response);
    }
    async getUserProgress(id, user, res) {
        const response = await this.userCourseService.getUserProgress({
            userId: user.id,
            courseId: id,
        });
        return res.status(200).json(response);
    }
    async getUserXp(user, res) {
        const response = await this.userCourseService.getUserTotalXp({
            userId: user.id,
        });
        return res.status(200).json(response);
    }
    async updateProgress(updateProgress, user, res) {
        const response = await this.userCourseService.updateProgress({
            updateProgress: updateProgress,
            userId: user.id,
        });
        return res.status(200).json(response);
    }
    async updateTestProgress(updateTestProgressDto, user, res) {
        const response = await this.userCourseService.updateTestProgress({
            userId: user.id,
            updateTestProgress: updateTestProgressDto,
        });
        return res.status(200).json(response);
    }
    async updateHearts(res, updateHearts, user) {
        const response = await this.userCourseService.updateHearts({
            hearts: updateHearts.hearts,
            userId: user.id,
        });
        return res.status(200).json(response);
    }
};
exports.UserCourseController = UserCourseController;
__decorate([
    (0, common_1.Get)('/leaderboard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "getLeaderBoard", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "getUserProgress", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, get_user_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "getUserXp", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_course_dtos_1.UpdateProgressDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Post)('/test'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_course_dtos_1.UpdateTestProgressDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "updateTestProgress", null);
__decorate([
    (0, common_1.Post)('/hearts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserCourseController.prototype, "updateHearts", null);
exports.UserCourseController = UserCourseController = __decorate([
    (0, common_1.Controller)('user-progress'),
    __metadata("design:paramtypes", [user_course_service_1.UserCourseService])
], UserCourseController);
//# sourceMappingURL=user-course.controller.js.map
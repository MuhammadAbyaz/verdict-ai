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
exports.UserCourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_course_entity_1 = require("./entities/user-course.entity");
const typeorm_2 = require("typeorm");
const module_entity_1 = require("../module/entities/module.entity");
const test_progress_1 = require("../../constants/test-progress");
const user_entity_1 = require("../user/entities/user.entity");
let UserCourseService = class UserCourseService {
    constructor(userCourseRepository, moduleRepository, userRepository) {
        this.userCourseRepository = userCourseRepository;
        this.moduleRepository = moduleRepository;
        this.userRepository = userRepository;
    }
    async getUserProgress({ userId, courseId, }) {
        let userCourse = await this.userCourseRepository.findOne({
            where: { userId, courseId },
        });
        if (!userCourse) {
            userCourse = this.userCourseRepository.create({ userId, courseId });
            await this.userCourseRepository.save(userCourse);
        }
        return { userProgress: { ...userCourse } };
    }
    async getUserTotalXp({ userId }) {
        const userCourses = await this.userCourseRepository.find({
            where: { userId },
            relations: ['course'],
        });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!userCourses || !user)
            throw new common_1.NotFoundException();
        let totalXp = 0;
        for (const userCourse of userCourses) {
            const modules = await this.moduleRepository.find({
                where: { course: { id: userCourse.courseId } },
                order: { order: 'ASC' },
            });
            for (let i = 0; i < modules.length && i < userCourse.moduleProgress; i++) {
                totalXp += modules[i].xp;
            }
        }
        return { totalXp, hearts: user.hearts };
    }
    async updateProgress({ updateProgress, userId, }) {
        const userCourse = await this.userCourseRepository.findOne({
            where: { userId, courseId: updateProgress.courseId },
        });
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!userCourse || !user)
            throw new common_1.NotFoundException();
        if (updateProgress.moduleOrder <= userCourse.moduleProgress) {
            return {
                userCourse,
            };
        }
        userCourse.moduleProgress = updateProgress.moduleOrder;
        user.hearts = updateProgress.hearts;
        await this.userCourseRepository.save(userCourse);
        await this.userRepository.save(user);
        return {
            userCourse,
        };
    }
    async updateTestProgress({ userId, updateTestProgress, }) {
        const userCourse = await this.userCourseRepository.findOne({
            where: { userId, courseId: updateTestProgress.courseId },
        });
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!userCourse || !user)
            throw new common_1.NotFoundException();
        userCourse.testProgress = test_progress_1.TEST_PROGRESS.PASS;
        userCourse.moduleProgress += 1;
        user.hearts = updateTestProgress.hearts;
        await this.userCourseRepository.save(userCourse);
        await this.userRepository.save(user);
        return {
            userCourse,
        };
    }
    async getLeaderBoard({ limit }) {
        const response = await this.userRepository.find();
        const finalLeaderBoard = [];
        for (const user of response) {
            const userXp = await this.getUserTotalXp({ userId: user.id });
            finalLeaderBoard.push({
                xp: userXp.totalXp,
                username: `${user.firstName} ${user.lastName}`,
            });
        }
        finalLeaderBoard.sort((a, b) => b.xp - a.xp);
        return {
            leaderboard: finalLeaderBoard.slice(0, limit),
        };
    }
    async updateHearts({ hearts, userId }) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException();
        user.hearts = hearts;
        await this.userRepository.save(user);
        return {
            user,
        };
    }
};
exports.UserCourseService = UserCourseService;
exports.UserCourseService = UserCourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_course_entity_1.UserCourse)),
    __param(1, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserCourseService);
//# sourceMappingURL=user-course.service.js.map
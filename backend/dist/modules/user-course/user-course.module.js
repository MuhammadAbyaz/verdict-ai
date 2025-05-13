"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseModule = void 0;
const common_1 = require("@nestjs/common");
const user_course_service_1 = require("./user-course.service");
const user_course_controller_1 = require("./user-course.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_course_entity_1 = require("./entities/user-course.entity");
const config_1 = require("@nestjs/config");
const module_entity_1 = require("../module/entities/module.entity");
const user_entity_1 = require("../user/entities/user.entity");
let UserCourseModule = class UserCourseModule {
};
exports.UserCourseModule = UserCourseModule;
exports.UserCourseModule = UserCourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_course_entity_1.UserCourse, module_entity_1.Module, user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                }),
            }),
        ],
        controllers: [user_course_controller_1.UserCourseController],
        providers: [user_course_service_1.UserCourseService],
    })
], UserCourseModule);
//# sourceMappingURL=user-course.module.js.map
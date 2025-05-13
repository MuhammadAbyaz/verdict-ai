"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("../../database/config");
const auth_module_1 = require("../auth/auth.module");
const course_module_1 = require("../course/course.module");
const module_module_1 = require("../module/module.module");
const lesson_module_1 = require("../lesson/lesson.module");
const quiz_module_1 = require("../quiz/quiz.module");
const question_module_1 = require("../question/question.module");
const option_module_1 = require("../option/option.module");
const user_course_module_1 = require("../user-course/user-course.module");
const test_module_1 = require("../test/test.module");
const user_module_1 = require("../user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot(config_2.dataSourceOptions),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            course_module_1.CourseModule,
            module_module_1.ModuleModule,
            lesson_module_1.LessonModule,
            quiz_module_1.QuizModule,
            question_module_1.QuestionModule,
            option_module_1.OptionModule,
            user_course_module_1.UserCourseModule,
            test_module_1.TestModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
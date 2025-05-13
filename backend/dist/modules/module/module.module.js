"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModule = void 0;
const common_1 = require("@nestjs/common");
const module_service_1 = require("./module.service");
const module_controller_1 = require("./module.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const course_module_1 = require("../course/course.module");
const typeorm_1 = require("@nestjs/typeorm");
const module_entity_1 = require("./entities/module.entity");
const test_entity_1 = require("../test/entities/test.entity");
let ModuleModule = class ModuleModule {
};
exports.ModuleModule = ModuleModule;
exports.ModuleModule = ModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([module_entity_1.Module, test_entity_1.Test]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                }),
            }),
            course_module_1.CourseModule,
        ],
        controllers: [module_controller_1.ModuleController],
        providers: [module_service_1.ModuleService],
    })
], ModuleModule);
//# sourceMappingURL=module.module.js.map
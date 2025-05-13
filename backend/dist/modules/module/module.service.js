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
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const module_entity_1 = require("./entities/module.entity");
const typeorm_2 = require("typeorm");
const test_entity_1 = require("../test/entities/test.entity");
let ModuleService = class ModuleService {
    constructor(moduleRepository, testRepository) {
        this.moduleRepository = moduleRepository;
        this.testRepository = testRepository;
    }
    async create(createModuleDto) {
        const { title, description, order, xp, courseId } = createModuleDto;
        const newModule = this.moduleRepository.create({
            title,
            description,
            order,
            xp,
            course: { id: courseId },
        });
        await this.moduleRepository.save(newModule);
        return {
            module: newModule,
        };
    }
    async getAll() {
        const response = await this.moduleRepository.find();
        return {
            modules: response,
            meta: {
                total: response.length,
            },
        };
    }
    async findOne(id) {
        let response;
        response = await this.moduleRepository
            .createQueryBuilder('module')
            .leftJoin('module.course', 'course')
            .leftJoinAndSelect('module.lessons', 'lessons')
            .leftJoinAndSelect('module.quizes', 'quizes')
            .leftJoinAndSelect('quizes.questions', 'questions')
            .leftJoinAndSelect('questions.options', 'options')
            .leftJoinAndSelect('questions.correctOption', 'correctOption')
            .addSelect(['course.id'])
            .where('module.id = :id', { id })
            .getOne();
        if (!response) {
            response = await this.testRepository.findOne({
                where: { id },
                relations: {
                    course: true,
                    questions: {
                        options: true,
                        correctOption: true,
                    },
                },
            });
            if (!response)
                return new common_1.NotFoundException();
            return {
                quizes: [{ questions: response?.questions ?? [] }],
                course: {
                    id: response.course.id,
                },
            };
        }
        return { ...response };
    }
    remove(id) {
        return `This action removes a #${id} module`;
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __param(1, (0, typeorm_1.InjectRepository)(test_entity_1.Test)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ModuleService);
//# sourceMappingURL=module.service.js.map
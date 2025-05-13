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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("./entities/course.entity");
const typeorm_2 = require("typeorm");
const storage_constanst_1 = require("../storage/storage.constanst");
let CourseService = class CourseService {
    constructor(courseRepository, storageService, dataSource) {
        this.courseRepository = courseRepository;
        this.storageService = storageService;
        this.dataSource = dataSource;
        this.PREFIX = 'courses';
    }
    async getAll() {
        const response = await this.courseRepository.find();
        return {
            courses: response,
            meta: {
                total: response.length,
            },
        };
    }
    async findOne(id) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: {
                modules: true,
            },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with id ${id} not found`);
        }
        return course;
    }
    async create(courseDto, thumbnail) {
        const { title, description, level } = courseDto;
        return await this.dataSource.transaction(async (manager) => {
            const newCourse = manager.create(course_entity_1.Course, {
                title,
                level,
                description,
            });
            await manager.save(newCourse);
            const thumbnailUrl = await this.storageService.uploadFile(thumbnail, this.PREFIX, newCourse.id);
            newCourse.thumbnail = thumbnailUrl;
            await manager.save(newCourse);
            delete newCourse.id;
            return {
                course: { ...newCourse },
            };
        });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, common_1.Inject)(storage_constanst_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, typeorm_2.DataSource])
], CourseService);
//# sourceMappingURL=course.service.js.map
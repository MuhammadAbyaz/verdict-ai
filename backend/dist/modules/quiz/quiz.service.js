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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const typeorm_2 = require("typeorm");
let QuizService = class QuizService {
    constructor(quizRepository) {
        this.quizRepository = quizRepository;
    }
    async create(createQuizDto) {
        const { moduleId, questionIds, order, title } = createQuizDto;
        const newQuiz = this.quizRepository.create({
            module: { id: moduleId },
            questions: questionIds.map((id) => ({ id })),
            order,
            title,
        });
        await this.quizRepository.save(newQuiz);
        return {
            quiz: newQuiz,
        };
    }
    async getAll() {
        const response = await this.quizRepository.find();
        return {
            quizes: response,
            meta: {
                total: response.length,
            },
        };
    }
    findOne(id) {
        return `This action returns a #${id} quiz`;
    }
    remove(id) {
        return `This action removes a #${id} quiz`;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuizService);
//# sourceMappingURL=quiz.service.js.map
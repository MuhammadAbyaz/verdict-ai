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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./entities/question.entity");
const typeorm_2 = require("typeorm");
let QuestionService = class QuestionService {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    async create(createQuestionDto) {
        const { correctOption, optionIds, order, question, quizId, testId } = createQuestionDto;
        const newQuestion = this.questionRepository.create({
            correctOption: { id: correctOption },
            order,
            question,
            quiz: { id: quizId },
            test: { id: testId },
            options: optionIds.map((id) => ({ id })),
        });
        const response = await this.questionRepository.save(newQuestion);
        return {
            question: response,
        };
    }
    async getAll() {
        const response = await this.questionRepository.find();
        return {
            questions: response,
            meta: {
                total: response.length,
            },
        };
    }
    findOne(id) {
        return `This action returns a #${id} question`;
    }
    update(id, updateQuestionDto) {
        return `This action updates a #${id} question`;
    }
    remove(id) {
        return `This action removes a #${id} question`;
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionService);
//# sourceMappingURL=question.service.js.map
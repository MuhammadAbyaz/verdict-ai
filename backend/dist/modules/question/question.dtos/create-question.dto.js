"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const question_dto_1 = require("./question.dto");
class CreateQuestionDto extends (0, swagger_1.PickType)(question_dto_1.QuestionDto, [
    'correctOption',
    'optionIds',
    'order',
    'question',
    'quizId',
    'testId',
]) {
}
exports.CreateQuestionDto = CreateQuestionDto;
//# sourceMappingURL=create-question.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuizDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const quiz_dto_1 = require("./quiz.dto");
class CreateQuizDto extends (0, swagger_1.PickType)(quiz_dto_1.QuizDto, [
    'moduleId',
    'title',
    'order',
    'questionIds',
]) {
}
exports.CreateQuizDto = CreateQuizDto;
//# sourceMappingURL=create-quiz.dto.js.map
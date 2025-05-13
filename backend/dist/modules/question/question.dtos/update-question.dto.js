"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_question_dto_1 = require("./create-question.dto");
class UpdateQuestionDto extends (0, swagger_1.PartialType)(create_question_dto_1.CreateQuestionDto) {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
//# sourceMappingURL=update-question.dto.js.map
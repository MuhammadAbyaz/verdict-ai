"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const option_dto_1 = require("./option.dto");
class CreateOptionDto extends (0, swagger_1.PickType)(option_dto_1.OptionDto, [
    'questionId',
    'text',
]) {
}
exports.CreateOptionDto = CreateOptionDto;
//# sourceMappingURL=create-option.dto.js.map
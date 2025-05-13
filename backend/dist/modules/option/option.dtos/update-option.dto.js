"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_option_dto_1 = require("./create-option.dto");
class UpdateOptionDto extends (0, swagger_1.PartialType)(create_option_dto_1.CreateOptionDto) {
}
exports.UpdateOptionDto = UpdateOptionDto;
//# sourceMappingURL=update-option.dto.js.map
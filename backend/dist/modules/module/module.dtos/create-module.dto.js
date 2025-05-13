"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const module_dto_1 = require("./module.dto");
class CreateModuleDto extends (0, swagger_1.PickType)(module_dto_1.ModuleDto, [
    'title',
    'description',
    'order',
    'xp',
    'courseId',
]) {
}
exports.CreateModuleDto = CreateModuleDto;
//# sourceMappingURL=create-module.dto.js.map
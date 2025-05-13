"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLessonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const lesson_dto_1 = require("./lesson.dto");
class CreateLessonDto extends (0, swagger_1.PickType)(lesson_dto_1.LessonDto, [
    'title',
    'content',
    'moduleId',
    'order',
    'videoUrl',
]) {
}
exports.CreateLessonDto = CreateLessonDto;
//# sourceMappingURL=create-lesson.dto.js.map
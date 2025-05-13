"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_dto_1 = require("./course.dto");
class CreateCourseDto extends (0, swagger_1.PickType)(course_dto_1.CourseDto, [
    'title',
    'description',
    'level',
]) {
}
exports.CreateCourseDto = CreateCourseDto;
//# sourceMappingURL=create-course.dto.js.map
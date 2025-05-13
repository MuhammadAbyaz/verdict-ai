"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_dto_1 = require("./course.dto");
class UpdateCourseDto extends (0, swagger_1.PickType)(course_dto_1.CourseDto, [
    'title',
    'description',
    'level',
]) {
}
exports.UpdateCourseDto = UpdateCourseDto;
//# sourceMappingURL=update-course.dto.js.map
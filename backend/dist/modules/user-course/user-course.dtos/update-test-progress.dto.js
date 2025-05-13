"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestProgressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_course_dto_1 = require("./user-course.dto");
class UpdateTestProgressDto extends (0, swagger_1.PickType)(user_course_dto_1.UserCourseDto, [
    'courseId',
]) {
}
exports.UpdateTestProgressDto = UpdateTestProgressDto;
//# sourceMappingURL=update-test-progress.dto.js.map
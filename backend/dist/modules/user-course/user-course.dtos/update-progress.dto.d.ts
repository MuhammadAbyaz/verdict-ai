import { UserCourseDto } from './user-course.dto';
declare const UpdateProgressDto_base: import("@nestjs/common").Type<Pick<UserCourseDto, "courseId" | "moduleOrder">>;
export declare class UpdateProgressDto extends UpdateProgressDto_base {
    hearts: number;
}
export {};

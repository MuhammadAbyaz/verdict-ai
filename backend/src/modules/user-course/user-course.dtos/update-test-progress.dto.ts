import { PickType } from '@nestjs/swagger';
import { UserCourseDto } from './user-course.dto';

export class UpdateTestProgressDto extends PickType(UserCourseDto, [
  'courseId',
]) {}

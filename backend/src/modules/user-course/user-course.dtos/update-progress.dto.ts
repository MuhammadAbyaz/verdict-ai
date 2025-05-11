import { PickType } from '@nestjs/swagger';
import { UserCourseDto } from './user-course.dto';

export class UpdateProgressDto extends PickType(UserCourseDto, [
  'courseId',
  'moduleOrder',
]) {}

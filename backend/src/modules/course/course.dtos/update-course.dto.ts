import { PickType } from '@nestjs/swagger';
import { CourseDto } from './course.dto';

export class UpdateCourseDto extends PickType(CourseDto, [
  'title',
  'description',
  'level',
]) {}

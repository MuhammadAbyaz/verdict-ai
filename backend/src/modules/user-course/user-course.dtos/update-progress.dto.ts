import { PickType } from '@nestjs/swagger';
import { UserCourseDto } from './user-course.dto';
import { IsNumber } from 'class-validator';

export class UpdateProgressDto extends PickType(UserCourseDto, [
  'courseId',
  'moduleOrder',
]) {
  @IsNumber()
  hearts: number;
}

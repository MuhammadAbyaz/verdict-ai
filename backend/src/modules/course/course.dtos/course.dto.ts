import { IsNotEmpty, IsEnum } from 'class-validator';
import { COURSE_LEVEL } from 'src/constants/course-levels';

export class CourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(COURSE_LEVEL)
  level: COURSE_LEVEL;
}

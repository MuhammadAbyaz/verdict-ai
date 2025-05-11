import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserCourseDto {
  @IsNotEmpty()
  courseId: string;
  @IsNumber()
  moduleOrder: number;
}

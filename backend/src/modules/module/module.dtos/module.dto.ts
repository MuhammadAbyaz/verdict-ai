import { IsNotEmpty, IsNumber } from 'class-validator';

export class ModuleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsNumber()
  xp: number;

  @IsNotEmpty()
  courseId: string;
}

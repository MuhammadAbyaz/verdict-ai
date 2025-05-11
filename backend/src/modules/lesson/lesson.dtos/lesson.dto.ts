import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LessonDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string | null;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsOptional()
  videoUrl: string | null;

  @IsNotEmpty()
  moduleId: string;
}

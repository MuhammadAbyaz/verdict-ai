import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuizDto {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  order: number;

  @IsNotEmpty()
  moduleId: string;

  questionIds: string[];
}

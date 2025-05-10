import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuizDto {
  @IsNumber()
  order: number;

  @IsNotEmpty()
  moduleId: string;

  questionIds: string[];
}

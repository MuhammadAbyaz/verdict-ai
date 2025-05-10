import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNumber()
  order: number;

  @IsNotEmpty()
  quizId: string;

  @IsNotEmpty()
  testId: string;

  @IsNotEmpty()
  correctOption: string;

  optionIds: string[];
}

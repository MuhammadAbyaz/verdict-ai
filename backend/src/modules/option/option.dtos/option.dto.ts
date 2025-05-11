import { IsNotEmpty } from 'class-validator';

export class OptionDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  questionId: string;
}

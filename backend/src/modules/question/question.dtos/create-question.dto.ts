import { PickType } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class CreateQuestionDto extends PickType(QuestionDto, [
  'correctOption',
  'optionIds',
  'order',
  'question',
  'quizId',
  'testId',
]) {}

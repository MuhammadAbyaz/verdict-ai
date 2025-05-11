import { PickType } from '@nestjs/swagger';
import { QuizDto } from './quiz.dto';

export class CreateQuizDto extends PickType(QuizDto, [
  'moduleId',
  'title',
  'order',
  'questionIds',
]) {}

import { PickType } from '@nestjs/swagger';
import { LessonDto } from './lesson.dto';

export class CreateLessonDto extends PickType(LessonDto, [
  'title',
  'content',
  'moduleId',
  'order',
  'videoUrl',
]) {}

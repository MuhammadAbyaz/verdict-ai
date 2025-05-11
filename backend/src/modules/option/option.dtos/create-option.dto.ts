import { PickType } from '@nestjs/swagger';
import { OptionDto } from './option.dto';

export class CreateOptionDto extends PickType(OptionDto, [
  'questionId',
  'text',
]) {}

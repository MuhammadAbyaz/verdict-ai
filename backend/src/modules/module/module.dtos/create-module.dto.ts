import { PickType } from '@nestjs/swagger';
import { ModuleDto } from './module.dto';

export class CreateModuleDto extends PickType(ModuleDto, [
  'title',
  'description',
  'order',
  'xp',
  'courseId',
]) {}

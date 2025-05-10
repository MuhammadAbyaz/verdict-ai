import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './lesson.dtos/create-lesson.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto, @Res() res: Response) {
    const response = await this.lessonService.create(createLessonDto);
    return res.status(201).json(response);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res: Response) {
    const response = await this.lessonService.getAll();
    return res.status(200).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
  //   return this.lessonService.update(+id, updateLessonDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}

import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TestService } from './test.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  // @Post()
  // async create(@Body() createLessonDto: CreateLessonDto, @Res() res: Response) {
  //   const response = await this.lessonService.create(createLessonDto);
  //   return res.status(201).json(response);
  // }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async findAll(@Res() res: Response) {
  //   const response = await this.lessonService.getAll();
  //   return res.status(200).json(response);
  // }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response = await this.testService.findOne({ id });
    return res.status(200).json(response);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
  //   return this.lessonService.update(+id, updateLessonDto);
  // }

  // @Delete(':id') remove(@Param('id') id: string) {
  //   return this.testService.remove(+id);
  // }
}

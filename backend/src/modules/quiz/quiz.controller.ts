import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './quiz.dtos/create-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('quizes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto, @Res() res: Response) {
    const response = await this.quizService.create(createQuizDto);
    return res.status(201).json(response);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Res() res: Response) {
    const response = await this.quizService.getAll();
    return res.status(200).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
  //   return this.quizService.update(+id, updateQuizDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}

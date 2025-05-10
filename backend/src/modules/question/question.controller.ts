import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './question.dtos/create-question.dto';
import { UpdateQuestionDto } from './question.dtos/update-question.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/')
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
  ) {
    const response = await this.questionService.create(createQuestionDto);
    return res.status(201).json(response);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res: Response) {
    const response = await this.questionService.getAll();
    return res.status(200).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}

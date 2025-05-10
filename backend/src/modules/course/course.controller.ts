import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCourseDto } from './course.dtos';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  public async getAll(@Res({ passthrough: true }) res: Response) {
    const response = await this.courseService.getAll();
    return res.status(200).json(response);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('thumbnail'))
  public async create(
    @Res() res: Response,
    @Body() courseDto: CreateCourseDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    const response = await this.courseService.create(courseDto, thumbnail);
    return res.status(201).json(response);
  }
}

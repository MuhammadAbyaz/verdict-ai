import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { GetUser } from 'src/database/strategies/get-user';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProgressDto, UpdateTestProgressDto } from './user-course.dtos';

@Controller('user-progress')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Get('/leaderboard')
  @UseGuards(AuthGuard('jwt'))
  async getLeaderBoard(@Query('limit') limit: number, @Res() res: Response) {
    const response = await this.userCourseService.getLeaderBoard({ limit });
    return res.status(200).json(response);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserProgress(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const response = await this.userCourseService.getUserProgress({
      userId: user.id,
      courseId: id,
    });
    return res.status(200).json(response);
  }
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getUserXp(@GetUser() user: User, @Res() res: Response) {
    const response = await this.userCourseService.getUserTotalXp({
      userId: user.id,
    });
    return res.status(200).json(response);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async updateProgress(
    @Body() updateProgress: UpdateProgressDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const response = await this.userCourseService.updateProgress({
      updateProgress: updateProgress,
      userId: user.id,
    });
    return res.status(200).json(response);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async updateTestProgress(
    @Body()
    updateTestProgressDto: UpdateTestProgressDto,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const response = await this.userCourseService.updateTestProgress({
      userId: user.id,
      updateTestProgress: updateTestProgressDto,
    });

    return res.status(200).json(response);
  }

  @Post('/hearts')
  @UseGuards(AuthGuard('jwt'))
  async updateHearts(
    @Res() res: Response,
    @Body() updateHearts: { hearts: number },
    @GetUser() user: User,
  ) {
    const response = await this.userCourseService.updateHearts({
      hearts: updateHearts.hearts,
      userId: user.id,
    });
    return res.status(200).json(response);
  }
}

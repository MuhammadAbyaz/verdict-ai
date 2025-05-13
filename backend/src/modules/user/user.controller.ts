import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/database/strategies/get-user';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/profile-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('profileImage'))
  async updateProfileImage(
    @Res() res: Response,
    @GetUser() user: User,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    const response = await this.userService.updateProfilePicture({
      userId: user.id,
      profileImage,
    });
    res.status(200).json(response);
  }
}

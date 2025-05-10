import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './auth.dtos/login.dto';
import { RegisterDto } from './auth.dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const response = await this.authService.login(loginDto);
    return res.status(200).json(response);
  }

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const user = await this.authService.register(registerDto);
    return res.status(201).json({ user });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('protected')
  public protectedRoute() {
    return { message: 'This is a protected route' };
  }
}

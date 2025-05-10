import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Payload } from './types';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './auth.dtos/register.dto';
import { LoginDto } from './auth.dtos/login.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.SALT_ROUNDS = 10;
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, this.SALT_ROUNDS);

    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const payload: Payload = { id: newUser.id, email: newUser.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      message: `User registered successfully`,
      accessToken: token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) throw new BadRequestException('Invalid credentials');

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { token };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}

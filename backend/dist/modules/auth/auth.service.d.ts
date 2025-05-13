import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './auth.dtos/register.dto';
import { LoginDto } from './auth.dtos/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly SALT_ROUNDS;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        token: string;
        email: string;
        username: string;
        image: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        email: string;
        username: string;
        image: string;
    }>;
    validateUser(id: string): Promise<User>;
}

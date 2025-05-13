import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dtos/login.dto';
import { RegisterDto } from './auth.dtos/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<Response>;
    register(registerDto: RegisterDto, res: Response): Promise<Response>;
    protectedRoute(): {
        message: string;
    };
}

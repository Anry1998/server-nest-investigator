import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registrationDto: RegisterDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(registrationDto: RegisterDto, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(request: Request, response: Response): Promise<string>;
    refresh(request: Request, response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    testauthGuard(): Promise<string>;
}

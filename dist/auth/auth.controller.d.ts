import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/register.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registrationDto: RegistrationDto, response: Response): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto, response: Response): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        accessToken: string;
        refreshToken: string;
    }>;
    logout(request: Request, response: Response): Promise<string>;
    refresh(request: Request, response: Response): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        accessToken: string;
        refreshToken: string;
    }>;
    testauthGuard(): Promise<string>;
}

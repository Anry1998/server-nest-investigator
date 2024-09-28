import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { CreateEmployeeDto } from 'src/create-employee/dto/create-employee.dto';
import { TokenService } from './token.service';
export interface JWTTokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private crudEmployeeService;
    private tokenService;
    constructor(crudEmployeeService: CrudEmployeeService, tokenService: TokenService);
    private abbreviatedPostList;
    private hashPassword;
    private comparePassword;
    registration(userDto: CreateEmployeeDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(userDto: CreateEmployeeDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

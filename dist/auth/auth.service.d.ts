import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { TokenService } from './token.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/register.dto';
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
    registration(userDto: RegistrationDto): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        chats: import("src/create-employee/entity/employee.model").Employee[];
        messagers: import("../chats/entity/message.model").Messagers[];
        accessToken: string;
        refreshToken: string;
    }>;
    login(userDto: LoginDto): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        chats: import("src/create-employee/entity/employee.model").Employee[];
        messagers: import("../chats/entity/message.model").Messagers[];
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<{
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("./entity/token.model").Token[];
        createTime: Date;
        post: import("../position-employee/entity/position-employee.model").PositionEmployee[];
        incidents: import("../incident/entity/incident.model").Incident[];
        chats: import("src/create-employee/entity/employee.model").Employee[];
        messagers: import("../chats/entity/message.model").Messagers[];
        accessToken: string;
        refreshToken: string;
    }>;
    getEmployeeId(refreshToken: string): Promise<void>;
}

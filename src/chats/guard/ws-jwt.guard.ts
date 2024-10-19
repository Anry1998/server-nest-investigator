import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { TokenService } from 'src/auth/token.service';
import { Employee } from 'src/create-employee/entity/employee.model';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private tokenService: TokenService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const socket: Socket = context.switchToWs().getClient<Socket>();
            const authHeader = socket.handshake.auth?.accessToken;
            const token = authHeader.split(' ')[1]
            const employee: Employee = await this.tokenService.validateAccessToken(token);
            // console.log("ws-jwt-guard: ", context.switchToWs().getClient())
            context.switchToWs().getClient().employee = employee
            console.log("ws-jwt-guard: ", context.switchToWs().getClient().employee)
            return Boolean(employee);
        } catch (err) {
            throw new WsException(err.message);
        }
    }
}
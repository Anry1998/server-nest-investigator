import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/auth/token.service';
export declare class WsJwtGuard implements CanActivate {
    private tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
type JwtPayload = {
    sub: string;
    role: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private configService;
    isPublic: boolean;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};

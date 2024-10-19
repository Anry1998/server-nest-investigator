import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Token } from './entity/token.model';
import { GenerateTokensDto } from './dto/generate-tokens.dto';
export declare class TokenService {
    private tokenRepository;
    private jwtService;
    private configService;
    constructor(tokenRepository: Repository<Token>, jwtService: JwtService, configService: ConfigService);
    generateTokens(payload: GenerateTokensDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    saveTokenAfterRefresh(tokenid: number, refreshToken: string): Promise<void>;
    saveRefreshToken(employeeId: number, refreshToken: string): Promise<void>;
    validateAccessToken(token: string): any;
    validateRefreshToken(token: string): any;
    removeRefreshToken(refreshToken: string): Promise<import("typeorm").DeleteResult>;
    findRefreshToken(refreshToken: string): Promise<Token>;
}

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';





import { ConfigService } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



import { Token } from './entity/token.model';


import { GenerateTokensDto } from './dto/generate-tokens.dto';



@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async generateTokens(payload: GenerateTokensDto) {
        // const payload = {email: user.email, id: user.id, roles: number[]}
        const accessToken = await this.jwtService.signAsync({payload}, 
            {
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'), 
                expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
            }
        )

        const refreshToken = await this.jwtService.signAsync({payload}, 
            {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'), 
                expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
            }
        )

        return {accessToken, refreshToken} 
    }

    async saveTokenAfterRefresh(tokenid: number, refreshToken: string) {
        this.tokenRepository.update({id: tokenid }, { refreshToken: refreshToken });
    }

    async saveRefreshToken(employeeId: number, refreshToken: string) {
        const arrTokens = await this.tokenRepository.find({where: {employeeId: employeeId}})
        if (arrTokens.length >= 5) {
            const firstArrTokensId = arrTokens[0].id
            await this.tokenRepository.delete({id: firstArrTokensId})
        }
        await this.tokenRepository.save({ refreshToken: refreshToken, employeeId: employeeId})
    }

    validateAccessToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')})
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')})
            return userData
        } catch(e) {
            return null
        }
    }

    async removeRefreshToken(refreshToken: string) {
        const deleteToken = await this.tokenRepository.delete({refreshToken: refreshToken})
        return deleteToken 
    }

    async findRefreshToken(refreshToken: string) {
        const token = await this.tokenRepository.findOne({where:{refreshToken: refreshToken}})
        // console.log('token: ',token)
        return token 
    }
}
 
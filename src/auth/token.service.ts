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

    async saveRefreshTokenAfterRegistration(employeeId: number, refreshToken: string) {
        const token = await this.findRefreshToken(refreshToken);
        this.tokenRepository.update({ employeeId: employeeId }, { refreshToken });
        return token
    }

    async saveRefreshTokenAfterLogin(employeeId: number, refreshToken: string) {
        // Ищем в БД пользователя с указанным id 
        // Так как в БД будет храниться до 5 refreshToken одного юзера, нам необходимо чтобы и id и refreshToken совпадали
        const tokenData = await this.tokenRepository.findOne({
            where: [
                {employeeId: employeeId, refreshToken: refreshToken},
            ]
        })
        // если пользователь существует перезаписываем рефреш токен и сохранеем refreshToken в БД токенов - save()
        if (tokenData) {
            this.tokenRepository.update({employeeId: employeeId }, { refreshToken });
            return 'Рефреш токен был перезаписан'
        }
        // Реализация функции которая ищет весь перечень токенов и если их больше пяти, удалеет первый
        const arrTokens = await this.tokenRepository.find({where: {employeeId: employeeId}})
        if (arrTokens.length == 5) {
            const firstArrTokensId = arrTokens[0].id
            const deleteFirstToken = await this.tokenRepository.delete({id: firstArrTokensId})
        }

        // Если пользователь с указанным токеном не найден создаем в БД токенов новые данные пользователя, куда передаем id и  рефреш токен
        const token = await this.tokenRepository.save({userId: employeeId, refreshToken})
        return token
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
        console.log('token: ',token)
        return token 
    }
}
 
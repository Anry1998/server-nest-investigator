"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_model_1 = require("./entity/token.model");
let TokenService = class TokenService {
    constructor(tokenRepository, jwtService, configService) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateTokens(payload) {
        const accessToken = await this.jwtService.signAsync({ payload }, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
        });
        const refreshToken = await this.jwtService.signAsync({ payload }, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
        });
        return { accessToken, refreshToken };
    }
    async saveTokenAfterRefresh(tokenid, refreshToken) {
        this.tokenRepository.update({ id: tokenid }, { refreshToken: refreshToken });
    }
    async saveRefreshToken(employeeId, refreshToken) {
        const arrTokens = await this.tokenRepository.find({ where: { employeeId: employeeId } });
        if (arrTokens.length >= 5) {
            const firstArrTokensId = arrTokens[0].id;
            await this.tokenRepository.delete({ id: firstArrTokensId });
        }
        await this.tokenRepository.save({ refreshToken: refreshToken, employeeId: employeeId });
    }
    validateAccessToken(token) {
        try {
            const userData = this.jwtService.verify(token, { secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET') });
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = this.jwtService.verify(token, { secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET') });
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async removeRefreshToken(refreshToken) {
        const deleteToken = await this.tokenRepository.delete({ refreshToken: refreshToken });
        return deleteToken;
    }
    async findRefreshToken(refreshToken) {
        const token = await this.tokenRepository.findOne({ where: { refreshToken: refreshToken } });
        return token;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_model_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map
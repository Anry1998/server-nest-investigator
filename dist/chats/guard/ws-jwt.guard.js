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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const token_service_1 = require("../../auth/token.service");
let WsJwtGuard = class WsJwtGuard {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        try {
            const socket = context.switchToWs().getClient();
            const authHeader = socket.handshake.auth?.accessToken;
            const token = authHeader.split(' ')[1];
            const employee = await this.tokenService.validateAccessToken(token);
            context.switchToWs().getClient().employee = employee;
            console.log("ws-jwt-guard: ", context.switchToWs().getClient().employee);
            return Boolean(employee);
        }
        catch (err) {
            throw new websockets_1.WsException(err.message);
        }
    }
};
exports.WsJwtGuard = WsJwtGuard;
exports.WsJwtGuard = WsJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], WsJwtGuard);
//# sourceMappingURL=ws-jwt.guard.js.map
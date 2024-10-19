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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const socket_id_model_1 = require("./entity/socket-id.model");
let SocketService = class SocketService {
    constructor(socketRepository, dataSource) {
        this.socketRepository = socketRepository;
        this.dataSource = dataSource;
    }
    async saveSocketId(employeeId, socketId) {
        await this.socketRepository.save({ socketId: socketId, employeeId: employeeId });
    }
    async removeSocketId(socketId) {
        console.log('socketId: ', socketId);
        if (socketId !== undefined) {
            return await this.socketRepository.delete({ socketId: socketId });
        }
    }
    async getSocketIdByEmployeeId(employeeId) {
        return await this.socketRepository.find({ where: { employeeId: employeeId } });
    }
    async getSocketIdListByEmployeeIdList(employeeIdList) {
        const socketIdList = await this.dataSource
            .query(`SELECT "socketId" FROM socket WHERE "employeeId" IN (${employeeIdList})`);
        return socketIdList;
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(socket_id_model_1.SocketId)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], SocketService);
//# sourceMappingURL=socket.service.js.map
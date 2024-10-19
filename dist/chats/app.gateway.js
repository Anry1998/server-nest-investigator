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
exports.MyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const message_service_1 = require("./message.service");
const update_message_dto_1 = require("./dto/update-message.dto");
const delete_message_dto_1 = require("./dto/delete-message.dto");
const socket_service_1 = require("./socket.service");
const token_service_1 = require("../auth/token.service");
const crud_employee_service_1 = require("../create-employee/crud-employee.service");
let employeeSocketsList = [];
let MyGateway = class MyGateway {
    constructor(messagersService, socketService, tokenService, employeeService, сhatService) {
        this.messagersService = messagersService;
        this.socketService = socketService;
        this.tokenService = tokenService;
        this.employeeService = employeeService;
        this.сhatService = сhatService;
    }
    afterInit(server) {
        server.use(async (socket, next) => {
            const authHeader = socket.handshake.auth?.accessToken;
            console.log('authHeader', authHeader);
            if (authHeader) {
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];
                const bearerToken = bearer === 'Bearer' ? token : undefined;
                const validateToken = await this.tokenService.validateAccessToken(token);
                if (bearerToken && validateToken) {
                    const employee = await this.employeeService.getEmployeeByEmail(validateToken.payload.email);
                    if (!employee) {
                        next(new Error("Ошибка авторизации!"));
                    }
                    socket.data.employee = employee;
                    next();
                }
                else {
                    next(new Error("Ошибка авторизации!"));
                }
            }
        });
    }
    async handleConnection(client) {
        console.log('handleConnection: ', client.id);
        await this.socketService.saveSocketId(client.data.employee.id, client.id);
    }
    async handleDisconnect(client) {
        await this.socketService.removeSocketId(client.id);
    }
    async employeeLogout(client) {
        await this.socketService.removeSocketId(client.id);
        this.server.to(`${client.id}`).disconnectSockets();
    }
    async handleSendMessage(payload) {
        const employesArr = await this.сhatService.getAllEmployesInChat(payload.chatId);
        const socketIdList = await this.socketService.getSocketIdListByEmployeeIdList(employesArr.join());
        if (socketIdList) {
            await this.messagersService.createMessage(payload);
            socketIdList.forEach((it, ind) => {
                this.server.to(socketIdList[ind].socketId).emit('client-message:send', payload);
            });
        }
    }
    async updateMessage(payload, client) {
        const employeeId = client.data.employee.id;
        await this.messagersService.updateMessage(payload, employeeId);
        const chatId = await this.messagersService.getChatIdByMessageId(payload.messageId);
        const employesArr = await this.сhatService.getAllEmployesInChat(chatId);
        const socketIdList = await this.socketService.getSocketIdListByEmployeeIdList(employesArr.join());
        if (socketIdList) {
            await this.messagersService.createMessage(payload);
            socketIdList.forEach((item, ind) => {
                this.server.to(socketIdList[ind].socketId).emit('client-message:update', payload);
            });
        }
    }
    async deleteMessage(payload, client) {
        const employeeId = client.data.employee.id;
        this.messagersService.deleteMessage(payload, employeeId);
        const chatId = await this.messagersService.getChatIdByMessageId(payload.messageId);
        const employesArr = await this.сhatService.getAllEmployesInChat(chatId);
        const socketIdList = await this.socketService.getSocketIdListByEmployeeIdList(employesArr.join());
        if (socketIdList) {
            await this.messagersService.createMessage(payload);
            socketIdList.forEach((item, ind) => {
                this.server.to(socketIdList[ind].socketId).emit('client-message:delete', payload);
            });
        }
    }
};
exports.MyGateway = MyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('employee-logout'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "employeeLogout", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('server-message:send'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('server-message:update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_dto_1.UpdateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "updateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('server-message:delete'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_message_dto_1.DeleteMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MyGateway.prototype, "deleteMessage", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: 'http://localhost:5173' },
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        socket_service_1.SocketService,
        token_service_1.TokenService,
        crud_employee_service_1.CrudEmployeeService,
        chat_service_1.ChatService])
], MyGateway);
//# sourceMappingURL=app.gateway.js.map
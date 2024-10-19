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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_model_1 = require("./entity/message.model");
const chat_service_1 = require("./chat.service");
let MessageService = class MessageService {
    constructor(messagersRepository, dataSource, chatService) {
        this.messagersRepository = messagersRepository;
        this.dataSource = dataSource;
        this.chatService = chatService;
    }
    async createMessage(dto) {
        let message = this.messagersRepository.create({ message: dto.message, chatId: dto.chatId, employeeId: dto.employeeId });
        return this.messagersRepository.save(message);
    }
    async getAllMessages(chatId, employeId) {
        let a = await this.dataSource.query(`SELECT * FROM employes_chats WHERE "chatId"=${chatId} AND "employeeId"=${employeId}`);
        if (a.length) {
            const data = await this.dataSource
                .query(`SELECT messagers."id", messagers."createTime", "message", "chatId", "employeeId", "email", "organ", 
                "division"  FROM messagers JOIN employee ON messagers."employeeId"=employee.id WHERE "chatId"=${chatId}`);
            return data;
        }
        else {
            return [];
        }
    }
    async getMessageById(messageId) {
        const message = await this.dataSource
            .query(`SELECT *  FROM messagers WHERE "id"=${messageId}`);
        return message[0];
    }
    async updateMessage(dto, employeeId) {
        const message = await this.getMessageById(dto.messageId);
        if (employeeId == message.employeeId) {
            const updatedMessage = await this.dataSource
                .query(`UPDATE messagers SET message='${dto.messageValue}' WHERE "id"=${dto.messageId}`);
            return updatedMessage;
        }
        throw new common_1.HttpException(`Пользователь не является создателем сообщения`, common_1.HttpStatus.BAD_REQUEST);
    }
    async deleteMessage(dto, employeeId) {
        const message = await this.getMessageById(dto.messageId);
        if (employeeId == message.employeeId) {
            const deleteMessage = await this.dataSource
                .query(`DELETE FROM messagers WHERE "id"=${dto.messageId}`);
            return deleteMessage;
        }
    }
    async getChatIdByMessageId(messageId) {
        const message = await this.dataSource
            .query(`SELECT "chatId"  FROM messagers WHERE "id"=${messageId}`);
        return message[0].chatId;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_model_1.Messagers)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        chat_service_1.ChatService])
], MessageService);
//# sourceMappingURL=message.service.js.map
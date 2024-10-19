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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const add_employee_in_chat_dto_1 = require("./dto/add-employee-in-chat.dto");
const message_service_1 = require("./message.service");
const update_message_dto_1 = require("./dto/update-message.dto");
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
let ChatController = class ChatController {
    constructor(chatService, messagersService, executionContextHost) {
        this.chatService = chatService;
        this.messagersService = messagersService;
        this.executionContextHost = executionContextHost;
    }
    async reqTest(req) {
        console.log("req: ", req.employee.payload.id);
    }
    async getTTT(employeId) {
        return employeId;
    }
    async getRecipe(employeId) {
        return this.chatService.getAllEmployeeChats(employeId);
    }
    createChat(chatDto) {
        return this.chatService.createChat(chatDto);
    }
    getChat(id) {
        return this.chatService.getChatById(id);
    }
    addEmployeeInChat(chatId, dto) {
        return this.chatService.addEmployeeInChat(chatId, dto.employersId);
    }
    removeEmployeeInChat(chatId, dto) {
        return this.chatService.removeEmployeeInChat(chatId, dto.employersId);
    }
    createMessage(chatId, messageDto) {
        const res = this.messagersService.createMessage({ ...messageDto, chatId: chatId });
        console.log(res);
        return { ...res[0] };
    }
    updateMessage(dto, req) {
        const employeeId = req.employee.payload.id;
        return this.messagersService.updateMessage(dto, employeeId);
    }
    getAllMessages(chatId, employeId) {
        return this.messagersService.getAllMessages(chatId, employeId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('execution'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "reqTest", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)('employeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getTTT", null);
__decorate([
    (0, common_1.Get)('get-all-employee-chat'),
    __param(0, (0, common_1.Query)('employeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.Post)('chat-create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getChat", null);
__decorate([
    (0, common_1.Put)('add-employee-chat/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_employee_in_chat_dto_1.ArrEmployesDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "addEmployeeInChat", null);
__decorate([
    (0, common_1.Put)('remove-employee-chat/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_employee_in_chat_dto_1.ArrEmployesDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "removeEmployeeInChat", null);
__decorate([
    (0, common_1.Post)('message-create/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Post)('update-message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_dto_1.UpdateMessageDto, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Get)('get-all-chat-messages/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('employeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getAllMessages", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        message_service_1.MessageService,
        execution_context_host_1.ExecutionContextHost])
], ChatController);
//# sourceMappingURL=chat.controller.js.map
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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crud_employee_service_1 = require("../create-employee/crud-employee.service");
const chat_model_1 = require("./entity/chat.model");
const message_model_1 = require("./entity/message.model");
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
let ChatService = class ChatService {
    constructor(chatRepository, messagersRepository, employeeService, dataSource, executionContextHost) {
        this.chatRepository = chatRepository;
        this.messagersRepository = messagersRepository;
        this.employeeService = employeeService;
        this.dataSource = dataSource;
        this.executionContextHost = executionContextHost;
    }
    async getExecutionContextHost(context) {
        const req = context.switchToHttp().getRequest();
        console.log(req);
    }
    async createChat(dto) {
        let arrEmployes = [];
        let chat = this.chatRepository.create({ title: dto.title });
        for (let i = 0; i < dto.employers.length; i++) {
            const employee = await this.employeeService.getEmployeeById(dto.employers[i]);
            delete employee.password;
            arrEmployes = [...arrEmployes, employee];
        }
        let finalChat = {
            ...chat,
            employes: [...arrEmployes],
        };
        return await this.chatRepository.save(finalChat);
    }
    async addEmployeeInChat(chatId, employersId) {
        let arrEmployes = [];
        const chat = await this.getChatById(chatId);
        if (chat) {
            for (let i = 0; i < employersId.length; i++) {
                const employee = await this.employeeService.getEmployeeById(employersId[i]);
                arrEmployes = [...arrEmployes, employee];
            }
        }
        let finalChat = {
            ...chat,
            employes: [...chat.employes, ...arrEmployes],
        };
        return this.chatRepository.save(finalChat);
    }
    async removeEmployeeInChat(chatId, employersId) {
        const chat = await this.getChatById(chatId);
        if (chat) {
            for (let i = 0; i < employersId.length; i++) {
                chat.employes = chat.employes.filter(item => item.id !== employersId[i]);
                this.chatRepository.save(chat);
            }
        }
        return chat;
    }
    async getChatById(chatId) {
        const chat = await this.dataSource.query(`SELECT * FROM chat WHERE (id = ${chatId})`);
        if (!chat) {
            throw new common_1.HttpException('Чат не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return chat;
    }
    async getCatsIdList(employeId) {
        let catsIdList = '';
        const chats = await this.dataSource.query(`SELECT "chatId" FROM employes_chats WHERE "employeeId"=${employeId}`);
        chats.forEach((item) => {
            Object.entries(item).forEach((element) => {
                if (catsIdList) {
                    catsIdList += `,${element[1]}`;
                }
                else {
                    catsIdList += element[1];
                }
            });
        });
        return catsIdList;
    }
    async getCatsIdByEmployeId(employeId) {
        const chats = await this.dataSource.query(`SELECT "chatId" FROM employes_chats WHERE "employeeId"=${employeId}`);
        console.log(chats);
        return chats;
    }
    async getAllEmployesInChat(chatId) {
        let employesArr = [];
        const chats = await this.dataSource.query(`SELECT "employeeId" FROM employes_chats WHERE "chatId"=${chatId}`);
        chats.forEach((item) => {
            Object.entries(item).forEach((element) => {
                employesArr.push(element[1]);
            });
        });
        return employesArr;
    }
    async getLastMessageInChat(chatId) {
        const lastMessage = await this.dataSource.query(`SELECT * FROM messagers WHERE "chatId"=${chatId}`);
        console.log("lastMessage: ", lastMessage);
    }
    async getAllEmployeeChats(employeId) {
        const catsIdList = await this.getCatsIdList(employeId);
        console.log('catsIdList: ', catsIdList);
        const finalChats = await this.dataSource
            .query(`SELECT * FROM chat 
           WHERE "id" IN (${catsIdList})`);
        console.log('finalChats:', finalChats);
        return finalChats;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_model_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(message_model_1.Messagers)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        crud_employee_service_1.CrudEmployeeService,
        typeorm_2.DataSource,
        execution_context_host_1.ExecutionContextHost])
], ChatService);
//# sourceMappingURL=chat.service.js.map
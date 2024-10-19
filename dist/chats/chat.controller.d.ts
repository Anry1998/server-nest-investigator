import { Request } from 'express';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ArrEmployesDto } from './dto/add-employee-in-chat.dto';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
export declare class ChatController {
    private chatService;
    private messagersService;
    private executionContextHost;
    constructor(chatService: ChatService, messagersService: MessageService, executionContextHost: ExecutionContextHost);
    reqTest(req: Request | any): Promise<void>;
    getTTT(employeId: number): Promise<number>;
    getRecipe(employeId: number): Promise<any>;
    createChat(chatDto: CreateChatDto): Promise<{
        employes: import("../create-employee/entity/employee.model").Employee[];
        id: number;
        title: string;
        messagers: import("./entity/message.model").Messagers[];
        createTime: Date;
    } & import("./entity/chat.model").Chat>;
    getChat(id: number): Promise<any>;
    addEmployeeInChat(chatId: number, dto: ArrEmployesDto): Promise<any>;
    removeEmployeeInChat(chatId: number, dto: ArrEmployesDto): Promise<any>;
    createMessage(chatId: number, messageDto: any): any;
    updateMessage(dto: UpdateMessageDto, req: Request | any): Promise<any>;
    getAllMessages(chatId: number, employeId: number): Promise<any>;
}

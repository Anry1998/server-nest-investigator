import { ExecutionContext } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CrudEmployeeService } from 'src/create-employee/crud-employee.service';
import { Employee } from 'src/create-employee/entity/employee.model';
import { Chat } from './entity/chat.model';
import { Messagers } from './entity/message.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
export declare class ChatService {
    private chatRepository;
    private messagersRepository;
    private employeeService;
    private dataSource;
    private executionContextHost;
    constructor(chatRepository: Repository<Chat>, messagersRepository: Repository<Messagers>, employeeService: CrudEmployeeService, dataSource: DataSource, executionContextHost: ExecutionContextHost);
    getExecutionContextHost(context: ExecutionContext): Promise<void>;
    createChat(dto: CreateChatDto): Promise<{
        employes: Employee[];
        id: number;
        title: string;
        messagers: Messagers[];
        createTime: Date;
    } & Chat>;
    addEmployeeInChat(chatId: number, employersId: number[]): Promise<any>;
    removeEmployeeInChat(chatId: number, employersId: number[]): Promise<any>;
    getChatById(chatId: number): Promise<any>;
    getCatsIdList(employeId: number): Promise<string>;
    getCatsIdByEmployeId(employeId: number): Promise<any>;
    getAllEmployesInChat(chatId: number): Promise<any[]>;
    getLastMessageInChat(chatId: number): Promise<void>;
    getAllEmployeeChats(employeId: number): Promise<any>;
}

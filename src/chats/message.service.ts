import { ClassSerializerInterceptor, ExecutionContext, HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CrudEmployeeService } from 'src/create-employee/crud-employee.service';
import { Employee } from 'src/create-employee/entity/employee.model';
import { Chat } from './entity/chat.model';
import { Messagers } from './entity/message.model';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { ArrEmployesDto } from './dto/add-employee-in-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Expose } from 'class-transformer';
import { ChatService } from './chat.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Messagers) private messagersRepository: Repository<Messagers>,
        @InjectDataSource() private dataSource: DataSource,
        private chatService: ChatService,
        // private context: ExecutionContext,
    ) {} 

    async createMessage( dto: any) {
        let message = this.messagersRepository.create({message: dto.message, chatId: dto.chatId, employeeId: dto.employeeId})
        // console.log('employee', message.employeeId[0]) 
        return this.messagersRepository.save(message);
    }

    async getAllMessages(chatId: number, employeId: number) {
        let a = await this.dataSource.query(`SELECT * FROM employes_chats WHERE "chatId"=${chatId} AND "employeeId"=${employeId}`)
        if (a.length) {
            const data = await this.dataSource
                .query(`SELECT messagers."id", messagers."createTime", "message", "chatId", "employeeId", "email", "organ", 
                "division"  FROM messagers JOIN employee ON messagers."employeeId"=employee.id WHERE "chatId"=${chatId}`)
            return data
        } else {
            return []
        }
    }

    async getMessageById(messageId: number) {
        const message = await this.dataSource
            .query(`SELECT *  FROM messagers WHERE "id"=${messageId}`)
        return message[0]
    }


    async updateMessage( dto: UpdateMessageDto, employeeId: number  ) {
        const message = await this.getMessageById(dto.messageId)
        
        if (employeeId == message.employeeId) {
            const updatedMessage = await this.dataSource
                .query(`UPDATE messagers SET message='${dto.messageValue}' WHERE "id"=${dto.messageId}`)
            return updatedMessage 
        }
        throw new HttpException(`Пользователь не является создателем сообщения`, HttpStatus.BAD_REQUEST) 
    }


    async deleteMessage( dto: DeleteMessageDto, employeeId: number  ) {
        const message = await this.getMessageById(dto.messageId)
        
        if (employeeId == message.employeeId) {
            const deleteMessage = await this.dataSource
                .query(`DELETE FROM messagers WHERE "id"=${dto.messageId}`)
            return deleteMessage 
        }
    }


    async getChatIdByMessageId(messageId: number) {
        const message = await this.dataSource
            .query(`SELECT "chatId"  FROM messagers WHERE "id"=${messageId}`)
        return message[0].chatId
    }
 
}

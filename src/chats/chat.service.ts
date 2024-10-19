import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CrudEmployeeService } from 'src/create-employee/crud-employee.service';
import { Employee } from 'src/create-employee/entity/employee.model';
import { Chat } from './entity/chat.model';
import { Messagers } from './entity/message.model';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { ArrEmployesDto } from './dto/add-employee-in-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(Messagers) private messagersRepository: Repository<Messagers>,
        private employeeService: CrudEmployeeService,
        @InjectDataSource() private dataSource: DataSource,
        private executionContextHost: ExecutionContextHost,
    ) {}

    async getExecutionContextHost(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        console.log(req)
        // const socket = context.switchToWs().getClient<any>();
        // console.log(socket)
    }

    async createChat(dto: CreateChatDto) {
        let arrEmployes: Employee[] = []
        let chat = this.chatRepository.create({title: dto.title});
        for(let i: number = 0; i < dto.employers.length; i++) {
            const employee = await this.employeeService.getEmployeeById(dto.employers[i])
            delete employee.password
            arrEmployes = [...arrEmployes, employee]
        }
        let finalChat = {
            ...chat,
            employes: [...arrEmployes],
        };
        return await this.chatRepository.save(finalChat);
    }

    async addEmployeeInChat(chatId: number, employersId: number[]) {
        let arrEmployes: Employee[] = []
        const chat = await this.getChatById(chatId)
        if (chat) {
            for(let i: number = 0; i < employersId.length; i++) {
                const employee = await this.employeeService.getEmployeeById(employersId[i])
                arrEmployes = [...arrEmployes, employee]
            }
        }  
        let finalChat = {
            ...chat,
            employes: [...chat.employes, ...arrEmployes], 
        };
        return this.chatRepository.save(finalChat)
    }

    async removeEmployeeInChat(chatId: number, employersId: number[]) {
        const chat = await this.getChatById(chatId)
        if (chat) {
            for(let i: number = 0; i < employersId.length; i++) {
                chat.employes = chat.employes.filter(item => item.id !==employersId[i])
                this.chatRepository.save(chat)
            }
        }  
        return chat
    }

    // async getChatById(chatId: number) {
    //     const chat = await this.chatRepository.findOne({where: {id:chatId}})
    //     if (!chat) {
    //         throw new HttpException('Чат не найден', HttpStatus.NOT_FOUND)
    //     }
    //     return chat
    // }

    async getChatById(chatId: number) {
        // const chat = await this.dataSource.query('SELECT * FROM chat WHERE (id = 2)')
        const chat = await this.dataSource.query(`SELECT * FROM chat WHERE (id = ${chatId})`)
        if (!chat) {
            throw new HttpException('Чат не найден', HttpStatus.NOT_FOUND)
        }
        return chat
    }

    async getCatsIdList(employeId: number) {
        let catsIdList = ''
        const chats = await this.dataSource.query(`SELECT "chatId" FROM employes_chats WHERE "employeeId"=${employeId}`)
        chats.forEach( (item: any) => {
            Object.entries(item).forEach((element: any) => {
                if (catsIdList) {
                    catsIdList += `,${element[1]}` 
                } else {
                    catsIdList += element[1] 
                }
            })
        })
        return catsIdList
    }


    async getCatsIdByEmployeId(employeId: number) {

        const chats = await this.dataSource.query(`SELECT "chatId" FROM employes_chats WHERE "employeeId"=${employeId}`)
        console.log(chats)
        return chats
    }


    async getAllEmployesInChat(chatId: number) {
        let employesArr = []
        const chats = await this.dataSource.query(`SELECT "employeeId" FROM employes_chats WHERE "chatId"=${chatId}`)
        chats.forEach( (item: any) => {
            Object.entries(item).forEach((element: any) => {
                employesArr.push(element[1])
            })
        })
        return employesArr
    }

    async getLastMessageInChat(chatId: number) {
        const lastMessage = await this.dataSource.query(`SELECT * FROM messagers WHERE "chatId"=${chatId}`)
        console.log("lastMessage: ", lastMessage)
    }



    async getAllEmployeeChats(employeId: number) {
        const catsIdList = await this.getCatsIdList(employeId)
        console.log('catsIdList: ', catsIdList)

        // await this.getLastMessageInChat()
        const finalChats = await this.dataSource
           .query(`SELECT * FROM chat 
           WHERE "id" IN (${catsIdList})`)

        console.log('finalChats:', finalChats)
        return finalChats
    }

    // async createMessage(chatId: number, dto: CreateMessageDto) {
    //     // return await this.chatRepository.save(dto)
    // }

    

    // async getMessages() {
    //     const messagers = await this.chatRepository.find()
    //     // console.log(messagers)
    //     return messagers 
    // }
 
}

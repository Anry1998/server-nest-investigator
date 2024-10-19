import { ClassSerializerInterceptor, ExecutionContext, HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


import { Messagers } from './entity/message.model';

import { ChatService } from './chat.service';
import { SocketId } from './entity/socket-id.model';
  
  
@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(SocketId) private socketRepository: Repository<SocketId>,
        @InjectDataSource() private dataSource: DataSource,
    ) {} 
   
   
    async saveSocketId(employeeId: number, socketId: string) {
        await this.socketRepository.save({ socketId: socketId, employeeId: employeeId})
    }  
   
    async removeSocketId(socketId: string) {
        console.log('socketId: ' , socketId)
        if (socketId !== undefined) {
            return await this.socketRepository.delete({socketId: socketId})
        }  
    }

    async getSocketIdByEmployeeId(employeeId: number) {
        return await this.socketRepository.find( {where:{employeeId: employeeId}})
    }

    async getSocketIdListByEmployeeIdList(employeeIdList: string) {
        const socketIdList = await this.dataSource
            .query(`SELECT "socketId" FROM socket WHERE "employeeId" IN (${employeeIdList})`)
        return socketIdList
    }
}
 
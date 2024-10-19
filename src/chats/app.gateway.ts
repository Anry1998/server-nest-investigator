import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { ChatService } from './chat.service';

import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CanActivate, ExecutionContext, Req, UseGuards } from '@nestjs/common';


import { WsJwtGuard } from './guard/ws-jwt.guard'
import { Public } from 'src/auth/decorators/public.decorator';

import { Request, Response } from 'express';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocketId } from './entity/socket-id.model';
import { SocketService } from './socket.service';


import  url from 'url';
import { TokenService } from 'src/auth/token.service';
import { Employee } from 'src/create-employee/entity/employee.model';
import { CrudEmployeeService } from 'src/create-employee/crud-employee.service';


let employeeSocketsList = []


// @UseGuards(WsJwtGuard)
@WebSocketGateway({
  cors: {origin: 'http://localhost:5173'},
})
export class MyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messagersService: MessageService,
    private socketService: SocketService,
    private tokenService: TokenService,
    private employeeService: CrudEmployeeService,
    private сhatService: ChatService,
  ) {} 
 
  @WebSocketServer() server: Server; 

  afterInit(server: Server) {
    server.use(async(socket: Socket, next) => {
      const authHeader = socket.handshake.auth?.accessToken;

      console.log('authHeader', authHeader)

      if (authHeader) {
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]   

        const bearerToken = bearer === 'Bearer' ? token : undefined;
        const validateToken = await this.tokenService.validateAccessToken(token);
  
        if (bearerToken && validateToken) {  
          const employee = await this.employeeService.getEmployeeByEmail(validateToken.payload.email);
          if (!employee) {
            next(new Error("Ошибка авторизации!"));
          }
          socket.data.employee = employee 
          next()
        } else {
          next(new Error("Ошибка авторизации!"));
        }
      }
    }) 
  }
     
  async handleConnection(client: Socket) {  
    console.log('handleConnection: ', client.id)
    await this.socketService.saveSocketId(client.data.employee.id, client.id);     
  }             
    
  async handleDisconnect(client: Socket) {
    await this.socketService.removeSocketId(client.id);     
  }
 
  @SubscribeMessage('employee-logout')
  async employeeLogout(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.socketService.removeSocketId(client.id);
    this.server.to(`${client.id}`).disconnectSockets()  
  }

  @SubscribeMessage('server-message:send')
  async handleSendMessage(
    @MessageBody() payload: any,
  ): Promise<void> {
    const employesArr =  await this.сhatService.getAllEmployesInChat(payload.chatId)
    const socketIdList = await  this.socketService.getSocketIdListByEmployeeIdList(employesArr.join())

    if (socketIdList) {
      await this.messagersService.createMessage(payload) 
      socketIdList.forEach( (it: any, ind: number) => {
        this.server.to(socketIdList[ind].socketId).emit('client-message:send', payload);
      })
    }
    // this.server.emit('client-message:send', payload);
  }    
  
  @SubscribeMessage('server-message:update')
  async updateMessage( 
    @MessageBody() payload: UpdateMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {

    const employeeId = client.data.employee.id
    await this.messagersService.updateMessage(payload, employeeId) 

    const chatId = await this.messagersService.getChatIdByMessageId(payload.messageId) 
    const employesArr =  await this.сhatService.getAllEmployesInChat(chatId)
    const socketIdList = await  this.socketService.getSocketIdListByEmployeeIdList(employesArr.join())

    if (socketIdList) {
      await this.messagersService.createMessage(payload) 
      socketIdList.forEach( (item: any, ind: number) => {
        this.server.to(socketIdList[ind].socketId).emit('client-message:update', payload);
      })
    } 
  }  

  @SubscribeMessage('server-message:delete')
  async deleteMessage( 
    @MessageBody() payload: DeleteMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const employeeId = client.data.employee.id
    this.messagersService.deleteMessage(payload, employeeId) 

    const chatId = await this.messagersService.getChatIdByMessageId(payload.messageId)
    const employesArr =  await this.сhatService.getAllEmployesInChat(chatId)
    const socketIdList = await  this.socketService.getSocketIdListByEmployeeIdList(employesArr.join())

    if (socketIdList) {
      await this.messagersService.createMessage(payload) 
      socketIdList.forEach( (item: any, ind: number) => {
        this.server.to(socketIdList[ind].socketId).emit('client-message:delete', payload);
      })
    } 
  } 
}  
 
  
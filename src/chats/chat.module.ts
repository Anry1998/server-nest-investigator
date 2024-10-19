import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/chat.model';
import { ChatService } from './chat.service';

import { ChatController } from './chat.controller';
import { Messagers } from './entity/message.model';
import { CrudEmployeeModule } from 'src/create-employee/crud-employee.module';
import { MessageService } from './message.service';
import { MyGateway } from './app.gateway';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { SocketId } from './entity/socket-id.model';
import { SocketService } from './socket.service';



// import { User } from './entity/user';


@Module({
  imports: [ 
    TypeOrmModule.forFeature([Chat, Messagers, SocketId]), 
    CrudEmployeeModule,
    JwtModule,
    AuthModule,
    ExecutionContextHost,
  ],
  controllers: [ChatController],
  providers: [ChatService, MessageService, SocketService, MyGateway, ExecutionContextHost],
  exports: [ChatService, MessageService, SocketService,],
})
export class ChatModule {}   

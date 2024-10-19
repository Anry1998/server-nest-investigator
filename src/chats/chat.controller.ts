import { Body, Controller, Get, Post, UseGuards , Req, Res, Delete, UsePipes, Param, ParseIntPipe, Put, Query, ExecutionContext,} from '@nestjs/common';


 


// import { RoleGuard2 } from './guard/role.guard';

import { Request, Response } from 'express';


import { Public } from 'src/auth/decorators/public.decorator';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ArrEmployesDto } from './dto/add-employee-in-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { Role } from 'src/auth/decorators/role';
import { PostGuard } from 'src/auth/guard/post.guard';
import { EmployeeIdInQuery } from './guard/employee-id-in-query.guard';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { json } from 'stream/consumers';



// const url = require('url');


// @Role( '1', '2', '3')
// @UseGuards(AccessTokenGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private messagersService: MessageService,
    private executionContextHost: ExecutionContextHost,
  ) {}
 

  @Get('execution')
  async reqTest(@Req() req: Request | any) {
    // let e = req.user
    console.log("req: ", req.employee.payload.id)
    // if (req?.employee) {
      
    // }
    
  }
 
  // @UseGuards(EmployeeInChatGuard)
  @Get('get')
  async getTTT(
    @Query('employeId') employeId: number,
  ) {
    // const req = context.switchToHttp().getRequest()
    // console.log('queryIdAfter:', req._parsedUrl.query)
    return employeId
  }

  // @UseGuards(EmployeeInChatGuard)

  @Get('get-all-employee-chat')
  async getRecipe(@Query('employeId') employeId: number) {
    return this.chatService.getAllEmployeeChats(employeId)
    // http://localhost:5000/upload?employeId=1 
  }


  @Post('chat-create')
  createChat(@Body() chatDto: CreateChatDto) {
    return this.chatService.createChat(chatDto)
  }


  @Get('/:id')
  getChat(@Param('id', new ParseIntPipe) id: number ) {
      return this.chatService.getChatById(id)
  }



  @Put('add-employee-chat/:id')
  addEmployeeInChat(
    @Param('id', new ParseIntPipe) chatId: number,
    @Body() dto : ArrEmployesDto
  ) {
    return this.chatService.addEmployeeInChat(chatId, dto.employersId)
  }


  @Put('remove-employee-chat/:id')
  removeEmployeeInChat(
    @Param('id', new ParseIntPipe) chatId: number,
    @Body() dto : ArrEmployesDto
  ) {
     return this.chatService.removeEmployeeInChat(chatId, dto.employersId)
  }


  @Post('message-create/:id') 
  createMessage(
    @Param('id', new ParseIntPipe) chatId: number,
    @Body() messageDto: any
  ) {

    const res = this.messagersService.createMessage({...messageDto, chatId: chatId} )
    console.log(res)
    return {...res[0]} 
  }



  @Post('update-message')
  updateMessage(
    @Body() dto: UpdateMessageDto,
    @Req() req: Request | any
    ) {

    const employeeId =  req.employee.payload.id
    // const userId = req.user?.payload.id
    return this.messagersService.updateMessage(dto, employeeId)
  }


  // @UseGuards(EmployeeIdInQuery)
  @Get('get-all-chat-messages/:id')
  getAllMessages(
   @Param('id', new ParseIntPipe) chatId: number,
   @Query('employeId') employeId: number,
  ) {
    return this.messagersService.getAllMessages(chatId, employeId)
  }

}

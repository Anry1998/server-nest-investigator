import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { SocketService } from './socket.service';
import { TokenService } from 'src/auth/token.service';
import { CrudEmployeeService } from 'src/create-employee/crud-employee.service';
export declare class MyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messagersService;
    private socketService;
    private tokenService;
    private employeeService;
    private сhatService;
    constructor(messagersService: MessageService, socketService: SocketService, tokenService: TokenService, employeeService: CrudEmployeeService, сhatService: ChatService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    employeeLogout(client: Socket): Promise<void>;
    handleSendMessage(payload: any): Promise<void>;
    updateMessage(payload: UpdateMessageDto, client: Socket): Promise<void>;
    deleteMessage(payload: DeleteMessageDto, client: Socket): Promise<void>;
}

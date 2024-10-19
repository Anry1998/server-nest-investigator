import { DataSource, Repository } from 'typeorm';
import { Messagers } from './entity/message.model';
import { ChatService } from './chat.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
export declare class MessageService {
    private messagersRepository;
    private dataSource;
    private chatService;
    constructor(messagersRepository: Repository<Messagers>, dataSource: DataSource, chatService: ChatService);
    createMessage(dto: any): Promise<Messagers>;
    getAllMessages(chatId: number, employeId: number): Promise<any>;
    getMessageById(messageId: number): Promise<any>;
    updateMessage(dto: UpdateMessageDto, employeeId: number): Promise<any>;
    deleteMessage(dto: DeleteMessageDto, employeeId: number): Promise<any>;
    getChatIdByMessageId(messageId: number): Promise<any>;
}

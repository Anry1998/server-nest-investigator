import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Public } from 'src/auth/decorators/public.decorator';
// Подписка на события по веб сокетам
// @Public()
@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
 
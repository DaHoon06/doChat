import { Module } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  providers: [ChatRoomService, ChatGateway],
})
export class ChatModule {}

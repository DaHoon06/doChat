import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { ChatGateway } from '../chat/chat.gateway';
import { ChatRoomService } from '../chat/chatRoom.service';

@Module({
  providers: [EventGateway, ChatGateway, ChatRoomService],
})
export class EventModule {}

import { Module } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatRoomService, ChatGateway],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../libs/db/schema/user/user.schema';
import {
  ChatLists,
  ChatListsSchema,
} from '../../libs/db/schema/chat/chatLists.schema';
import {
  ChatLog,
  ChatLogSchema,
} from '../../libs/db/schema/chat/chat.log.schema';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ChatLists.name, schema: ChatListsSchema },
      { name: ChatLog.name, schema: ChatLogSchema },
    ]),
  ],
  providers: [ChatService, ChatGateway, ChatRepository],
})
export class ChatModule {}

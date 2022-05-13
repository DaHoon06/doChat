import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  ChatDocument,
  ChatLists,
} from '../../libs/db/schema/chat/chatLists.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(ChatLists.name) private chatModel: Model<ChatDocument>,
  ) {}

  async createChatRoom(client: Socket, roomName: string): Promise<void> {
    console.group('--------레파지토리 내부---------');
    console.groupCollapsed(client, roomName);
    // await new this.chatModel().save();
  }
}

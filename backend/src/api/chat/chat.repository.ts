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

  async createChatRoom(client: Socket, roomName: string): Promise<any> {
    try {
      console.group('--------레파지토리 내부---------');
      const sendData = {
        clientId: client.id,
        nickName: roomName,
      };
      return await new this.chatModel(sendData).save();
    } catch (e) {
      console.log(e);
    }
  }
  async getChatRoom(roomName: string) {
    try {
      return await this.chatModel.findOne({ nickName: roomName });
    } catch (e) {
      console.log(e);
    }
  }
}

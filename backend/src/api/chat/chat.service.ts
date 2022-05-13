import { Injectable } from '@nestjs/common';
import { chatRoomListDTO } from './dto/chat.dto';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  private readonly chatRoomList: Record<string, chatRoomListDTO>;
  constructor(private readonly ChatRepository: ChatRepository) {}

  getUUID(): string {
    return uuidv4();
  }

  //TODO: 채팅방 생성
  async createChatRoom(client: Socket, roomName: string): Promise<void> {
    client.join(roomName);
    await this.ChatRepository.createChatRoom(client, roomName);
  }
  //TODO: 채팅방 입장
  enterChatRoom(client: Socket, roomId: string) {
    console.log(`방 정보 : ${roomId}`);
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
    const { nickName } = client.data;
    const { roomName } = this.getChatRoom(roomId);
    client.to(roomId).emit('enterChatRoom', {
      id: null,
      nickname: '안내',
      message: `"${nickName}"님이 "${roomName}"방에 접속하셨습니다.`,
    });
  }

  exitChatRoom(client: Socket) {
    const { nickName, roomId } = client.data;
    client.rooms.clear();
    client.join(roomId);
    console.log(`${nickName} 님이 로그아웃 하셨습니다. : 방[${roomId}]`);
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: '"' + nickName + '"님이 퇴장하셨습니다.',
    });
  }

  getChatRoom(roomId: string): chatRoomListDTO {
    console.log(`채팅방 정보 : ${roomId}`);
    return this.chatRoomList[roomId];
  }

  getChatRoomList(): Record<string, chatRoomListDTO> {
    console.log(this.chatRoomList);
    console.log(`채팅방 리스트 : `, this.chatRoomList);
    return this.chatRoomList;
  }

  deleteChatRoom(roomId: string) {
    // delete this.chatRoomList;
  }
}

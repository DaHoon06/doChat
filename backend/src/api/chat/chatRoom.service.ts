import { Injectable } from '@nestjs/common';
import { chatRoomListDTO } from './dto/chat.dto';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatRoomService {
  private readonly chatRoomList: Record<string, chatRoomListDTO>;
  constructor() {
    this.chatRoomList = {
      'room:lobby': {
        roomId: 'room:lobby',
        roomName: '채팅방',
        cheifId: null,
      },
    };
  }
  createChatRoom(client: Socket, roomName: string): void {
    const roomId = `room:${uuidv4()}`;
    const nickname: string = client.data.nickname;
    this.chatRoomList[roomId] = {
      roomId,
      cheifId: client.id,
      roomName,
    };
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
    client.emit('getMessage', {
      id: null,
      nickname: '안내',
      message: '"' + nickname + '"님이 "' + roomName + '"방을 생성하였습니다.',
    });
  }

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
  // nickName: string
  exitChatRoom(client: Socket, roomId: string ) {
    client.data.roomId = `room:lobby`;
    client.rooms.clear();
    client.join(`room:lobby`);
    const { nickName } = client.data;
    console.log(`${nickName} 님이 로그아웃 하셨습니다. : 방[${roomId}]`);
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: '"' + nickName + '"님이 방에서 나갔습니다.',
    });
  }

  getChatRoom(roomId: string): chatRoomListDTO {
    console.log(`채팅방 정보 : ${roomId}`);
    return this.chatRoomList[roomId];
  }

  getChatRoomList(): Record<string, chatRoomListDTO> {
    console.log(`채팅방 리스트 : ${this.chatRoomList}`);
    return this.chatRoomList;
  }

  deleteChatRoom(roomId: string) {
    delete this.chatRoomList[roomId];
  }
}

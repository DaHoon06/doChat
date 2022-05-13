import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { CommonChatDto } from './dto/chat.dto';
import { UseFilters } from '@nestjs/common';
import { ErrorFilter } from '../../common/error.filter';

@WebSocketGateway(9001, {
  cors: {
    origin: 'http://localhost:8080',
  },
})
@UseFilters(new ErrorFilter())
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly ChatRoomService: ChatService) {}

  @WebSocketServer()
  server: Server;

  //소켓 연결시 유저목록에 추가
  @SubscribeMessage('connect')
  public handleConnection(client: Socket): void {
    console.log('----------- 소켓 연결 -----------', client.id);
    const roomId = this.ChatRoomService.getUUID();
    client.leave(client.id);
    client.data.roomId = roomId;
    client.join(client.id);
    console.log('-----------------------------------------------');
  }

  //소켓 연결 해제시 유저목록에서 제거
  @SubscribeMessage('closedChat')
  public handleDisconnect(client: Socket): void {
    const { roomId } = client.data;
    // console.log(
    //   '소켓 통신 전 데이터 : ',
    //   ...this.server.sockets.adapter.rooms.get(roomId),
    // );
    if (
      roomId != 'room:lobby' &&
      !this.server.sockets.adapter.rooms.get(roomId)
    ) {
      this.ChatRoomService.deleteChatRoom(roomId);
      this.server.emit(
        'getChatRoomList',
        this.ChatRoomService.getChatRoomList(),
      );
    }
    this.ChatRoomService.exitChatRoom(client);
    console.log('----------- 소켓 통신 종료 -----------', client.id);
  }

  //처음 접속시 닉네임 등 최초 설정
  @SubscribeMessage('setUserInformation')
  setInit(client: Socket, data: any): CommonChatDto {
    console.log(data);
    console.log(`초기 닉네임 설정 : ${data.nickName}`);
    const { nickName, roomId } = data;
    if (client.data.isInit) return;
    client.data.nickName = nickName;
    client.data.roomId = roomId;
    console.log('초기값 들어있니??', client.data.nickName, client.data.roomId);
    client.data.isInit = true;
    return {
      nickName: nickName,
      roomId: roomId,
    };
  }

  //메시지가 전송되면 모든 유저에게 메시지 전송
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, data: any): void {
    const { roomId } = client.data;
    const { message, nickName } = data;
    console.log(`메세지 전송: ${nickName} -> ${message}`);
    client.broadcast.to(roomId).emit('getMessage', {
      id: roomId,
      nickName: nickName,
      message,
    });
  }

  //채팅방 목록 가져오기
  @SubscribeMessage('getChatRoomList')
  getChatRoomList(client: Socket, payload: any) {
    console.log('채팅방 조회');
    client.emit('getChatRoomList', this.ChatRoomService.getChatRoomList());
  }

  //채팅방 생성하기
  @SubscribeMessage('createChatRoom')
  createChatRoom(client: Socket, roomName: string) {
    //이전 방이 만약 나 혼자있던 방이면 제거
    console.log(`${roomName} 으로 채팅방 생성`);
    // if (
    //   client.data.roomId != 'room:lobby' &&
    //   this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    // ) {
    //   this.ChatRoomService.deleteChatRoom(client.data.roomId);
    // }
    this.ChatRoomService.createChatRoom(client, roomName);
    return {
      roomId: client.data.roomId,
      roomName: this.ChatRoomService.getChatRoom(client.data.roomId).roomName,
    };
  }

  //채팅방 들어가기
  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, payload: string) {
    //이미 접속해있는 방 일 경우 재접속 차단
    console.log('EnterRoom');
    console.log(client.data.roomId);
    const { roomId } = payload['room:lobby'];
    if (client.rooms.has(roomId)) {
      return;
    }
    //이전 방이 만약 나 혼자있던 방이면 제거
    if (
      client.data.roomId != 'room:lobby'
      // this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    ) {
      // this.ChatRoomService.deleteChatRoom(client.data.roomId);
    }
    this.ChatRoomService.enterChatRoom(client, roomId);
    return {
      roomId: roomId,
      roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
    };
  }
}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatRoomService } from './chatRoom.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9001, {
  cors: {
    origin: 'http://localhost:8080',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly ChartRoomService: ChatRoomService) {}

  @WebSocketServer()
  server: Server;

  //소켓 연결시 유저목록에 추가
  @SubscribeMessage('connect')
  public handleConnection(client: Socket): void {
    client.leave(client.id);
    client.data.roomId = `room:lobby`;
    console.log('CONNECTED SOCKET.IO');
    client.join('room:lobby');
  }

  //소켓 연결 해제시 유저목록에서 제거
  @SubscribeMessage('closedChat')
  public handleDisconnect(client: Socket): void {
    const { roomId, nickName } = client.data;

    console.log(
      '소켓 통신 전 데이터 : ',
      ...this.server.sockets.adapter.rooms.get(roomId),
    );
    if (
      roomId != 'room:lobby' &&
      !this.server.sockets.adapter.rooms.get(roomId)
    ) {
      this.ChartRoomService.deleteChatRoom(roomId);
      this.server.emit(
        'getChatRoomList',
        this.ChartRoomService.getChatRoomList(),
      );
    }
    this.ChartRoomService.exitChatRoom(client);
    console.log('----------- 소켓 통신 종료 -----------', client.id);
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

  //처음 접속시 닉네임 등 최초 설정
  @SubscribeMessage('setInit')
  setInit(client: Socket, data: any): any {
    const { nickName } = data;
    console.log(client.data.isInit);
    if (client.data.isInit) return;
    client.data.nickName = nickName;
    console.log('초기값 들어있니??', client.data.nickName);
    client.data.isInit = true;
    return {
      nickName: nickName,
      room: {
        roomId: 'room:lobby',
        roomName: '채팅방',
      },
    };
  }

  //채팅방 목록 가져오기
  @SubscribeMessage('getChatRoomList')
  getChatRoomList(client: Socket, payload: any) {
    console.log('채팅방 조회');
    client.emit('getChatRoomList', this.ChartRoomService.getChatRoomList());
  }

  //채팅방 생성하기
  @SubscribeMessage('createChatRoom')
  createChatRoom(client: Socket, roomName: string) {
    //이전 방이 만약 나 혼자있던 방이면 제거
    console.log(client.data.roomId);
    if (
      client.data.roomId != 'room:lobby' &&
      this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    ) {
      this.ChartRoomService.deleteChatRoom(client.data.roomId);
    }
    this.ChartRoomService.createChatRoom(client, roomName);
    return {
      roomId: client.data.roomId,
      roomName: this.ChartRoomService.getChatRoom(client.data.roomId).roomName,
    };
  }

  //채팅방 들어가기
  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, payload: string) {
    //이미 접속해있는 방 일 경우 재접속 차단
    console.log('EnterRoom');
    const { roomId } = payload['room:lobby'];
    if (client.rooms.has(roomId)) {
      return;
    }
    console.log(roomId);
    //이전 방이 만약 나 혼자있던 방이면 제거
    if (
      client.data.roomId != 'room:lobby' &&
      this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    ) {
      this.ChartRoomService.deleteChatRoom(client.data.roomId);
    }
    this.ChartRoomService.enterChatRoom(client, roomId);
    return {
      roomId: roomId,
      roomName: this.ChartRoomService.getChatRoom(roomId).roomName,
    };
  }
}

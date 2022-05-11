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
    console.log('connected', client.id);
    client.leave(client.id);
    client.data.roomId = `room:lobby`;
    client.join('room:lobby');
  }

  //소켓 연결 해제시 유저목록에서 제거
  @SubscribeMessage('closedChat')
  public handleDisconnect(client: Socket): void {
    const { roomId } = client.data;
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
    console.log('disonnected', client.id);
  }

  //메시지가 전송되면 모든 유저에게 메시지 전송
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
    const { roomId } = client.data;
    console.log(message);
    client.to(roomId).emit('getMessage', {
      id: client.id,
      nickName: client.data.nickName,
      message,
    });
  }

  //처음 접속시 닉네임 등 최초 설정
  @SubscribeMessage('setInit')
  setInit(client: Socket, data: any): any {
    console.log({ client, data });
    if (client.data.isInit) {
      return;
    }

    client.data.nickName = data.nickName
      ? data.nickName
      : '낯선사람' + client.id;

    client.data.isInit = true;

    return {
      nickName: client.data.nickName,
      room: {
        roomId: 'room:lobby',
        roomName: '채팅방',
      },
    };
  }

  //닉네임 변경
  @SubscribeMessage('setNickname')
  setNickname(client: Socket, nickname: string): void {
    const { roomId } = client.data;
    client.to(roomId).emit('getMessage', {
      id: null,
      nickName: '안내',
      message: `"${client.data.nickName}"님이 "${nickname}"으로 닉네임을 변경하셨습니다.`,
    });
    client.data.nickName = nickname;
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
  enterChatRoom(client: Socket, roomId: string) {
    //이미 접속해있는 방 일 경우 재접속 차단
    if (client.rooms.has(roomId)) {
      return;
    }
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

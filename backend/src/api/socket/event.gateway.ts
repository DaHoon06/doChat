import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  // public handleConnection(client: any, ...args): void {
  //   console.log('hi');
  //   client['id'] = String(Number(new Date()));
  //   client['nickname'] = 'TEST' + String(Number(new Date()));
  //   this.client[client['id']] = client;
  // }
  public handleConnection(client: Socket): void {
    console.log('connected', client.id);
    client.leave(client.id);
    client.data.roomId = `room:lobby`;
    client.join('room:lobby');
  }

  public handleDisconnect(client): void {
    console.log('bye', client['id']);
    delete this.client[client['id']];
  }

  /*@SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    for (const [key, value] of Object.entries(this.client)) {
      value.send(
        JSON.stringify({
          event: 'events',
          data: { nickname: client['nickname'], message: payload },
        }),
      );
    }
  }*/
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
    this.server.emit('getMessage', message);
  }

  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }
  // @SubscribeMessage('events')
  // onEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }
}

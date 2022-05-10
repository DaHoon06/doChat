import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9001, {
  cors: {
    origin: 'http://localhost:8080',
  },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

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

  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
    this.server.emit('getMessage', message);
  }

  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }

}

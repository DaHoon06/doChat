import {
  AbstractWsAdapter,
  MessageMappingProperties,
} from '@nestjs/websockets';
import { INestApplicationContext } from '@nestjs/common';
import { isFunction } from '@nestjs/common/utils/shared.utils';
import { Server } from 'http';
import {
  filter,
  first,
  fromEvent,
  map,
  mergeMap,
  Observable,
  share,
  takeUntil,
} from 'rxjs';
import { DISCONNECT_EVENT } from '@nestjs/websockets/constants';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    return super.createIOServer(port, options);
  }
}

// export class SocketIoAdapter extends AbstractWsAdapter {
//   constructor(
//     appOrHttpServer?: INestApplicationContext | any,
//     private readonly corsOrigins = [],
//   ) {
//     super(appOrHttpServer);
//   }
//   public create(
//     port: number,
//     options?: any & { namespace?: string; server?: any },
//   ): any {
//     if (!options) {
//       return this.createIOServer(port);
//     }
//     const { namespace, server, ...opt } = options;
//     return server && isFunction(server.of)
//       ? server.of(namespace)
//       : namespace
//       ? this.createIOServer(port, opt).of(namespace)
//       : this.createIOServer(port, opt);
//   }
//
//   public createIOServer(port: number, options?: any): any {
//     const pubClient = new RedisClient({
//       host: process.env.REDIS_HOST,
//       port: 6379,
//     });
//     const subClient = pubClient.duplicate();
//     const redisAdapter = createAdapter({ pubClient, subClient });
//     if (this.httpServer && port === 0) {
//       const server = new Server(this.httpServer, {
//         cors: {
//           origin: this.corsOrigins,
//           methods: ['GET', 'POST'],
//           credentials: true,
//           allowedHeaders: ['Content-Type', 'authorization'],
//         },
//         cookie: {
//           httpOnly: true,
//           path: '/',
//         },
//         maxHttpBufferSize: 1e6,
//       });
//       server.adapter(redisAdapter);
//       return server;
//     }
//     const server = new Server(port, options);
//     server.adapter(redisAdapter);
//     return server;
//   }
//
//   public bindMessageHandlers(
//     client: any,
//     handlers: MessageMappingProperties[],
//     transform: (data: any) => Observable<any>,
//   ) {
//     const disconnect$ = fromEvent(client, DISCONNECT_EVENT).pipe(
//       share(),
//       first(),
//     );
//
//     handlers.forEach(({ message, callback }) => {
//       const source$ = fromEvent(client, message).pipe(
//         mergeMap((payload: any) => {
//           const { data, ack } = this.mapPayload(payload);
//           return transform(callback(data, ack)).pipe(
//             filter((response: any) => !isNil(response)),
//             map((response: any) => [response, ack]),
//           );
//         }),
//         takeUntil(disconnect$),
//       );
//       source$.subscribe(([response, ack]) => {
//         if (response.event) {
//           return client.emit(response.event, response.data);
//         }
//         isFunction(ack) && ack(response);
//       });
//     });
//   }
//
//   public mapPayload(payload: any): { data: any; ack?: Function } {
//     if (!Array.isArray(payload)) {
//       return { data: payload };
//     }
//     const lastElement = payload[payload.length - 1];
//     const isAck = isFunction(lastElement);
//     if (isAck) {
//       const size = payload.length - 1;
//       return {
//         data: size === 1 ? payload[0] : payload.slice(0, size),
//         ack: lastElement,
//       };
//     }
//     return { data: payload };
//   }
// }

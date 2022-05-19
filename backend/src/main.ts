import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './api/socket/socket.io.adapter';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
  app.useWebSocketAdapter(new SocketIoAdapter(app));

}
// const test = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//   transport: Transport.REDIS,
//   options: {
//     url: 'redis://localhost:6379',
//   },
// });
bootstrap();

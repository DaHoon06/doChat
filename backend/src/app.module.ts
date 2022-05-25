import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { MODULES, ROUTES } from './module.router';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './api/chat/chat.module';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ChatModule,
    RouterModule.forRoutes(ROUTES),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ...MODULES,
    // CacheModule.register({
    //   store: redisStore,
    //   host: 'localhost',
    //   clusterConfig: {
    //     nodes: [
    //       {
    //         port: 3001,
    //         host: '127.0.0.1',
    //       },
    //     ],
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

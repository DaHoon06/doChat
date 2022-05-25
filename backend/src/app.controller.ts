import { CACHE_MANAGER, Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // @Get('/cache')
  // async getCache(@Query('id') id: string): Promise<string> {
  //   const savedTime = await this.cacheManager.get<number>('time');
  //   if (savedTime) {
  //     return 'saved Time : ' + savedTime;
  //   }
  //   const now = new Date().getTime();
  //   await this.cacheManager.set(id, now, { ttl: 600 });
  //   return 'save new time : ' + now;
  // }
}

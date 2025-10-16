//api-gateway\src\app\module\realtime\service\redis.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private pub: Redis;
  private sub: Redis;

  constructor() {
    this.pub = new Redis({
      host: 'localhost',
      port: 6379,
      retryStrategy: () => 1000,
    });
    this.sub = new Redis({
      host: 'localhost',
      port: 6379,
      retryStrategy: () => 1000,
    });
  }

  async publish(channel: string, message: string) {
    await this.pub.publish(channel, message);
  }

  subscribe(channel: string, callback: (msg: string) => void) {
    this.sub.subscribe(channel);
    this.sub.on('message', (chan, message) => {
      if (chan === channel) {
        console.log(`[Redis] Received from ${chan}: ${message}`); // 👀 optional log
        callback(message);
      }
    });
  }

  onModuleDestroy() {
    this.pub.quit();
    this.sub.quit();
  }
}

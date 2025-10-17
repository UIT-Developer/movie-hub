// apps/api-gateway/src/app/module/realtime/service/redis.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private pub: Redis;
  private sub: Redis;

  constructor() {
    const redisOptions = {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      // password: process.env.REDIS_PASSWORD || undefined,
      // db: Number(process.env.REDIS_DB) || 0,
      retryStrategy: () => 1000,
    };

    this.pub = new Redis(redisOptions);
    this.sub = new Redis(redisOptions);
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.pub.publish(channel, message);
  }

  subscribe(channel: string, callback: (msg: string) => void): void {
    this.sub.subscribe(channel, (err) => {
      if (err) {
        console.error(`[Redis] Failed to subscribe ${channel}`, err);
        return;
      }
      console.log(`[Redis] Subscribed to channel: ${channel}`);
    });

    this.sub.on('message', (chan, message) => {
      if (chan === channel) {
        callback(message);
      }
    });
  }

  onModuleDestroy(): void {
    this.pub.quit();
    this.sub.quit();
  }
}

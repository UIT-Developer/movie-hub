import { Module } from '@nestjs/common';
import { RealtimeGateway } from './gateway/realtime.gateway';
import { RedisModule } from '@movie-hub/shared-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      name: 'gateway',
      config: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: +(process.env.REDIS_PORT ?? 6379),
        db: 0,
      },
    }),
  ],
  providers: [RealtimeGateway],
  exports: [],
})
export class RealtimeModule {}

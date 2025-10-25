import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@movie-hub/shared-redis';
import { RealtimeService } from './realtime.service';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      name: 'cinema',
      config: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: +(process.env.REDIS_PORT ?? 6379),
        db: 0,
      },
    }),
  ],
  providers: [RealtimeService],
  exports: [RealtimeService],
})
export class RealtimeModule {}

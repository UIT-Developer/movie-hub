import { Module } from '@nestjs/common';
import { RealtimeGateway } from './gateway/realtime.gateway';
import { RedisService } from './service/redis.service';

@Module({
  providers: [RealtimeGateway, RedisService],
  exports: [RedisService],
})
export class RealtimeModule {}

import { Module } from '@nestjs/common';
import { RealtimeGateway } from './gateway/realtime.gateway';
import { RedisModule } from '@movie-hub/shared-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      name: 'gateway',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get('REDIS_URL'),
        config: {
          host: config.get('REDIS_HOST'),
          port: +config.get('REDIS_PORT'),
          db: 0,
        },
      }),
    }),
  ],

  providers: [RealtimeGateway],
  exports: [],
})
export class RealtimeModule {}

import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@movie-hub/shared-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingEventService } from './booking-event.service';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      name: 'booking',
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
  providers: [BookingEventService],
  exports: [BookingEventService],
})
export class BookingRedisModule {}

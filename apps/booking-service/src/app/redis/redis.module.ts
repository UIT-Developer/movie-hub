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
      }),
    }),
  ],
  providers: [BookingEventService],
  exports: [BookingEventService],
})
export class BookingRedisModule {}

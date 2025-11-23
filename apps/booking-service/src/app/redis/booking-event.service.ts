import { Injectable, Inject, Logger } from '@nestjs/common';
import { RedisPubSubService } from '@movie-hub/shared-redis';
import { BookingConfirmedEvent } from '@movie-hub/shared-types/booking';

@Injectable()
export class BookingEventService {
  private readonly logger = new Logger(BookingEventService.name);

  constructor(
    @Inject('REDIS_BOOKING') private readonly redis: RedisPubSubService
  ) {}

  async publishBookingConfirmed(event: BookingConfirmedEvent): Promise<void> {
    try {
      await this.redis.publish(
        'booking.confirmed',
        JSON.stringify(event)
      );
      this.logger.log(
        `Published booking.confirmed event for booking ${event.bookingId}`
      );
    } catch (error) {
      this.logger.error(
        `Failed to publish booking.confirmed event: ${error.message}`,
        error.stack
      );
    }
  }
}

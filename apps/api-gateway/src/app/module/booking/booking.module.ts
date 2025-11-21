import { Module } from '@nestjs/common';
import { BookingController } from './controller/booking.controller';
import { PaymentController } from './controller/payment.controller';
import { ConcessionController } from './controller/concession.controller';
import { PromotionController } from './controller/promotion.controller';
import { BookingService } from './service/booking.service';
import { PaymentService } from './service/payment.service';
import { ConcessionService } from './service/concession.service';
import { PromotionService } from './service/promotion.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@movie-hub/shared-types';
import { AuthModule } from '../../common/auth/auth.module';

/**
 * BookingModule
 * 
 * This module handles all features from the booking-service microservice:
 * - Bookings (create, view, cancel)
 * - Payments (process, verify, refund)
 * - Concessions (food & beverage)
 * - Promotions (discount codes, loyalty points)
 * 
 * All controllers connect to the same BOOKING_SERVICE microservice.
 */
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.BOOKING,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('BOOKING_HOST') || 'localhost',
            port: configService.get<number>('BOOKING_PORT') || 3004,
          },
        }),
      },
    // USER client is provided by AuthModule
    ]),
    AuthModule,
  ],
  controllers: [
    BookingController,
    PaymentController,
    ConcessionController,
    PromotionController,
  ],
  providers: [
    BookingService,
    PaymentService,
    ConcessionService,
    PromotionService,
  ],
  exports: [
    BookingService,
    PaymentService,
    ConcessionService,
    PromotionService,
  ],
})
export class BookingModule {}

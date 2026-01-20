import { Module } from '@nestjs/common';
import { BookingController } from './controller/booking.controller';
import { PaymentController } from './controller/payment.controller';
import { ConcessionController } from './controller/concession.controller';
import { PromotionController } from './controller/promotion.controller';
import { TicketController } from './controller/ticket.controller';
import { LoyaltyController } from './controller/loyalty.controller';
import { RefundController } from './controller/refund.controller';
import { BookingService } from './service/booking.service';
import { PaymentService } from './service/payment.service';
import { ConcessionService } from './service/concession.service';
import { PromotionService } from './service/promotion.service';
import { TicketService } from './service/ticket.service';
import { LoyaltyService } from './service/loyalty.service';
import { RefundService } from './service/refund.service';
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
 * - Refunds (create, approve, reject, process)
 * - Concessions (food & beverage)
 * - Promotions (discount codes, loyalty points)
 * - Tickets (view, validate, use, QR generation)
 * - Loyalty (points balance, transactions, earn/redeem)
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
    RefundController,
    ConcessionController,
    PromotionController,
    TicketController,
    LoyaltyController,
  ],
  providers: [
    BookingService,
    PaymentService,
    RefundService,
    ConcessionService,
    PromotionService,
    TicketService,
    LoyaltyService,
  ],
  exports: [
    BookingService,
    PaymentService,
    RefundService,
    ConcessionService,
    PromotionService,
    TicketService,
    LoyaltyService,
  ],
})
export class BookingModule {}

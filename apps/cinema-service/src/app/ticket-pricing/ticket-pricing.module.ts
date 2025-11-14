import { Module } from '@nestjs/common';
import { TicketPricingController } from './ticket-pricing.controller';
import { TicketPricingService } from './ticket-pricing.service';

@Module({
  controllers: [TicketPricingController],
  providers: [TicketPricingService]
})
export class TicketPricingModule {}

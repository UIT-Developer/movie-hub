import { Module } from '@nestjs/common';
import { TicketPricingController } from './ticket-pricing.controller';
import { TicketPricingService } from './ticket-pricing.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TicketPricingController],
  providers: [TicketPricingService, PrismaService],
})
export class TicketPricingModule {}

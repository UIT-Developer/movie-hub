import { Controller } from '@nestjs/common';
import { TicketPricingService } from './ticket-pricing.service';
import { MessagePattern } from '@nestjs/microservices';
import { CinemaMessage } from '@movie-hub/shared-types';

@Controller('ticket-pricing')
export class TicketPricingController {
  constructor(private readonly ticketPricingService: TicketPricingService) {}

  @MessagePattern(CinemaMessage.TICKET_PRICING.GET_PRICING_FOR_HALL)
  async getPricingForHall(hallId: string) {
    return await this.ticketPricingService.getPricingForHall(hallId);
  }

  @MessagePattern(CinemaMessage.TICKET_PRICING.UPDATE_PRICING_OF_TICKET)
  async updateTicketPricing(data: { pricingId: string; price: number }) {
    const { pricingId, price } = data;
    return await this.ticketPricingService.updateTicketPricing(
      pricingId,
      price
    );
  }
}

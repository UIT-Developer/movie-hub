import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TicketPricingResponse } from '@movie-hub/shared-types';
import { TicketPricingMapper } from './ticket-pricing.mapper';

@Injectable()
export class TicketPricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getPricingForHall(hallId: string): Promise<TicketPricingResponse[]> {
    const pricings = await this.prisma.ticketPricing.findMany({
      where: { hall_id: hallId },
    });

    return TicketPricingMapper.toTicketPricingResponses(pricings);
  }

  async updateTicketPricing(
    pricingId: string,
    price: number
  ): Promise<TicketPricingResponse> {
    const updatedPricing = await this.prisma.ticketPricing.update({
      where: { id: pricingId },
      data: { price },
    });
    return TicketPricingMapper.toTicketPricingResponse(updatedPricing);
  }
}

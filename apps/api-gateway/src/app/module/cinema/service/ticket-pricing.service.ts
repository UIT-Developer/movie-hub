import { CinemaMessage, SERVICE_NAME } from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TicketPricingService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getPricingForHall(hallId: string) {
    return this.cinemaClient.send(
      CinemaMessage.TICKET_PRICING.GET_PRICING_FOR_HALL,
      hallId
    );
  }

  async updateTicketPricing(pricingId: string, price: number) {
    return this.cinemaClient.send(
      CinemaMessage.TICKET_PRICING.UPDATE_PRICING_OF_TICKET,
      { pricingId, price }
    );
  }
}

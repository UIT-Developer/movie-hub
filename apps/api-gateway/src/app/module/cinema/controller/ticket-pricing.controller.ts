import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { TicketPricingService } from '../service/ticket-pricing.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';

@Controller({
  version: '1',
  path: 'ticket-pricings',
})
@UseInterceptors(new TransformInterceptor())
export class TicketPricingController {
  constructor(private readonly ticketPricingService: TicketPricingService) {}

  @Get('hall/:hallId')
  async getPricingForHall(@Param('hallId') hallId: string) {
    return await this.ticketPricingService.getPricingForHall(hallId);
  }

  @Patch('pricing/:pricingId')
  async updateTicketPricing(
    @Param('pricingId') pricingId: string,
    @Body('price') price: number
  ) {
    return await this.ticketPricingService.updateTicketPricing(
      pricingId,
      price
    );
  }
}

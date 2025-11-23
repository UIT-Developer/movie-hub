import { TicketPricingResponse } from '@movie-hub/shared-types';

export class TicketPricingMapper {
  static toTicketPricingResponse(entity): TicketPricingResponse {
    return {
      id: entity.id,
      hallId: entity.hallId,
      seatType: entity.seatType,
      dayType: entity.dayType,
      price: Number(entity.price), // Convert Prisma Decimal to number
    };
  }

  static toTicketPricingResponses(entities): TicketPricingResponse[] {
    return entities.map((entity) =>
      TicketPricingMapper.toTicketPricingResponse(entity)
    );
  }
}

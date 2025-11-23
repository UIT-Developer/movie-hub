import { TicketPricingResponse } from '@movie-hub/shared-types';

export class TicketPricingMapper {
  static toTicketPricingResponse(entity): TicketPricingResponse {
    return {
      id: entity.id,
      hallId: entity.hall_id,
      seatType: entity.seat_type,
      dayType: entity.day_type,
      price: entity.price,
    };
  }

  static toTicketPricingResponses(entities): TicketPricingResponse[] {
    return entities.map((entity) =>
      TicketPricingMapper.toTicketPricingResponse(entity)
    );
  }
}

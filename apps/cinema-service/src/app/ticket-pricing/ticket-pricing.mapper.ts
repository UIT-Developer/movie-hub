import { TicketPricingResponse } from '@movie-hub/shared-types';

export class TicketPricingMapper {
  static toTicketPricingResponse(entity): TicketPricingResponse {
    return {
      ...entity,
    } as unknown as TicketPricingResponse;
  }

  static toTicketPricingResponses(entities): TicketPricingResponse[] {
    return entities.map((entity) =>
      TicketPricingMapper.toTicketPricingResponse(entity)
    );
  }
}

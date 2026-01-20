import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateTicketPricingSchema = z.object({
  price: z.number().min(0),
});

export class UpdateTicketPricingRequest extends createZodDto(
  UpdateTicketPricingSchema
) {}

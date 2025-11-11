import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SeatActionSchema = z
  .object({
    showtimeId: z.string().min(1, 'ShowtimeId cannot be empty'),
    seatId: z.string().min(1, 'SeatId cannot be empty'),
  })
  .strict();

export class SeatActionDto extends createZodDto(SeatActionSchema) {}

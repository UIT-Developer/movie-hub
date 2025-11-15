import { SeatStatusEnum } from '@movie-hub/shared-types/cinema/enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateSeatStatusSchema = z.object({
  status: z
    .enum(Object.values(SeatStatusEnum) as [string, ...string[]])
    .default(SeatStatusEnum.ACTIVE),
});

export class UpdateSeatStatusRequest extends createZodDto(
  UpdateSeatStatusSchema
) {}

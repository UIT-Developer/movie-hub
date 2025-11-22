import {
  FormatEnum,
  ShowtimeStatusEnum,
} from '@movie-hub/shared-types/cinema/enum';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const AdminGetShowtimesQuerySchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

    status: z
      .enum(Object.values(ShowtimeStatusEnum) as [string, ...string[]])
      .optional(),
    format: z
      .enum(Object.values(FormatEnum) as [string, ...string[]])
      .optional(),
    hallId: z.string().optional(),
    language: z.string().optional(),
  })
  .strict();

export class AdminGetShowtimesQuery extends createZodDto(
  AdminGetShowtimesQuerySchema
) {}

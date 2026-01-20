import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateMovieReleaseSchema = z
  .object({
    movieId: z.uuid(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    note: z.string().max(500).optional(),
  })
  .strict();

export class CreateMovieReleaseRequest extends createZodDto(
  CreateMovieReleaseSchema
) {}

export const UpdateMovieReleaseSchema = CreateMovieReleaseSchema.partial();

export class UpdateMovieReleaseRequest extends createZodDto(
  UpdateMovieReleaseSchema
) {}

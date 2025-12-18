import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateReviewSchema = z
  .object({
    movieId: z.uuid(),
    userId: z.string(),
    rating: z.int().min(1).max(5),
    content: z.string(),
  })
  .strict();

export class CreateReviewRequest extends createZodDto(CreateReviewSchema) {}

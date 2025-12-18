import { createZodDto } from 'nestjs-zod';
import { CreateReviewSchema } from './create-review.request';
export const UpdateReviewSchema = CreateReviewSchema.partial();
export class UpdateReviewRequest extends createZodDto(UpdateReviewSchema) {}

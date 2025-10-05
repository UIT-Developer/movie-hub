import { createZodDto } from 'nestjs-zod';
import { CreateMovieSchema } from './create-movie.request';
export const UpdateMovieSchema = CreateMovieSchema.partial();
export class UpdateMovieRequest extends createZodDto(UpdateMovieSchema) {
  constructor() {
    super();
  }
}

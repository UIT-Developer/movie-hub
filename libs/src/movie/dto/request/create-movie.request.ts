import { z } from 'zod';
import { AgeRatingEnum, GenreEnum, LanguageOptionEnum } from '../../enum';
import { createZodDto } from 'nestjs-zod';

export const CreateMovieSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  posterUrl: z.string().min(1, 'Poster URL cannot be empty'),
  trailerUrl: z.string().min(1, 'Trailer URL cannot be empty'),
  duration: z.number().int().positive('Duration must be a positive integer'),
  releaseDate: z.coerce.date().nonoptional(),
  endDate: z.coerce.date().nullable().optional(),
  ageRating: z.enum(AgeRatingEnum),
  country: z.string().min(1, 'Country cannot be empty'),
  language: z.string().min(1, 'Language cannot be empty'),
  type: z.enum(LanguageOptionEnum),
  genres: z.array(z.enum(GenreEnum)).min(1, 'Select at least one genre'),
  director: z.string().min(1, 'Director cannot be empty'),
  cast: z.string().min(1, 'Cast cannot be empty'),
}).strict();

export class CreateMovieRequest extends createZodDto(CreateMovieSchema) {
  constructor() {
    super();
  }
}

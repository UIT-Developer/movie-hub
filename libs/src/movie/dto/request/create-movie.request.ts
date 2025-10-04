import { z } from 'zod';
import { AgeRatingEnum, LanguageOptionEnum } from '../../enum';
import { createZodDto } from 'nestjs-zod';

export const CreateMovieSchema = z
  .object({
    title: z.string().min(1, 'Title cannot be empty'),
    overview: z.string().min(1, 'Overview cannot be empty'),
    originalTitle: z.string().min(1, 'Original title cannot be empty'),
    posterUrl: z.string().min(1, 'Poster URL cannot be empty'),
    trailerUrl: z.string().min(1, 'Trailer URL cannot be empty'),
    backdropUrl: z.string().min(1, 'BackdropUrl URL cannot be empty'),
    runtime: z.number().int().positive('Duration must be a positive integer'),
    releaseDate: z.coerce.date().nonoptional(),
    ageRating: z.enum(AgeRatingEnum),
    originalLanguage: z.string().min(1, 'Original language cannot be empty'),
    spokenLanguages: z
      .array(z.string())
      .min(1, 'Spoken language cannot be empty'),
    languageType: z.enum(LanguageOptionEnum),
    productionCountry: z.string().min(1, 'Production Country cannot be empty'),
    director: z.string().min(1, 'Director cannot be empty'),
    cast: z.array(
      z.object({
        name: z.string(),
        character: z.string().optional(),
      })
    ),
    genreIds: z
      .array(z.uuid('Each genreId must be a valid UUID'))
      .min(1),
  })
  .strict();

export class CreateMovieRequest extends createZodDto(CreateMovieSchema) {
  // constructor() {
  //   super();
  // }
}

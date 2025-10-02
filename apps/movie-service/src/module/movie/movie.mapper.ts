import {
  AgeRatingEnum,
  CreateMovieRequest,
  GenreEnum,
  LanguageOptionEnum,
  MovieResponse,
} from '@movie-hub/libs';
import { Injectable } from '@nestjs/common';
import { Movie } from '../../../generated/prisma';

@Injectable()
export class MovieMapper {
  toMovieEntity(request: CreateMovieRequest): Movie {
    return {
      ...request,
      releaseDate: new Date(request.releaseDate),
      endDate: new Date(request.endDate),
      type: request.type,
      createdAt: undefined,
      updatedAt: undefined,
      id: undefined,
    };
  }

  toMovieResponse(entity: Movie): MovieResponse {
    return {
      ...entity,
      // id: entity.id,
      // title: entity.title,
      // description: entity.description,
      // posterUrl: entity.posterUrl,
      // trailerUrl: entity.trailerUrl,
      // duration: entity.duration,
      // releaseDate: entity.releaseDate,
      // endDate: entity.endDate,
      // country: entity.country,
      // language: entity.language,
      ageRating: entity.ageRating as AgeRatingEnum,
      type: entity.type as LanguageOptionEnum,
      genres: entity.genres  as GenreEnum[],
      // director: entity.director,
      // cast: entity.cast,
      // createdAt: entity.createdAt,
      // updatedAt: entity.updatedAt,
    };
  }
}

import {
  AgeRatingEnum,
  LanguageOptionEnum,
  MovieDetailResponse,
} from '@movie-hub/shared-types';

import { Injectable } from '@nestjs/common';
import { Genre, Movie, MovieGenre } from '../../../generated/prisma';

@Injectable()
export class MovieMapper {
  static toMovie(request) {
    const { genreIds, releaseDate, ...movieData } = request;
    const movieGenres = genreIds
      ? {
          create: genreIds.map((id: string) => ({
            genreId: id,
          })),
        }
      : undefined;

    return {
      ...movieData,
      releaseDate: releaseDate ? new Date(releaseDate) : undefined,
      movieGenres,
    };
  }

  static toResponse(
    movie: Movie & {averageRating: number, reviewCount: number} &{ movieGenres: (MovieGenre & { genre: Genre } )[] }
  ): MovieDetailResponse  {
    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.originalTitle,
      overview: movie.overview,
      posterUrl: movie.posterUrl,
      trailerUrl: movie.trailerUrl,
      backdropUrl: movie.backdropUrl,
      runtime: movie.runtime,
      releaseDate: movie.releaseDate,
      ageRating: movie.ageRating as AgeRatingEnum,
      originalLanguage: movie.originalLanguage,
      spokenLanguages: movie.spokenLanguages,
      languageType: movie.languageType as LanguageOptionEnum,
      productionCountry: movie.productionCountry,
      director: movie.director,
      cast: movie.cast,
      genre: movie.movieGenres.map((mg) => ({
        id: mg.genre.id,
        name: mg.genre.name,
      })),
      averageRating: movie.averageRating,
      reviewCount: movie.reviewCount,
    };
  }
}

import { GenreResponse } from './genre.response';
import { MovieSummary } from './movie-sumary.response';

export interface MovieDetailResponse extends MovieSummary {
  originalTitle: string;
  overview: string;
  trailerUrl: string;
  releaseDate: Date;
  originalLanguage: string;
  spokenLanguages: string[];
  productionCountry: string;
  director: string;
  cast: unknown;
  genre: GenreResponse[];
}

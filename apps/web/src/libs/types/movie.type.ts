import { ShowtimeSummaryResponse } from "./showtime.type";

export enum AgeRatingEnum {
  P = 'P', // Phù hợp mọi lứa tuổi
  k = 'K',
  T13 = 'T13', // Trên 13 tuổi
  T16 = 'T16', // Trên 16 tuổi
  T18 = 'T18', // Trên 18 tuổi
  C = 'C',
}

export enum LanguageOptionEnum {
  ORIGINAL = 'ORIGINAL', // Ngôn ngữ gốc
  SUBTITLE = 'SUBTITLE', // Phụ đề
  DUBBED = 'DUBBED', // Lồng tiếng / Thuyết minh
}


export interface MovieSummary {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  runtime: number;
  ageRating: AgeRatingEnum;
  productionCountry: string;
  languageType: LanguageOptionEnum;
}
export interface GenreResponse {
  id: string;
  name: string;
}


export interface MovieDetailResponse extends MovieSummary {
  originalTitle: string;
  overview: string;
  trailerUrl: string;
  releaseDate: Date;
  originalLanguage: string;
  spokenLanguages: string[];
  director: string;
  cast: unknown;
  genre: GenreResponse[];
}

export interface MovieWithShowtimeResponse extends MovieDetailResponse {
  showtimes: ShowtimeSummaryResponse[];
}


export interface CinemaShowtimeGroup {
  cinemaId: string;
  name: string;
  address: string;
  showtimes: ShowtimeSummaryResponse[];
}

export interface MovieWithCinemaAndShowtimeResponse
  extends MovieDetailResponse {
  cinemas: CinemaShowtimeGroup[];
}




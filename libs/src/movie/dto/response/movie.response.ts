import { AgeRatingEnum, GenreEnum, LanguageOptionEnum } from '../../enum';
export interface MovieResponse {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  duration: number; // phút
  releaseDate: Date;
  endDate?: Date | null; // có thể null nếu chưa xác định
  ageRating: AgeRatingEnum;
  country: string;
  language: string;
  type: LanguageOptionEnum;
  genres: GenreEnum[];
  director: string;
  cast: string;

  createdAt: Date;
  updatedAt: Date;
}

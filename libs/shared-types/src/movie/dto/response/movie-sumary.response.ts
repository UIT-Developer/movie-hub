import { AgeRatingEnum, LanguageOptionEnum } from '../../enum';
export interface MovieSummary {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  runtime: number;
  ageRating: AgeRatingEnum;
  productionCountry: string;
  languageType: LanguageOptionEnum;
  averageRating: number;
  reviewCount: number;
}

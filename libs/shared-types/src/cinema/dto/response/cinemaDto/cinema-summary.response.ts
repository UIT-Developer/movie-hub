import { CinemaStatusEnum } from '@movie-hub/shared-types/cinema/enum';

export interface CinemaSummaryResponse {
  id: string;
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  rating?: number;
  total_reviews: number;
  images?: string[];
  status: CinemaStatusEnum;
}

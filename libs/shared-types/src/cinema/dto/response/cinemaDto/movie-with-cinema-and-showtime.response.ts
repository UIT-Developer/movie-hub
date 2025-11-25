import { MovieDetailResponse } from '@movie-hub/shared-types/movie';
import { ShowtimeSummaryResponse } from '../showtimeDto/showtime-summary.response';

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

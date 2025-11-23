import { MovieDetailResponse } from '@movie-hub/shared-types/movie';
import { ShowtimeSummaryResponse } from '../showtimeDto/showtime-summary.response';

export interface MovieWithShowtimeResponse extends MovieDetailResponse {
  showtimes: ShowtimeSummaryResponse[];
}

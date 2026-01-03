import {
  FormatEnum,
  ShowtimeStatusEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface ShowtimeSummaryResponse {
  id?: string;
  cinemaId?: string;
  cinemaName?: string;
  movieId?: string;
  movieTitle?: string;
  hallId: string;
  hallName?: string;
  startTime: Date;
  endTime: Date;
  language?: string;
  subtitle?: string[];
  availableSeats?: number;
  totalSeats?: number;
  format: FormatEnum;
  status: ShowtimeStatusEnum;
}

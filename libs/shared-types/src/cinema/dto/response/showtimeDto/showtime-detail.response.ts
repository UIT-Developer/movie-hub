import {
  DayTypeEnum,
  FormatEnum,
  ShowtimeStatusEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface ShowtimeDetailResponse {
  id: string;
  movieId: string;
  movieReleaseId?: string;
  cinemaId: string;
  hallId: string;
  startTime: Date;
  endTime: Date;
  format: FormatEnum;
  language: string;
  subtitles: string[];
  availableSeats: number;
  totalSeats: number;
  status: ShowtimeStatusEnum;
  dayType: DayTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}

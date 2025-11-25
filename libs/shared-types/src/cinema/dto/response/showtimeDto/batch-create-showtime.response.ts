import { ShowtimeDetailResponse } from './showtime-detail.response';

export interface BatchCreateShowtimeResponse {
  createdCount: number;
  skippedCount: number;
  created: ShowtimeDetailResponse[];
  skipped: {
    start: Date;
    reason: string;
  }[];
}

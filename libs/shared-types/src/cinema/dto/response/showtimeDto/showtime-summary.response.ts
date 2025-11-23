import {
  FormatEnum,
  ShowtimeStatusEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface ShowtimeSummaryResponse {
  id?: string;
  hallId: string;
  startTime: Date;
  endTime: Date;
  format: FormatEnum;
  status: ShowtimeStatusEnum;
}

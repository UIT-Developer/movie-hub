import { FormatEnum, ShowtimeStatusEnum } from '../../enum';

export interface ShowtimeSummaryResponse {
  id?: string;
  hallId: string;
  startTime: Date;
  endTime: Date;
  // format: FormatEnum;
  // language?: string;
  // subtitles?: Array<string>;
  // basePrice: number;
  status: ShowtimeStatusEnum;
}

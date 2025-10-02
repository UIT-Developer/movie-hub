import { ScreenTypeEnum, ShowtimeStatusEnum } from '../../enum';

export interface ShowtimeSummaryResponse {
  id?: string;
  startTime?: string;
  endTime?: string;
  auditorium?: string;
  screenType?: ScreenTypeEnum;
  language?: string;
  subtitles?: Array<string>;
  price?: number;
  status?: ShowtimeStatusEnum;
}

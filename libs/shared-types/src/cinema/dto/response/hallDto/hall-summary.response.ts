import { HallStatusEnum } from '@movie-hub/shared-types/cinema/enum';

export interface HallSummaryResponse {
  id: string;
  name: string;
  type: string;
  capacity: number;
  rows: number;
  status: HallStatusEnum;
  screen_type?: string;
  sound_system?: string;
}

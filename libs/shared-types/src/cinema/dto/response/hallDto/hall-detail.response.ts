import { LayoutTypeEnum } from '@movie-hub/shared-types/cinema/enum';
import { PhysicalSeatRowDto } from '../..';
import { HallSummaryResponse } from './hall-summary.response';
// import { SeatResponse } from './seat.response';
// import { TicketPricingResponse } from './ticket-pricing.response';

export interface HallDetailResponse extends HallSummaryResponse {
  features: string[];
  cinema_id: string;
  layoutType: LayoutTypeEnum;
  created_at: Date;
  updated_at: Date;
  seatMap: PhysicalSeatRowDto[];
}

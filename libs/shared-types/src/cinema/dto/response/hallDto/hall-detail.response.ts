import { LayoutTypeEnum } from '@movie-hub/shared-types/cinema/enum';
import { PhysicalSeatRowDto } from '../..';
import { HallSummaryResponse } from './hall-summary.response';
// import { SeatResponse } from './seat.response';
// import { TicketPricingResponse } from './ticket-pricing.response';

export interface HallDetailResponse extends HallSummaryResponse {
  features: string[];
  cinemaId: string;
  layoutType: LayoutTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  seatMap: PhysicalSeatRowDto[];
}

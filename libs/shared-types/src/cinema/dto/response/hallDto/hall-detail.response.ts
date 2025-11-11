import { HallSummaryResponse } from './hall-summary.response';
// import { SeatResponse } from './seat.response';
// import { TicketPricingResponse } from './ticket-pricing.response';

export interface HallDetailResponse extends HallSummaryResponse {
  features: string[];
  layout_data?: any;
  cinema_id: string;
  created_at: Date;
  updated_at: Date;
  //   seats?: SeatResponse[];
  //   pricing?: TicketPricingResponse[];
}

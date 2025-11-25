// Booking reschedule request
export interface RescheduleBookingDto {
  newShowtimeId: string;
  reason?: string;
}

// Update booking request (before payment)
export interface UpdateBookingDto {
  seats?: Array<{
    seatId: string;
    ticketType: string;
  }>;
  concessions?: Array<{
    concessionId: string;
    quantity: number;
  }>;
  promotionCode?: string;
  usePoints?: number;
}

// Refund calculation response
export interface RefundCalculationDto {
  canRefund: boolean;
  refundAmount: number;
  refundPercentage: number;
  ticketAmount: number;
  concessionsAmount: number;
  reason?: string;
  deadline?: Date;
}

// Cancel booking with refund request
export interface CancelBookingWithRefundDto {
  reason?: string;
  requestRefund: boolean;
}

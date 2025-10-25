export interface SeatBookingDto {
  seatId: string;
  ticketType: string; // ADULT, CHILD, STUDENT, COUPLE
}

export interface ConcessionItemDto {
  concessionId: string;
  quantity: number;
}

export interface CustomerInfoDto {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CreateBookingDto {
  showtimeId: string;
  seats: SeatBookingDto[];
  concessions?: ConcessionItemDto[];
  promotionCode?: string;
  usePoints?: number;
  customerInfo?: CustomerInfoDto;
}

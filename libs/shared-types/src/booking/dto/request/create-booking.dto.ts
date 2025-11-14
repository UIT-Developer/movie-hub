/**
 * Seat booking DTO - OPTIONAL
 * Only used to specify ticket types for held seats
 * The actual seat selection comes from Redis (held seats)
 */
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

/**
 * Create Booking DTO
 * 
 * IMPORTANT: The actual seats to book come from Redis (what user held via WebSocket)
 * The 'seats' array is OPTIONAL and only used to specify ticket types (ADULT/CHILD/etc)
 * 
 * Flow:
 * 1. User holds seats A1, A2, A3 via WebSocket → Stored in Redis
 * 2. User creates booking with showtimeId
 * 3. Booking service reads Redis to get held seats (A1, A2, A3)
 * 4. If 'seats' provided, match ticket types to held seats
 * 5. If 'seats' not provided, default all to ADULT ticket type
 */
export interface CreateBookingDto {
  showtimeId: string;
  seats?: SeatBookingDto[]; // OPTIONAL: Only for specifying ticket types
  concessions?: ConcessionItemDto[];
  promotionCode?: string;
  usePoints?: number;
  customerInfo?: CustomerInfoDto;
}

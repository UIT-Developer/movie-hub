// shared/events/seat-events.ts
export interface SeatEvent {
  showtimeId: string;
  seatId: string;
  userId: string; // từ gateway
}

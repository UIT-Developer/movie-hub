import { TicketStatus } from '../../enum';

export interface TicketDetailDto {
  id: string;
  bookingId: string;
  seatId: string;
  ticketCode: string;
  qrCode?: string;
  barcodeData?: string;
  movieTitle: string;
  cinemaName: string;
  hallName: string;
  seatInfo: string; // e.g., "A-5"
  startTime: Date;
  format: string;
  language: string;
  status: TicketStatus;
  usedAt?: Date;
  createdAt: Date;
}

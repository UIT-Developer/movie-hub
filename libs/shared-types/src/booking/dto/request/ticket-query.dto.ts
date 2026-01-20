import { TicketStatus } from '../../enum';
import { PaginationQuery } from '../../../common';

/**
 * Query parameters for admin to find all tickets
 */
export interface AdminFindAllTicketsDto extends PaginationQuery {
  bookingId?: string;
  showtimeId?: string;
  status?: TicketStatus;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Query parameters for finding tickets by showtime
 */
export interface FindTicketsByShowtimeDto {
  showtimeId: string;
  status?: TicketStatus;
}

/**
 * Query parameters for finding tickets by booking
 */
export interface FindTicketsByBookingDto {
  bookingId: string;
}

/**
 * Request to bulk validate tickets
 */
export interface BulkValidateTicketsDto {
  ticketIds: string[];
  cinemaId?: string;
}

/**
 * Request to cancel a ticket
 */
export interface CancelTicketDto {
  ticketId: string;
  reason?: string;
}

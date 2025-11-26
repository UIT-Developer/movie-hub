import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketService } from './ticket.service';
import {
  AdminFindAllTicketsDto,
  FindTicketsByShowtimeDto,
  FindTicketsByBookingDto,
  BulkValidateTicketsDto,
  CancelTicketDto,
} from '@movie-hub/shared-types';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @MessagePattern('ticket.findOne')
  async findOne(@Payload() payload: { id: string }) {
    return this.ticketService.findOne(payload.id);
  }

  @MessagePattern('ticket.findByCode')
  async findByCode(@Payload() payload: { ticketCode: string }) {
    return this.ticketService.findByCode(payload.ticketCode);
  }

  @MessagePattern('ticket.validate')
  async validate(
    @Payload()
    payload: {
      ticketId: string;
      validationCode?: string;
      cinemaId?: string;
    }
  ) {
    return this.ticketService.validateTicket(
      payload.ticketId,
      payload.validationCode,
      payload.cinemaId
    );
  }

  @MessagePattern('ticket.use')
  async useTicket(@Payload() payload: { ticketId: string }) {
    return this.ticketService.useTicket(payload.ticketId);
  }

  @MessagePattern('ticket.generateQR')
  async generateQR(@Payload() payload: { ticketId: string }) {
    return this.ticketService.generateQRCode(payload.ticketId);
  }

  // ==================== ADMIN OPERATIONS ====================

  @MessagePattern('ticket.admin.findAll')
  async adminFindAll(
    @Payload() payload: { filters: AdminFindAllTicketsDto }
  ) {
    return this.ticketService.adminFindAllTickets(payload.filters);
  }

  @MessagePattern('ticket.findByShowtime')
  async findByShowtime(
    @Payload() payload: FindTicketsByShowtimeDto
  ) {
    return this.ticketService.findTicketsByShowtime(
      payload.showtimeId,
      payload.status
    );
  }

  @MessagePattern('ticket.findByBooking')
  async findByBooking(
    @Payload() payload: FindTicketsByBookingDto
  ) {
    return this.ticketService.findTicketsByBooking(payload.bookingId);
  }

  @MessagePattern('ticket.bulkValidate')
  async bulkValidate(
    @Payload() payload: BulkValidateTicketsDto
  ) {
    return this.ticketService.bulkValidateTickets(
      payload.ticketIds,
      payload.cinemaId
    );
  }

  @MessagePattern('ticket.cancel')
  async cancel(@Payload() payload: CancelTicketDto) {
    return this.ticketService.cancelTicket(payload.ticketId, payload.reason);
  }
}

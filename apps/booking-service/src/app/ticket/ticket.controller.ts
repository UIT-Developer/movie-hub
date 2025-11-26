import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketService } from './ticket.service';
import {
  TicketDetailDto,
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
  async findOne(@Payload() data: { id: string }): Promise<TicketDetailDto> {
    return this.ticketService.findOne(data.id);
  }

  @MessagePattern('ticket.findByCode')
  async findByCode(
    @Payload() data: { ticketCode: string }
  ): Promise<TicketDetailDto> {
    return this.ticketService.findByCode(data.ticketCode);
  }

  @MessagePattern('ticket.validate')
  async validate(
    @Payload()
    data: {
      ticketId: string;
      validationCode?: string;
      cinemaId?: string;
    }
  ): Promise<{ valid: boolean; message: string; ticket?: TicketDetailDto }> {
    return this.ticketService.validateTicket(
      data.ticketId,
      data.validationCode,
      data.cinemaId
    );
  }

  @MessagePattern('ticket.use')
  async useTicket(
    @Payload() data: { ticketId: string }
  ): Promise<TicketDetailDto> {
    return this.ticketService.useTicket(data.ticketId);
  }

  @MessagePattern('ticket.generateQR')
  async generateQR(@Payload() data: { ticketId: string }): Promise<string> {
    return this.ticketService.generateQRCode(data.ticketId);
  }

  // ==================== ADMIN OPERATIONS ====================

  @MessagePattern('ticket.admin.findAll')
  async adminFindAll(
    @Payload() filters: AdminFindAllTicketsDto
  ): Promise<{ data: TicketDetailDto[]; total: number }> {
    return this.ticketService.adminFindAllTickets(filters);
  }

  @MessagePattern('ticket.findByShowtime')
  async findByShowtime(
    @Payload() data: FindTicketsByShowtimeDto
  ): Promise<TicketDetailDto[]> {
    return this.ticketService.findTicketsByShowtime(
      data.showtimeId,
      data.status
    );
  }

  @MessagePattern('ticket.findByBooking')
  async findByBooking(
    @Payload() data: FindTicketsByBookingDto
  ): Promise<TicketDetailDto[]> {
    return this.ticketService.findTicketsByBooking(data.bookingId);
  }

  @MessagePattern('ticket.bulkValidate')
  async bulkValidate(
    @Payload() data: BulkValidateTicketsDto
  ): Promise<{
    valid: string[];
    invalid: { ticketId: string; reason: string }[];
  }> {
    return this.ticketService.bulkValidateTickets(
      data.ticketIds,
      data.cinemaId
    );
  }

  @MessagePattern('ticket.cancel')
  async cancel(@Payload() data: CancelTicketDto): Promise<TicketDetailDto> {
    return this.ticketService.cancelTicket(data.ticketId, data.reason);
  }
}

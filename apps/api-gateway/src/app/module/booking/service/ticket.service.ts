import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  SERVICE_NAME,
  TicketMessage,
  AdminFindAllTicketsDto,
  BulkValidateTicketsDto,
  TicketDetailDto,
} from '@movie-hub/shared-types';

@Injectable()
export class TicketService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findOne(id: string) {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.FIND_ONE, { id })
    );
  }

  async findByCode(ticketCode: string) {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.FIND_BY_CODE, { ticketCode })
    );
  }

  async validateTicket(
    ticketId: string,
    validationCode?: string,
    cinemaId?: string
  ) {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.VALIDATE, {
        ticketId,
        validationCode,
        cinemaId,
      })
    );
  }

  async useTicket(ticketId: string) {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.USE, { ticketId })
    );
  }

  async generateQRCode(ticketId: string) {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.GENERATE_QR, { ticketId })
    );
  }

  // ==================== ADMIN OPERATIONS ====================

  async adminFindAll(
    filters: AdminFindAllTicketsDto
  ): Promise<{ data: TicketDetailDto[]; total: number }> {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.ADMIN_FIND_ALL, filters)
    );
  }

  async findByShowtime(showtimeId: string): Promise<TicketDetailDto[]> {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.FIND_BY_SHOWTIME, { showtimeId })
    );
  }

  async findByBooking(bookingId: string): Promise<TicketDetailDto[]> {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.FIND_BY_BOOKING, { bookingId })
    );
  }

  async bulkValidate(
    bulkValidateDto: BulkValidateTicketsDto
  ): Promise<{ valid: string[]; invalid: Array<{ ticketId: string; reason: string }> }> {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.BULK_VALIDATE, bulkValidateDto)
    );
  }

  async cancelTicket(ticketId: string, reason?: string): Promise<TicketDetailDto> {
    return firstValueFrom(
      this.bookingClient.send(TicketMessage.CANCEL, { ticketId, reason })
    );
  }
}

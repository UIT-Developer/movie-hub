import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  SERVICE_NAME,
  TicketMessage,
  AdminFindAllTicketsDto,
  BulkValidateTicketsDto,
} from '@movie-hub/shared-types';

@Injectable()
export class TicketService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.FIND_ONE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByCode(ticketCode: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.FIND_BY_CODE, { ticketCode })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async validateTicket(
    ticketId: string,
    validationCode?: string,
    cinemaId?: string
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.VALIDATE, {
          ticketId,
          validationCode,
          cinemaId,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async useTicket(ticketId: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.USE, { ticketId })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async generateQRCode(ticketId: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.GENERATE_QR, { ticketId })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // ==================== ADMIN OPERATIONS ====================

  async adminFindAll(filters: AdminFindAllTicketsDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.ADMIN_FIND_ALL, { filters })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByShowtime(showtimeId: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.FIND_BY_SHOWTIME, { showtimeId })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByBooking(bookingId: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.FIND_BY_BOOKING, { bookingId })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async bulkValidate(bulkValidateDto: BulkValidateTicketsDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.BULK_VALIDATE, bulkValidateDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async cancelTicket(ticketId: string, reason?: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(TicketMessage.CANCEL, { ticketId, reason })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

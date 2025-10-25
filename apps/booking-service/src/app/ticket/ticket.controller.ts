import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketService } from './ticket.service';
import { TicketDetailDto } from '@movie-hub/shared-types';

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
}

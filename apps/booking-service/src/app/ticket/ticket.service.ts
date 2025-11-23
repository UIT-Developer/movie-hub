import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TicketDetailDto, TicketStatus } from '@movie-hub/shared-types';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketDetailDto> {
    const ticket = await this.prisma.tickets.findUnique({
      where: { id },
      include: {
        booking: true,
      },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return this.mapToDto(ticket);
  }

  async findByCode(ticketCode: string): Promise<TicketDetailDto> {
    const ticket = await this.prisma.tickets.findUnique({
      where: { ticket_code: ticketCode },
      include: {
        booking: true,
      },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return this.mapToDto(ticket);
  }

  async validateTicket(
    ticketId: string,
    validationCode?: string,
    cinemaId?: string
  ): Promise<{ valid: boolean; message: string; ticket?: TicketDetailDto }> {
    const ticket = await this.prisma.tickets.findUnique({
      where: { id: ticketId },
      include: {
        booking: true,
      },
    });

    if (!ticket) {
      return {
        valid: false,
        message: 'Ticket not found',
      };
    }

    if (ticket.status !== TicketStatus.VALID) {
      return {
        valid: false,
        message: `Ticket is ${ticket.status.toLowerCase()}`,
      };
    }

    // Additional validations can be added here
    // e.g., check cinema_id, showtime, etc.

    return {
      valid: true,
      message: 'Ticket is valid',
      ticket: this.mapToDto(ticket),
    };
  }

  async useTicket(ticketId: string): Promise<TicketDetailDto> {
    const ticket = await this.prisma.tickets.update({
      where: { id: ticketId },
      data: {
        status: TicketStatus.USED,
        used_at: new Date(),
      },
      include: {
        booking: true,
      },
    });

    return this.mapToDto(ticket);
  }

  async generateQRCode(ticketId: string): Promise<string> {
    // In a real implementation, this would generate a QR code
    // For now, return a placeholder
    const ticket = await this.prisma.tickets.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Generate QR code data (would use a library like qrcode in real implementation)
    const qrData = `TICKET:${ticket.ticket_code}:${ticketId}`;
    
    // Update ticket with QR code
    await this.prisma.tickets.update({
      where: { id: ticketId },
      data: { qr_code: qrData },
    });

    return qrData;
  }

  private mapToDto(ticket: any): TicketDetailDto {
    return {
      id: ticket.id,
      bookingId: ticket.booking_id,
      seatId: ticket.seat_id,
      ticketCode: ticket.ticket_code,
      qrCode: ticket.qr_code,
      barcodeData: ticket.barcode,
      movieTitle: 'Movie Title', // Should fetch from showtime
      cinemaName: 'Cinema Name',
      hallName: 'Hall Name',
      seatInfo: 'A-5', // Should fetch from seat
      startTime: new Date(),
      format: '2D',
      language: 'Vietnamese',
      status: ticket.status as TicketStatus,
      usedAt: ticket.used_at,
      createdAt: ticket.created_at,
    };
  }
}

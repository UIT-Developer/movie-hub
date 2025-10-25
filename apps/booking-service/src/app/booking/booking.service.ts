import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingStatus,
  PaymentStatus,
} from '@movie-hub/shared-types';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(
    userId: string,
    dto: CreateBookingDto
  ): Promise<BookingDetailDto> {
    // Generate unique booking code
    const bookingCode = this.generateBookingCode();

    // Calculate pricing
    const subtotal = await this.calculateSubtotal(dto);
    let discount = 0;
    let pointsDiscount = 0;

    // Apply promotion if provided
    if (dto.promotionCode) {
      discount = await this.calculateDiscount(dto.promotionCode, subtotal);
    }

    // Apply points if provided
    if (dto.usePoints) {
      pointsDiscount = this.calculatePointsDiscount(dto.usePoints);
    }

    const finalAmount = subtotal - discount - pointsDiscount;

    // Create booking with tickets and concessions
    const booking = await this.prisma.bookings.create({
      data: {
        booking_code: bookingCode,
        user_id: userId,
        showtime_id: dto.showtimeId,
        customer_name: dto.customerInfo?.name || '',
        customer_email: dto.customerInfo?.email || '',
        customer_phone: dto.customerInfo?.phone,
        subtotal,
        discount,
        points_used: dto.usePoints || 0,
        points_discount: pointsDiscount,
        final_amount: finalAmount,
        promotion_code: dto.promotionCode,
        status: BookingStatus.PENDING,
        payment_status: PaymentStatus.PENDING,
        expires_at: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        tickets: {
          create: dto.seats.map((seat) => ({
            seat_id: seat.seatId,
            ticket_code: this.generateTicketCode(),
            ticket_type: seat.ticketType,
            price: 100000, // Base price, should be calculated
          })),
        },
        booking_concessions: dto.concessions
          ? {
              create: dto.concessions.map((item) => ({
                concession_id: item.concessionId,
                quantity: item.quantity,
                unit_price: 50000, // Should fetch from DB
                total_price: 50000 * item.quantity,
              })),
            }
          : undefined,
      },
      include: {
        tickets: true,
        booking_concessions: {
          include: {
            concession: true,
          },
        },
      },
    });

    return this.mapToDetailDto(booking);
  }

  async findAllByUser(
    userId: string,
    status?: BookingStatus,
    page = 1,
    limit = 20
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    const where: any = { user_id: userId };
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      this.prisma.bookings.findMany({
        where,
        include: {
          tickets: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.bookings.count({ where }),
    ]);

    return {
      data: bookings.map((b) => this.mapToSummaryDto(b)),
      total,
    };
  }

  async findOne(id: string, userId: string): Promise<BookingDetailDto> {
    const booking = await this.prisma.bookings.findFirst({
      where: { id, user_id: userId },
      include: {
        tickets: true,
        booking_concessions: {
          include: {
            concession: true,
          },
        },
      },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    return this.mapToDetailDto(booking);
  }

  async cancelBooking(
    id: string,
    userId: string,
    reason?: string
  ): Promise<BookingDetailDto> {
    const booking = await this.prisma.bookings.findFirst({
      where: { id, user_id: userId },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (
      ![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(
        booking.status as BookingStatus
      )
    ) {
      throw new Error('Cannot cancel this booking');
    }

    const updated = await this.prisma.bookings.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
        cancelled_at: new Date(),
        cancellation_reason: reason,
      },
      include: {
        tickets: true,
        booking_concessions: {
          include: {
            concession: true,
          },
        },
      },
    });

    return this.mapToDetailDto(updated);
  }

  async holdSeats(bookingId: string): Promise<{ expiresAt: Date; holdTimeSeconds: number }> {
    const holdTimeSeconds = 300; // 5 minutes
    const expiresAt = new Date(Date.now() + holdTimeSeconds * 1000);

    await this.prisma.bookings.update({
      where: { id: bookingId },
      data: { expires_at: expiresAt },
    });

    return { expiresAt, holdTimeSeconds };
  }

  // Helper methods
  private generateBookingCode(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BK${timestamp}${random}`;
  }

  private generateTicketCode(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TK${timestamp}${random}`;
  }

  private async calculateSubtotal(dto: CreateBookingDto): Promise<number> {
    // Simplified calculation - should fetch actual prices from DB
    const ticketTotal = dto.seats.length * 100000;
    const concessionTotal = (dto.concessions || []).reduce(
      (sum, item) => sum + item.quantity * 50000,
      0
    );
    return ticketTotal + concessionTotal;
  }

  private async calculateDiscount(
    promotionCode: string,
    subtotal: number
  ): Promise<number> {
    // Simplified - should validate and calculate actual discount
    return subtotal * 0.1; // 10% discount
  }

  private calculatePointsDiscount(points: number): number {
    // 1 point = 1000 VND
    return points * 1000;
  }

  private mapToSummaryDto(booking: any): BookingSummaryDto {
    return {
      id: booking.id,
      bookingCode: booking.booking_code,
      showtimeId: booking.showtime_id,
      movieTitle: 'Movie Title', // Should fetch from showtime
      cinemaName: 'Cinema Name',
      hallName: 'Hall Name',
      startTime: new Date(),
      seatCount: booking.tickets?.length || 0,
      totalAmount: Number(booking.final_amount),
      status: booking.status as BookingStatus,
      createdAt: booking.created_at,
    };
  }

  private mapToDetailDto(booking: any): BookingDetailDto {
    return {
      ...this.mapToSummaryDto(booking),
      userId: booking.user_id,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone,
      seats: (booking.tickets || []).map((t: any) => ({
        seatId: t.seat_id,
        row: 'A', // Should fetch from seat
        number: 1,
        seatType: 'STANDARD',
        ticketType: t.ticket_type,
        price: Number(t.price),
      })),
      concessions: (booking.booking_concessions || []).map((bc: any) => ({
        concessionId: bc.concession_id,
        name: bc.concession?.name || '',
        quantity: bc.quantity,
        unitPrice: Number(bc.unit_price),
        totalPrice: Number(bc.total_price),
      })),
      subtotal: Number(booking.subtotal),
      discount: Number(booking.discount),
      pointsUsed: booking.points_used,
      pointsDiscount: Number(booking.points_discount),
      finalAmount: Number(booking.final_amount),
      promotionCode: booking.promotion_code,
      paymentStatus: booking.payment_status as PaymentStatus,
      expiresAt: booking.expires_at,
      cancelledAt: booking.cancelled_at,
      cancellationReason: booking.cancellation_reason,
      updatedAt: booking.updated_at,
    };
  }
}

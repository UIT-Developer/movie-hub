import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import {
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingStatus,
  PaymentStatus,
  CinemaMessage,
} from '@movie-hub/shared-types';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    @Inject('CINEMA_SERVICE') private cinemaClient: ClientProxy
  ) {}

  async createBooking(
    userId: string,
    dto: CreateBookingDto
  ): Promise<BookingDetailDto> {
    // ✅ STEP 1: Get seats currently held by user from Cinema Service (Redis)
    const heldSeatIds = await this.getSeatsHeldByUser(dto.showtimeId, userId);

    if (heldSeatIds.length === 0) {
      throw new BadRequestException(
        'No seats are currently held by this user. Please hold seats via WebSocket first.'
      );
    }

    // ✅ STEP 2: Get showtime details with seat information from Cinema Service
    const showtimeData = await this.getShowtimeDetails(dto.showtimeId, userId);
    
    if (!showtimeData) {
      throw new BadRequestException('Showtime not found');
    }

    // ✅ STEP 3: Validate that all held seats match the booking request (if seats provided)
    // Note: We prioritize Redis held seats over dto.seats
    // Showtime data may provide seats in different shapes (e.g. `seats` or `seat_map` rows).
    const seatsArray: any[] = showtimeData.seats
      ? showtimeData.seats
      : (showtimeData.seat_map
          ? // flatten seat_map -> seats
            showtimeData.seat_map.flatMap((row: any) =>
              (row.seats || []).map((s: any) => ({ ...s, type: s.seatType || s.type }))
            )
          : []);

    if (!Array.isArray(seatsArray) || seatsArray.length === 0) {
      throw new BadRequestException('Showtime seat information is not available');
    }

    const seatMap = new Map(seatsArray.map((s) => [s.id, s]));

    // Get seat details for held seats
    const heldSeatsDetails = heldSeatIds
      .map((seatId) => seatMap.get(seatId))
      .filter((seat) => seat !== undefined);

    if (heldSeatsDetails.length !== heldSeatIds.length) {
      throw new BadRequestException(
        'Some held seats are not available in this showtime'
      );
    }

    // ✅ STEP 4: Calculate pricing based on actual held seats
    const ticketPrices = await this.calculateTicketPrices(
      heldSeatsDetails,
      dto.seats,
      showtimeData
    );
    
    const ticketsSubtotal = ticketPrices.reduce((sum, t) => sum + t.price, 0);

    // ✅ STEP 5: Calculate concession prices
    let concessionsSubtotal = 0;
    const concessionDetails: Array<{
      concessionId: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }> = [];

    if (dto.concessions && dto.concessions.length > 0) {
      const concessionData = await this.getConcessionDetails(
        dto.concessions.map((c) => c.concessionId)
      );

      for (const item of dto.concessions) {
        const concession = concessionData.find((c) => c.id === item.concessionId);
        if (!concession) {
          throw new BadRequestException(
            `Concession ${item.concessionId} not found`
          );
        }
        if (!concession.available) {
          throw new BadRequestException(
            `Concession ${concession.name} is not available`
          );
        }

        const totalPrice = Number(concession.price) * item.quantity;
        concessionsSubtotal += totalPrice;
        
        concessionDetails.push({
          concessionId: concession.id,
          name: concession.name,
          quantity: item.quantity,
          unitPrice: Number(concession.price),
          totalPrice,
        });
      }
    }

    const subtotal = ticketsSubtotal + concessionsSubtotal;

    // ✅ STEP 6: Apply promotions and loyalty points
    let discount = 0;
    let pointsDiscount = 0;

    if (dto.promotionCode) {
      discount = await this.calculatePromotion(dto.promotionCode, subtotal, userId);
    }

    if (dto.usePoints && dto.usePoints > 0) {
      pointsDiscount = await this.calculatePointsDiscount(dto.usePoints, userId);
    }

    const finalAmount = Math.max(0, subtotal - discount - pointsDiscount);

    // ✅ STEP 7: Generate unique codes
    const bookingCode = this.generateBookingCode();

    // ✅ STEP 8: Create booking with all tickets and concessions in a transaction
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
        expires_at: new Date(Date.now() + 10 * 60 * 1000), // 5 minutes to complete payment
        tickets: {
          create: ticketPrices.map((ticket) => ({
            seat_id: ticket.seatId,
            ticket_code: this.generateTicketCode(),
            ticket_type: ticket.ticketType,
            price: ticket.price,
          })),
        },
        booking_concessions: concessionDetails.length > 0
          ? {
              create: concessionDetails.map((item) => ({
                concession_id: item.concessionId,
                quantity: item.quantity,
                unit_price: item.unitPrice,
                total_price: item.totalPrice,
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

    // ✅ STEP 9: Return enriched booking details
    return this.mapToDetailDto(booking, showtimeData);
  }

  async findAllByUser(
    userId: string,
    status?: BookingStatus,
    page = 1,
    limit = 10
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    const skip = (page - 1) * limit;

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
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.bookings.count({ where }),
    ]);

    // Fetch showtime data for all bookings
    const showtimePromises = bookings.map(async (booking) => {
      try {
        return await this.getShowtimeDetails(booking.showtime_id, userId);
      } catch {
        return null;
      }
    });

    const showtimeDataArray = await Promise.all(showtimePromises);

    return {
      data: bookings.map((b, index) => this.mapToSummaryDto(b, showtimeDataArray[index])),
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
      throw new BadRequestException('Booking not found');
    }

    // Fetch showtime data for enrichment
    let showtimeData;
    try {
      showtimeData = await this.getShowtimeDetails(booking.showtime_id, userId);
    } catch {
      // If showtime data not available, continue without it
      showtimeData = null;
    }

    return this.mapToDetailDto(booking, showtimeData);
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
      throw new BadRequestException('Booking not found');
    }

    if (
      ![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(
        booking.status as BookingStatus
      )
    ) {
      throw new BadRequestException('Cannot cancel this booking');
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

    // Fetch showtime data for enrichment
    let showtimeData;
    try {
      showtimeData = await this.getShowtimeDetails(updated.showtime_id, userId);
    } catch {
      showtimeData = null;
    }

    return this.mapToDetailDto(updated, showtimeData);
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

  /**
   * Get showtime details with seat information from Cinema Service
   */
  private async getShowtimeDetails(showtimeId: string, userId?: string) {
    try {
      const showtimeData = await firstValueFrom(
        this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SHOWTIME_SEATS, {
          showtimeId,
          userId,
        })
      );
      return showtimeData as any; // ShowtimeSeatResponse type
    } catch (error) {
      throw new BadRequestException(
        'Failed to get showtime details from cinema service'
      );
    }
  }

  /**
   * Get concession details from database
   */
  private async getConcessionDetails(concessionIds: string[]) {
    return this.prisma.concessions.findMany({
      where: {
        id: { in: concessionIds },
      },
    });
  }

  /**
   * Calculate ticket prices based on seat types and ticket types
   */
  private async calculateTicketPrices(
    heldSeatsDetails: any[],
    requestedSeats: { seatId: string; ticketType: string }[],
    showtimeData: any
  ): Promise<Array<{ seatId: string; ticketType: string; price: number }>> {
    const ticketPrices: Array<{ seatId: string; ticketType: string; price: number }> = [];

    // Create a map of requested ticket types by seat ID
    const ticketTypeMap = new Map(
      requestedSeats?.map((s) => [s.seatId, s.ticketType]) || []
    );

    for (const seat of heldSeatsDetails) {
      // Get ticket type from request, default to 'ADULT'
      const ticketType = ticketTypeMap.get(seat.id) || 'ADULT';
      
      // Find price from showtime pricing data
      const priceInfo = showtimeData.ticketPricing?.find(
        (p: any) =>
          p.seatType === seat.type &&
          p.ticketType === ticketType
      );

      const price = priceInfo ? Number(priceInfo.price) : 100000; // Default price

      ticketPrices.push({
        seatId: seat.id,
        ticketType,
        price,
      });
    }

    return ticketPrices;
  }

  /**
   * Calculate promotion discount
   */
  private async calculatePromotion(
    promotionCode: string,
    subtotal: number,
    userId: string
  ): Promise<number> {
    const promotion = await this.prisma.promotions.findFirst({
      where: {
        code: promotionCode,
        active: true,
        valid_from: { lte: new Date() },
        valid_to: { gte: new Date() },
      },
    });

    if (!promotion) {
      throw new BadRequestException('Invalid or expired promotion code');
    }

    // Check usage limits
    if (promotion.usage_limit && promotion.current_usage >= promotion.usage_limit) {
      throw new BadRequestException('Promotion code usage limit reached');
    }

    // Check minimum purchase
    if (promotion.min_purchase && subtotal < Number(promotion.min_purchase)) {
      throw new BadRequestException(
        `Minimum purchase of ${promotion.min_purchase} required for this promotion`
      );
    }

    let discount = 0;

    if (promotion.type === 'PERCENTAGE') {
      discount = (subtotal * Number(promotion.value)) / 100;
      if (promotion.max_discount) {
        discount = Math.min(discount, Number(promotion.max_discount));
      }
    } else if (promotion.type === 'FIXED_AMOUNT') {
      discount = Number(promotion.value);
    }

    return Math.min(discount, subtotal);
  }

  /**
   * Calculate loyalty points discount
   */
  private async calculatePointsDiscount(
    points: number,
    userId: string
  ): Promise<number> {
    // Check if user has enough points
    const loyaltyAccount = await this.prisma.loyaltyAccounts.findUnique({
      where: { user_id: userId },
    });

    if (!loyaltyAccount) {
      throw new BadRequestException('User does not have a loyalty account');
    }

    if (loyaltyAccount.current_points < points) {
      throw new BadRequestException(
        `Insufficient points. Available: ${loyaltyAccount.current_points}, Requested: ${points}`
      );
    }

    // 1 point = 1000 VND
    return points * 1000;
  }

  private mapToSummaryDto(booking: any, showtimeData?: any): BookingSummaryDto {
    return {
      id: booking.id,
      bookingCode: booking.booking_code,
      showtimeId: booking.showtime_id,
      movieTitle: showtimeData?.showtime?.movie?.title || 'Movie Title',
      cinemaName: showtimeData?.showtime?.cinema?.name || 'Cinema Name',
      hallName: showtimeData?.showtime?.hall?.name || 'Hall Name',
      startTime: showtimeData?.showtime?.startTime || new Date(),
      seatCount: booking.tickets?.length || 0,
      totalAmount: Number(booking.final_amount),
      status: booking.status as BookingStatus,
      createdAt: booking.created_at,
    };
  }

  private mapToDetailDto(booking: any, showtimeData?: any): BookingDetailDto {
    // Create a map of seat details from showtime data
    const seatsArray: any[] = showtimeData?.seats
      ? showtimeData.seats
      : showtimeData?.seat_map
      ? showtimeData.seat_map.flatMap((row: any) => (row.seats || []).map((s: any) => ({ ...s, type: s.seatType || s.type })))
      : [];

    const seatMap = new Map((seatsArray || []).map((s: any) => [s.id, s]));

    return {
      ...this.mapToSummaryDto(booking, showtimeData),
      userId: booking.user_id,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone,
      seats: (booking.tickets || []).map((t: any) => {
        const seatDetail = seatMap.get(t.seat_id);
        return {
          seatId: t.seat_id,
          row: seatDetail?.row || 'A',
          number: seatDetail?.number || 1,
          seatType: seatDetail?.type || 'STANDARD',
          ticketType: t.ticket_type,
          price: Number(t.price),
        };
      }),
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

  /**
   * ✅ Get ghế đang được giữ bởi user từ cinema service
   * Trả về danh sách seat IDs đang được user giữ
   */
  private async getSeatsHeldByUser(
    showtimeId: string,
    userId: string
  ): Promise<string[]> {
    try {
      const heldSeats = await firstValueFrom(
        this.cinemaClient.send(
          CinemaMessage.SHOWTIME.GET_SEATS_HELD_BY_USER,
          { showtimeId, userId }
        )
      );
      return heldSeats as string[];
    } catch {
      throw new BadRequestException(
        'Failed to get held seats from cinema service. Please try again.'
      );
    }
  }
}

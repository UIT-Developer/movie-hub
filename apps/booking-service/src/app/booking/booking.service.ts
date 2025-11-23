import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import {
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingCalculationDto,
  BookingStatus,
  PaymentStatus,
  CinemaMessage,
  ShowtimeSeatResponse,
  SeatItemDto,
  SeatRowDto,
  SeatTypeEnum,
  FormatEnum,
  SeatPricingDto,
  SeatStatusEnum,
  ReservationStatusEnum,
} from '@movie-hub/shared-types';
import { Prisma, Concessions, Tickets } from '../../../generated/prisma';

// Type for booking with full relations using Prisma's generated types
type BookingWithRelations = Prisma.BookingsGetPayload<{
  include: {
    tickets: true;
    booking_concessions: {
      include: {
        concession: true;
      };
    };
  };
}>;

// Type for seat detail from showtime response
interface SeatDetail extends SeatItemDto {
  row: string;
  type: SeatTypeEnum;
}

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
    // Returns SeatPricingDto[] with seat details and pricing
    const heldSeatsWithPricing = await this.getSeatsHeldByUser(dto.showtimeId, userId);

    if (heldSeatsWithPricing.length === 0) {
      throw new BadRequestException(
        'No seats are currently held by this user. Please hold seats via WebSocket first.'
      );
    }

    // ✅ STEP 1.5: Check if any of the held seats are already booked in the database
    const seatIds = heldSeatsWithPricing.map((seat) => seat.id);
    const existingTickets = await this.prisma.tickets.findMany({
      where: {
        seat_id: { in: seatIds },
        booking: {
          showtime_id: dto.showtimeId,
          status: {
            in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
          },
        },
      },
      include: {
        booking: {
          select: {
            id: true,
            showtime_id: true,
            status: true,
            user_id: true,
          },
        },
      },
    });

    if (existingTickets.length > 0) {
      const bookedSeatIds = existingTickets.map((t) => t.seat_id);
      throw new BadRequestException(
        `Cannot create booking. The following seats are already booked: ${bookedSeatIds.join(', ')}`
      );
    }

    // ✅ STEP 2: Get showtime details with seat information from Cinema Service
    const showtimeData = await this.getShowtimeDetails(dto.showtimeId, userId);
    
    if (!showtimeData) {
      throw new BadRequestException('Showtime not found');
    }

    // ✅ STEP 3: Build seat details from held seats with pricing
    // Convert SeatPricingDto to SeatDetail format
    const heldSeatsDetails: SeatDetail[] = heldSeatsWithPricing.map((seat) => ({
      id: seat.id,
      row: seat.rowLetter,
      number: seat.seatNumber,
      type: seat.type,
      seatType: seat.type,
      seatStatus: SeatStatusEnum.ACTIVE,
      reservationStatus: ReservationStatusEnum.HELD,
      isHeldByCurrentUser: true,
    }));

    // ✅ STEP 4: Calculate pricing based on actual held seats
    const ticketPrices = await this.calculateTicketPrices(
      heldSeatsDetails,
      heldSeatsWithPricing
    );

    // Create seat type map for ticket creation
    const seatTypeMap = new Map(
      heldSeatsDetails.map((s) => [s.id, s.type])
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
      discount = await this.calculatePromotion(dto.promotionCode, subtotal);
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
        expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes to complete payment
        tickets: {
          create: ticketPrices.map((ticket) => ({
            seat_id: ticket.seatId,
            ticket_code: this.generateTicketCode(),
            ticket_type: seatTypeMap.get(ticket.seatId) || 'STANDARD', // Use seat type as ticket type
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

    const where: Prisma.BookingsWhereInput = { user_id: userId };
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      this.prisma.bookings.findMany({
        where,
        include: {
          tickets: true,
          booking_concessions: {
            include: {
              concession: true,
            },
          },
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
  private async getShowtimeDetails(
    showtimeId: string,
    userId?: string
  ): Promise<ShowtimeSeatResponse> {
    try {
      const showtimeData = await firstValueFrom(
        this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SHOWTIME_SEATS, {
          showtimeId,
          userId,
        })
      );
      return showtimeData as ShowtimeSeatResponse;
    } catch {
      throw new BadRequestException(
        'Failed to get showtime details from cinema service'
      );
    }
  }

  /**
   * Get concession details from database
   */
  private async getConcessionDetails(
    concessionIds: string[]
  ): Promise<Concessions[]> {
    return this.prisma.concessions.findMany({
      where: {
        id: { in: concessionIds },
      },
    });
  }

  /**
   * Calculate ticket prices based on seat types
   * ✅ Get prices from Cinema Service (SeatPricingDto already has pricing by seat_type)
   */
  private async calculateTicketPrices(
    heldSeatsDetails: SeatDetail[],
    heldSeatsWithPricing: SeatPricingDto[]
  ): Promise<Array<{ seatId: string; price: number }>> {
    const ticketPrices: Array<{ seatId: string; price: number }> = [];

    // Create a map of pricing by seat ID from SeatPricingDto
    const priceMap = new Map(
      heldSeatsWithPricing.map((s) => [s.id, s.price])
    );

    for (const seat of heldSeatsDetails) {
      // Get price from SeatPricingDto (based on seat_type and day_type)
      const price = priceMap.get(seat.id) || 0;

      ticketPrices.push({
        seatId: seat.id,
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
    subtotal: number
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

  private mapToSummaryDto(
    booking: BookingWithRelations,
    showtimeData?: ShowtimeSeatResponse
  ): BookingSummaryDto {
    return {
      id: booking.id,
      bookingCode: booking.booking_code,
      showtimeId: booking.showtime_id,
      // Cinema service returns cinemaName as string directly
      movieTitle: 'Movie', // TODO: Need to fetch from movie service separately
      cinemaName: showtimeData?.cinemaName || 'Cinema',
      hallName: 'Hall', // TODO: Need to fetch from cinema service separately
      startTime: showtimeData?.showtime?.start_time || new Date(),
      seatCount: booking.tickets?.length || 0,
      totalAmount: Number(booking.final_amount),
      status: booking.status as BookingStatus,
      createdAt: booking.created_at,
    };
  }

  private mapToDetailDto(
    booking: BookingWithRelations,
    showtimeData?: ShowtimeSeatResponse
  ): BookingDetailDto {
    // Create a map of seat details from showtime data
    // Cinema service always returns seat_map, not seats
    const seatsArray: SeatDetail[] = showtimeData?.seat_map
      ? showtimeData.seat_map.flatMap((row: SeatRowDto) => 
          (row.seats || []).map((s: SeatItemDto) => ({ 
            ...s, 
            row: row.row,  // Preserve row from parent
            type: s.seatType || s.seatType 
          }))
        )
      : [];

    const seatMap = new Map((seatsArray || []).map((s: SeatDetail) => [s.id, s]));

    return {
      ...this.mapToSummaryDto(booking, showtimeData),
      userId: booking.user_id,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone,
      seats: (booking.tickets || []).map((t: Tickets) => {
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
      concessions: (booking.booking_concessions || []).map((bc) => ({
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
   * Trả về danh sách SeatPricingDto với thông tin ghế và giá
   */
  private async getSeatsHeldByUser(
    showtimeId: string,
    userId: string
  ): Promise<SeatPricingDto[]> {
    try {
      const heldSeats = await firstValueFrom(
        this.cinemaClient.send(
          CinemaMessage.SHOWTIME.GET_SEATS_HELD_BY_USER,
          { showtimeId, userId }
        )
      );
      return heldSeats as SeatPricingDto[];
    } catch {
      throw new BadRequestException(
        'Failed to get held seats from cinema service. Please try again.'
      );
    }
  }

  /**
   * ✅ Get detailed booking summary with grouped information
   * Transforms existing booking data into BookingCalculationDto format
   * This shows complete breakdown of tickets, concessions, pricing, taxes, and discounts
   */
  async getBookingSummary(
    bookingId: string,
    userId: string
  ): Promise<BookingCalculationDto> {
    // Get complete booking details
    const booking = await this.prisma.bookings.findFirst({
      where: { id: bookingId, user_id: userId },
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

    // Fetch showtime data for movie/cinema information
    let showtimeData;
    try {
      showtimeData = await this.getShowtimeDetails(booking.showtime_id, userId);
    } catch {
      showtimeData = null;
    }

    // Get seat details from showtime data
    // Cinema service returns seat_map (array of SeatRowDto)
    const seatsArray: SeatDetail[] = showtimeData?.seat_map
      ? showtimeData.seat_map.flatMap((row: SeatRowDto) =>
          (row.seats || []).map((s: SeatItemDto) => ({
            ...s,
            row: row.row,  // Preserve row from parent
            type: s.seatType, // Use seatType from SeatItemDto
          }))
        )
      : [];

    const seatMap = new Map(
      (seatsArray || []).map((s: SeatDetail) => [s.id, s])
    );

    // Group tickets by ticket type
    const ticketGroups = this.groupTicketsByType(booking.tickets, seatMap);

    // Calculate ticket subtotal
    const ticketsSubtotal = ticketGroups.reduce((sum, g) => sum + g.subtotal, 0);

    // Format concessions
    const concessions = (booking.booking_concessions || []).map((bc) => ({
      concessionId: bc.concession_id,
      name: bc.concession?.name || 'Concession',
      quantity: bc.quantity,
      unitPrice: Number(bc.unit_price),
      totalPrice: Number(bc.total_price),
    }));

    const concessionsSubtotal = concessions.reduce(
      (sum, c) => sum + c.totalPrice,
      0
    );

    // Calculate pricing breakdown
    const subtotal = Number(booking.subtotal);
    const totalDiscount = Number(booking.discount) + Number(booking.points_discount);
    
    // Calculate tax (reverse calculation from final amount)
    const totalBeforeTax = subtotal - totalDiscount;
    const VAT_RATE = 10;
    const vatAmount = Math.round((totalBeforeTax * VAT_RATE) / 100);

    // Build promotion discount info
    const promotionDiscount = booking.promotion_code
      ? {
          code: booking.promotion_code,
          description: `Promotion code: ${booking.promotion_code}`,
          discountAmount: Number(booking.discount),
        }
      : undefined;

    // Build loyalty points discount info
    const loyaltyPointsDiscount =
      booking.points_used > 0
        ? {
            pointsUsed: booking.points_used,
            discountAmount: Number(booking.points_discount),
          }
        : undefined;

    // Get loyalty points information
    let loyaltyPoints;
    if (booking.points_used > 0) {
      try {
        const loyaltyAccount = await this.prisma.loyaltyAccounts.findUnique({
          where: { user_id: userId },
        });

        if (loyaltyAccount) {
          // Calculate points earned from this booking (1 point per 1000 VND)
          const pointsEarned = Math.floor(Number(booking.final_amount) / 1000);

          loyaltyPoints = {
            used: booking.points_used,
            willEarn: pointsEarned,
            currentBalance: loyaltyAccount.current_points,
            newBalance:
              loyaltyAccount.current_points - booking.points_used + pointsEarned,
          };
        }
      } catch {
        // If loyalty account not available, skip
      }
    }

    // Build the summary
    const summary: BookingCalculationDto = {
      movie: {
        id: '', // TODO: Fetch from movie service
        title: 'Movie', // TODO: Fetch from movie service
        posterUrl: undefined,
        duration: 0,
        rating: 'N/A',
      },
      cinema: {
        id: '', // TODO: Fetch from cinema service
        name: showtimeData?.cinemaName || 'Cinema',
        address: '',
        hallName: 'Hall', // TODO: Fetch from cinema service
      },
      showtime: {
        id: booking.showtime_id,
        startTime: showtimeData?.showtime?.start_time || new Date(),
        endTime: showtimeData?.showtime?.end_time || new Date(),
        format: showtimeData?.showtime?.format || FormatEnum.TWO_D,
        language: showtimeData?.showtime?.language || 'Vietnamese',
      },
      ticketGroups,
      concessions,
      pricing: {
        ticketsSubtotal,
        concessionsSubtotal,
        subtotal,
        tax: {
          vatRate: VAT_RATE,
          vatAmount,
        },
        promotionDiscount,
        loyaltyPointsDiscount,
        totalDiscount,
        totalBeforeTax,
        finalAmount: Number(booking.final_amount),
      },
      loyaltyPoints,
      bookingCode: booking.booking_code,
      expiresAt: booking.expires_at,
    };

    return summary;
  }

  /**
   * Helper: Group tickets by ticket type
   */
  private groupTicketsByType(
    tickets: Array<{
      seat_id: string;
      ticket_type: string;
      price: unknown;
    }>,
    seatMap: Map<string, SeatDetail>
  ) {
    const groups: Record<
      string,
      {
        ticketType: string;
        quantity: number;
        pricePerTicket: number;
        subtotal: number;
        seats: Array<{
          seatId: string;
          row: string;
          number: number;
          seatType: string;
        }>;
      }
    > = {};

    for (const ticket of tickets) {
      const ticketType = ticket.ticket_type;
      const price = Number(ticket.price);
      const seat = seatMap.get(ticket.seat_id);

      if (!groups[ticketType]) {
        groups[ticketType] = {
          ticketType,
          quantity: 0,
          pricePerTicket: price,
          subtotal: 0,
          seats: [],
        };
      }

      groups[ticketType].quantity++;
      groups[ticketType].subtotal += price;
      groups[ticketType].seats.push({
        seatId: ticket.seat_id,
        row: (seat?.row as string) || 'A',
        number: (seat?.number as number) || 1,
        seatType: (seat?.type as string) || 'STANDARD',
      });
    }

    return Object.values(groups);
  }
}

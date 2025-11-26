import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { NotificationService, TicketWithQRCode } from '../notification/notification.service';
import { TicketService } from '../ticket/ticket.service';
import {
  CreatePaymentDto,
  PaymentDetailDto,
  PaymentStatus,
  PaymentMethod,
  BookingStatus,
  TicketStatus,
  
} from '@movie-hub/shared-types';
import * as crypto from 'crypto';
import moment from 'moment';
import * as querystring from 'qs';
import { BookingEventService } from '../redis/booking-event.service';

@Injectable()
export class PaymentService {
  private vnp_TmnCode: string;
  private vnp_HashSecret: string;
  private vnp_Url: string;
  private vnp_Api: string;
  private vnp_ReturnUrl: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private bookingEventService: BookingEventService,
    private notificationService: NotificationService,
    private ticketService: TicketService
  ) {
    this.vnp_TmnCode = this.configService.get('VNPAY_TMN_CODE') || 'EX6ATLAM';
    this.vnp_HashSecret = this.configService.get('VNPAY_HASH_SECRET') || 'ID4MX46WVEFNI39KLW9JUFHDR0I4U3IB';
    this.vnp_Url = this.configService.get('VNPAY_URL') || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    this.vnp_Api = this.configService.get('VNPAY_API') || 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction';
    this.vnp_ReturnUrl = this.configService.get('VNPAY_RETURN_URL') || 'http://localhost:3000/payment/return';
  }

  async createPayment(
    bookingId: string,
    dto: CreatePaymentDto,
    ipAddr: string
  ): Promise<PaymentDetailDto> {
    const booking = await this.prisma.bookings.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }
    
    if (booking.payment_status !== PaymentStatus.PENDING) {
      throw new Error('Booking is not pending payment');
    }

        // Use booking's final_amount if no amount provided in DTO
    const paymentAmount = Number(booking.final_amount);



    const payment = await this.prisma.payments.create({
      data: {
        booking_id: bookingId,
        amount: paymentAmount,
        payment_method: dto.paymentMethod,
        status: PaymentStatus.PENDING,
        metadata: {
          returnUrl: dto.returnUrl,
          cancelUrl: dto.cancelUrl,
        },
      },
    });

      // Use the validated paymentAmount instead of dto.amount
      const paymentUrl = await this.createVNPayUrl(payment.id, booking.id, booking.expires_at, paymentAmount, ipAddr);
      
      await this.prisma.payments.update({
        where: { id: payment.id },
        data: { payment_url: paymentUrl },
      });

      return this.mapToDto({ ...payment, payment_url: paymentUrl });
    
  }

  async createVNPayUrl(
    paymentId: string,
    bookingId: string,
    expireAt : Date,
    amount: number,
    ipAddr: string
  ): Promise<string> {
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid payment amount for VNPay URL generation');
    }

    
    
    // Use moment with timezone awareness - ensure all dates use Asia/Ho_Chi_Minh
   
    const createDate = moment.utc().utcOffset('+07:00').format('YYYYMMDDHHmmss');
    
    // Convert expireAt to Vietnam timezone (UTC+7) and format
    const expireDate = moment.utc(expireAt).utcOffset('+07:00').format('YYYYMMDDHHmmss');
    
    const orderId = paymentId;
    const locale = 'vn';
    const currCode = 'VND';

    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`, // No space after colon
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // Must multiply by 100 (remove decimal part)
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };



    // Convert all parameters to strings first, then sort
    const stringParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(vnp_Params)) {
      stringParams[key] = String(value);
    }

    // Sort string parameters before creating signature
    const sortedParams = this.sortObject(stringParams);

    // Create signature using HMAC SHA512
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams.vnp_SecureHash = signed;

    const paymentUrl = this.vnp_Url + '?' + querystring.stringify(sortedParams, { encode: false });
    
    return paymentUrl;
  }

  async handleVNPayIPN(vnpParams: Record<string, string>): Promise<{ RspCode: string; Message: string }> {
    const secureHash = vnpParams.vnp_SecureHash;
    const orderId = vnpParams.vnp_TxnRef;
    const transactionId = vnpParams.vnp_TransactionNo;
    const transactionStatus = vnpParams.vnp_TransactionStatus;
    
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const sortedParams = this.sortObject(vnpParams);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    console.log('[VNPay IPN] signData:', signData);
    console.log('[VNPay IPN] computed:', signed);
    console.log('[VNPay IPN] provided:', secureHash);
    if (secureHash !== signed) {
      return { RspCode: '97', Message: 'Checksum failed' };
    }

    const payment = await this.prisma.payments.findUnique({
      where: { id: orderId },
      include: { booking: true },
    });

    if (!payment) {
      return { RspCode: '01', Message: 'Order not found' };
    }

    if (payment.booking.expires_at && new Date() > payment.booking.expires_at) {
      return { RspCode: '04', Message: 'Order expired' };
    }

    const amount = parseInt(vnpParams.vnp_Amount) / 100;
    if (Number(payment.amount) !== amount) {
      return { RspCode: '04', Message: 'Amount invalid' };
    }

    if (payment.status !== PaymentStatus.PENDING || payment.booking.status !== BookingStatus.PENDING) {
      return { RspCode: '02', Message: 'This order has been updated to the payment status' };
    }

    try {
      if (transactionStatus === '00') {
        await this.prisma.$transaction([
          this.prisma.payments.update({
            where: { id: payment.id },
            data: {
              status: PaymentStatus.COMPLETED,
              provider_transaction_id: transactionId,
              paid_at: new Date(),
            },
          }),
          this.prisma.bookings.update({
            where: { id: payment.booking_id },
            data: {
              payment_status: PaymentStatus.COMPLETED,
              status: BookingStatus.CONFIRMED,
              expires_at: null,
            },
          }),
          this.prisma.tickets.updateMany({
            where: { booking_id: payment.booking_id },
            data: { status: TicketStatus.VALID },
          }),
        ]);

        // Publish booking completed event to Redis
        const tickets = await this.prisma.tickets.findMany({
          where: { booking_id: payment.booking_id },
          select: { seat_id: true },
        });

        await this.bookingEventService.publishBookingConfirmed({
           
          userId: payment.booking.user_id,
          showtimeId: payment.booking.showtime_id,
          bookingId: payment.booking_id,
          seatIds: tickets.map((t) => t.seat_id),
        });

        // Send booking confirmation email ASYNCHRONOUSLY (fire-and-forget, don't block payment)
        this.sendBookingConfirmationEmailAsync(payment.booking_id).catch(emailError => {
          // Log but don't throw - email failure should not affect payment success
          console.error('[Payment] Failed to send booking confirmation email (async):', emailError);
        });

        return { RspCode: '00', Message: 'Success' };
      } else {
        await this.prisma.$transaction([
          this.prisma.payments.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.FAILED },
          }),
          this.prisma.bookings.update({
            where: { id: payment.booking_id },
            data: {
              payment_status: PaymentStatus.FAILED,
              status: BookingStatus.CANCELLED,
            },
          }),
          this.prisma.tickets.updateMany({
            where: { booking_id: payment.booking_id },
            data: { status: TicketStatus.CANCELLED },
          }),
        ]);

        return { RspCode: '00', Message: 'Success' };
      }
    } catch {
      return { RspCode: '99', Message: 'Update failed, please retry' };
    }
  }
//  //## DONT USE THIS , use ipn instead
  async handleVNPayReturn(vnpParams: Record<string, string>): Promise<{ status: string; code: string }> {
    const secureHash = vnpParams.vnp_SecureHash;  
    
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const sortedParams = this.sortObject(vnpParams);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      return { status: 'success', code: vnpParams.vnp_ResponseCode };
    } else {
      return { status: 'error', code: '97' };
    }
  }

  async findOne(id: string): Promise<PaymentDetailDto> {
    const payment = await this.prisma.payments.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return this.mapToDto(payment);
  }

  async findByBooking(bookingId: string): Promise<PaymentDetailDto[]> {
    const payments = await this.prisma.payments.findMany({
      where: { booking_id: bookingId },
      orderBy: { created_at: 'desc' },
    });

    return payments.map((payment) => this.mapToDto(payment));
  }

  private sortObject(obj: Record<string, string>): Record<string, string> {
    const sorted: Record<string, string> = {};
    const keys: string[] = [];

    // Get all keys and encode them for sorting
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        keys.push(encodeURIComponent(key));
      }
    }

    // Sort encoded keys alphabetically
    keys.sort();

    // Build sorted object with encoded keys and encoded values
    for (const encodedKey of keys) {
      // Find original key by decoding
      const originalKey = Object.keys(obj).find(
        (k) => encodeURIComponent(k) === encodedKey
      );
      if (originalKey) {
        sorted[encodedKey] = encodeURIComponent(obj[originalKey]).replace(/%20/g, '+');
      }
    }

    return sorted;
  }

  private mapToDto(payment: any): PaymentDetailDto {
    return {
      id: payment.id,
      bookingId: payment.booking_id,
      amount: Number(payment.amount),
      paymentMethod: payment.payment_method as PaymentMethod,
      status: payment.status as PaymentStatus,
      transactionId: payment.transaction_id,
      providerTransactionId: payment.provider_transaction_id,
      paymentUrl: payment.payment_url,
      paidAt: payment.paid_at,
      metadata: payment.metadata,
      createdAt: payment.created_at,
      updatedAt: payment.updated_at,
    };
  }

  // ==================== ADMIN OPERATIONS ====================

  /**
   * Admin: Find all payments with comprehensive filters
   */
  async adminFindAllPayments(filters: {
    bookingId?: string;
    status?: PaymentStatus;
    paymentMethod?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
    sortBy?: 'created_at' | 'amount' | 'paid_at';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ data: PaymentDetailDto[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.bookingId) where.booking_id = filters.bookingId;
    if (filters.status) where.status = filters.status;
    if (filters.paymentMethod) where.payment_method = filters.paymentMethod;

    if (filters.startDate || filters.endDate) {
      where.created_at = {};
      if (filters.startDate) where.created_at.gte = filters.startDate;
      if (filters.endDate) where.created_at.lte = filters.endDate;
    }

    const orderBy: any = {};
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'desc';
    orderBy[sortBy] = sortOrder;

    const [payments, total] = await Promise.all([
      this.prisma.payments.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.payments.count({ where }),
    ]);

    return {
      data: payments.map((p) => this.mapToDto(p)),
      total,
    };
  }

  /**
   * Find payments by status
   */
  async findPaymentsByStatus(
    status: PaymentStatus,
    page = 1,
    limit = 10
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.payments.findMany({
        where: { status },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.payments.count({ where: { status } }),
    ]);

    return {
      data: payments.map((p) => this.mapToDto(p)),
      total,
    };
  }

  /**
   * Find payments by date range
   */
  async findPaymentsByDateRange(filters: {
    startDate: Date;
    endDate: Date;
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{ data: PaymentDetailDto[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {
      created_at: {
        gte: filters.startDate,
        lte: filters.endDate,
      },
    };

    if (filters.status) where.status = filters.status;

    const [payments, total] = await Promise.all([
      this.prisma.payments.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.payments.count({ where }),
    ]);

    return {
      data: payments.map((p) => this.mapToDto(p)),
      total,
    };
  }

  /**
   * Cancel a pending payment
   */
  async cancelPayment(paymentId: string): Promise<PaymentDetailDto> {
    const payment = await this.prisma.payments.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new Error('Can only cancel pending payments');
    }

    const updated = await this.prisma.payments.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.FAILED },
    });

    return this.mapToDto(updated);
  }

  /**
   * Get payment statistics
   */
  async getPaymentStatistics(filters: {
    startDate?: Date;
    endDate?: Date;
    paymentMethod?: string;
  }): Promise<any> {
    const where: any = {};

    if (filters.startDate || filters.endDate) {
      where.created_at = {};
      if (filters.startDate) where.created_at.gte = filters.startDate;
      if (filters.endDate) where.created_at.lte = filters.endDate;
    }

    if (filters.paymentMethod) where.payment_method = filters.paymentMethod;

    const [totalPayments, successfulPayments, failedPayments, pendingPayments, payments] = await Promise.all([
      this.prisma.payments.count({ where }),
      this.prisma.payments.count({ where: { ...where, status: PaymentStatus.COMPLETED } }),
      this.prisma.payments.count({ where: { ...where, status: PaymentStatus.FAILED } }),
      this.prisma.payments.count({ where: { ...where, status: PaymentStatus.PENDING } }),
      this.prisma.payments.findMany({ where }),
    ]);

    const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const completedPayments = payments.filter((p) => p.status === PaymentStatus.COMPLETED);
    const completedAmount = completedPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    // Group by payment method
    const paymentsByMethod = payments.reduce((acc: any, p) => {
      const method = p.payment_method;
      if (!acc[method]) {
        acc[method] = { method, count: 0, amount: 0 };
      }
      acc[method].count++;
      acc[method].amount += Number(p.amount);
      return acc;
    }, {});

    // Group by status
    const paymentsByStatus = payments.reduce((acc: any, p) => {
      const status = p.status;
      if (!acc[status]) {
        acc[status] = { status, count: 0, amount: 0 };
      }
      acc[status].count++;
      acc[status].amount += Number(p.amount);
      return acc;
    }, {});

    return {
      totalPayments,
      totalAmount,
      successfulPayments,
      failedPayments,
      pendingPayments,
      successRate: totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0,
      averagePaymentAmount: totalPayments > 0 ? totalAmount / totalPayments : 0,
      paymentsByMethod: Object.values(paymentsByMethod),
      paymentsByStatus: Object.values(paymentsByStatus),
      period: filters.startDate && filters.endDate ? {
        startDate: filters.startDate,
        endDate: filters.endDate,
      } : undefined,
    };
  }

  /**
   * Send booking confirmation email ASYNCHRONOUSLY with QR codes
   * This runs in background and never blocks the payment flow
   */
  private async sendBookingConfirmationEmailAsync(bookingId: string): Promise<void> {
    try {
      const fullBooking = await this.prisma.bookings.findUnique({
        where: { id: bookingId },
        include: {
          tickets: true,
          booking_concessions: {
            include: { concession: true },
          },
        },
      });

      if (!fullBooking) {
        console.error('[Email] Booking not found:', bookingId);
        return;
      }

      // Generate QR codes for all tickets IN PARALLEL
      const ticketsWithQR = await Promise.all(
        (fullBooking.tickets || []).map(async (ticket) => {
          try {
            const qrCode = await this.ticketService.generateQRCode(ticket.id);
            return {
              ticketCode: ticket.ticket_code,
              seatNumber: `${ticket.seat_id}`, // TODO: Parse actual seat row/number
              ticketType: ticket.ticket_type,
              price: Number(ticket.price),
              qrCode,
            };
          } catch (qrError) {
            console.error(`[Email] Failed to generate QR for ticket ${ticket.id}:`, qrError);
            // Return ticket without QR code
            return {
              ticketCode: ticket.ticket_code,
              seatNumber: `${ticket.seat_id}`,
              ticketType: ticket.ticket_type,
              price: Number(ticket.price),
              qrCode: '', // Empty if QR generation fails
            };
          }
        })
      );

      // Map to BookingDetailDto format
      const bookingForEmail = {
        id: fullBooking.id,
        bookingCode: fullBooking.booking_code,
        showtimeId: fullBooking.showtime_id,
        userId: fullBooking.user_id,
        customerName: fullBooking.customer_name,
        customerEmail: fullBooking.customer_email,
        customerPhone: fullBooking.customer_phone,
        movieTitle: 'Movie Title', // TODO: Fetch from cinema-service
        cinemaName: 'Cinema Name', // TODO: Fetch from cinema-service
        hallName: 'Hall Name', // TODO: Fetch from cinema-service
        startTime: new Date(), // TODO: Fetch from cinema-service
        seatCount: fullBooking.tickets?.length || 0,
        seats: fullBooking.tickets?.map(t => ({
          seatId: t.seat_id,
          row: 'A', // TODO: Parse from seat_id
          number: 1, // TODO: Parse from seat_id
          seatType: t.ticket_type,
          ticketType: t.ticket_type,
          price: Number(t.price),
        })) || [],
        concessions: fullBooking.booking_concessions?.map(bc => ({
          concessionId: bc.concession_id,
          name: bc.concession?.name || 'Item',
          quantity: bc.quantity,
          unitPrice: Number(bc.unit_price),
          totalPrice: Number(bc.total_price),
        })) || [],
        subtotal: Number(fullBooking.subtotal),
        discount: Number(fullBooking.discount),
        pointsUsed: fullBooking.points_used,
        pointsDiscount: Number(fullBooking.points_discount),
        finalAmount: Number(fullBooking.final_amount),
        totalAmount: Number(fullBooking.final_amount),
        promotionCode: fullBooking.promotion_code,
        status: fullBooking.status as BookingStatus,
        paymentStatus: fullBooking.payment_status as PaymentStatus,
        expiresAt: fullBooking.expires_at,
        cancelledAt: fullBooking.cancelled_at,
        cancellationReason: fullBooking.cancellation_reason,
        createdAt: fullBooking.created_at,
        updatedAt: fullBooking.updated_at,
      };

      // Send email with tickets and QR codes
      await this.notificationService.sendBookingConfirmation({
        booking: bookingForEmail,
        tickets: ticketsWithQR,
      });

      console.log(`[Email] Booking confirmation sent successfully to ${fullBooking.customer_email}`);

      // Also send SMS if phone number available (fire-and-forget)
      if (fullBooking.customer_phone) {
        this.notificationService.sendBookingConfirmationSMS(bookingForEmail).catch(smsError => {
          console.error('[SMS] Failed to send booking confirmation SMS:', smsError);
        });
      }
    } catch (error) {
      console.error('[Email] Failed to send booking confirmation:', error);
      // Don't throw - this is already async and shouldn't affect payment
    }
  }
}

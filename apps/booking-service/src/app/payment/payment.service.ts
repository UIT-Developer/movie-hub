/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import {
  CreatePaymentDto,
  PaymentDetailDto,
  PaymentStatus,
  PaymentMethod,
  BookingStatus,
  TicketStatus,
  BookingDetailDto,
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
    private bookingEventService: BookingEventService
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
    

    return this.mapToDto(payment);
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

    if (payment.status !== PaymentStatus.PENDING) {
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
}

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import { Permission } from '../../../common/decorator/permission.decorator';
import { CurrentUserId } from '../../../common/decorator/current-user-id.decorator';
import { CreatePaymentDto } from '@movie-hub/shared-types';
import { Request } from 'express';

@Controller({
  version: '1',
  path: 'payments',
})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Create payment for a booking
   * Authenticated endpoint - requires valid user session
   */
  @Post('bookings/:bookingId')
  @UseGuards(ClerkAuthGuard)

  async createPayment(
    @CurrentUserId() userId: string,
    @Param('bookingId') bookingId: string,
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: Request
  ) {
    const ipAddr =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.ip ||
      '127.0.0.1';

    return this.paymentService.createPayment(bookingId, createPaymentDto, ipAddr);
  }

  /**
   * Get payment details
   * Authenticated endpoint
   */
  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  
  async getPayment(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.paymentService.getPayment(id);
  }

  /**
   * VNPay IPN (Instant Payment Notification) webhook
   * PUBLIC endpoint - VNPay server calls this to notify payment status
   * NO authentication required
   */
  @Get('vnpay/ipn')
  @HttpCode(HttpStatus.OK)
  async vnpayIPN(@Query() query: Record<string, string>) {
    return this.paymentService.handleVNPayIPN(query);
  }

  /**
   * VNPay return URL - where user is redirected after payment
   * PUBLIC endpoint - user is redirected here from VNPay
   * NO authentication required (user may have lost session)
   */
  @Get('vnpay/return')
  async vnpayReturn(@Query() query: Record<string, string>) {
    return this.paymentService.handleVNPayReturn(query);
  }
}

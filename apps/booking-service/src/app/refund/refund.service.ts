import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateRefundDto,
  RefundDetailDto,
  RefundStatus,
  ServiceResult,
} from '@movie-hub/shared-types';
import { Prisma } from '../../../generated/prisma';

@Injectable()
export class RefundService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a refund request
   */
  async createRefund(dto: CreateRefundDto): Promise<ServiceResult<RefundDetailDto>> {
    // Verify payment exists
    const payment = await this.prisma.payments.findUnique({
      where: { id: dto.paymentId },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      throw new BadRequestException('Payment not found');
    }

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Can only refund completed payments');
    }

    // Check if refund amount is valid
    const existingRefunds = await this.prisma.refunds.findMany({
      where: {
        payment_id: dto.paymentId,
        status: { in: ['PENDING', 'PROCESSING', 'COMPLETED'] },
      },
    });

    const totalRefunded = existingRefunds.reduce(
      (sum, r) => sum + Number(r.amount),
      0
    );

    if (totalRefunded + dto.amount > Number(payment.amount)) {
      throw new BadRequestException(
        `Cannot refund more than payment amount. Available: ${Number(payment.amount) - totalRefunded}`
      );
    }

    const refund = await this.prisma.refunds.create({
      data: {
        payment_id: dto.paymentId,
        amount: dto.amount,
        reason: dto.reason,
        status: RefundStatus.PENDING,
      },
      include: {
        payment: {
          include: {
            booking: true,
          },
        },
      },
    });

    return {
      data: this.mapToDetailDto(refund),
      message: 'Refund request created successfully',
    };
  }

  /**
   * Find all refunds with filters
   */
  async findAllRefunds(filters: {
    paymentId?: string;
    status?: RefundStatus;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<ServiceResult<RefundDetailDto[]>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.RefundsWhereInput = {};

    if (filters.paymentId) where.payment_id = filters.paymentId;
    if (filters.status) where.status = filters.status;

    if (filters.startDate || filters.endDate) {
      where.created_at = {};
      if (filters.startDate) where.created_at.gte = filters.startDate;
      if (filters.endDate) where.created_at.lte = filters.endDate;
    }

    const [refunds, total] = await Promise.all([
      this.prisma.refunds.findMany({
        where,
        include: {
          payment: {
            include: {
              booking: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.refunds.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: refunds.map((r) => this.mapToDetailDto(r)),
      meta: {
        page,
        limit,
        totalRecords: total,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    };
  }

  /**
   * Find one refund by ID
   */
  async findOne(id: string): Promise<ServiceResult<RefundDetailDto>> {
    const refund = await this.prisma.refunds.findUnique({
      where: { id },
      include: {
        payment: {
          include: {
            booking: true,
          },
        },
      },
    });

    if (!refund) {
      throw new BadRequestException('Refund not found');
    }

    return {
      data: this.mapToDetailDto(refund),
    };
  }

  /**
   * Find refunds by payment ID
   */
  async findByPayment(paymentId: string): Promise<ServiceResult<RefundDetailDto[]>> {
    const refunds = await this.prisma.refunds.findMany({
      where: { payment_id: paymentId },
      include: {
        payment: {
          include: {
            booking: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return {
      data: refunds.map((r) => this.mapToDetailDto(r)),
    };
  }

  /**
   * Process a refund (mark as processing)
   */
  async processRefund(refundId: string): Promise<ServiceResult<RefundDetailDto>> {
    const refund = await this.prisma.refunds.findUnique({
      where: { id: refundId },
    });

    if (!refund) {
      throw new BadRequestException('Refund not found');
    }

    if (refund.status !== RefundStatus.PENDING) {
      throw new BadRequestException('Can only process pending refunds');
    }

    const updated = await this.prisma.refunds.update({
      where: { id: refundId },
      data: { status: RefundStatus.PROCESSING },
      include: {
        payment: {
          include: {
            booking: true,
          },
        },
      },
    });

    return {
      data: this.mapToDetailDto(updated),
      message: 'Refund marked as processing',
    };
  }

  /**
   * Approve and complete a refund
   */
  async approveRefund(refundId: string): Promise<ServiceResult<RefundDetailDto>> {
    const refund = await this.prisma.refunds.findUnique({
      where: { id: refundId },
      include: {
        payment: true,
      },
    });

    if (!refund) {
      throw new BadRequestException('Refund not found');
    }

    if (!['PENDING', 'PROCESSING'].includes(refund.status)) {
      throw new BadRequestException('Can only approve pending or processing refunds');
    }

    // Update refund status and payment status
    const updated = await this.prisma.$transaction(async (tx) => {
      // Update refund
      const updatedRefund = await tx.refunds.update({
        where: { id: refundId },
        data: {
          status: RefundStatus.COMPLETED,
          refunded_at: new Date(),
        },
        include: {
          payment: {
            include: {
              booking: true,
            },
          },
        },
      });

      // Update payment status to REFUNDED
      await tx.payments.update({
        where: { id: refund.payment_id },
        data: { status: 'REFUNDED' },
      });

      // Update booking status to CANCELLED if not already
      if (refund.payment?.booking_id) {
        await tx.bookings.update({
          where: { id: refund.payment.booking_id },
          data: {
            status: 'CANCELLED',
            cancelled_at: new Date(),
            cancellation_reason: 'Refund processed',
          },
        });
      }

      return updatedRefund;
    });

    return {
      data: this.mapToDetailDto(updated),
      message: 'Refund approved and completed successfully',
    };
  }

  /**
   * Reject a refund request
   */
  async rejectRefund(refundId: string, reason: string): Promise<ServiceResult<RefundDetailDto>> {
    const refund = await this.prisma.refunds.findUnique({
      where: { id: refundId },
    });

    if (!refund) {
      throw new BadRequestException('Refund not found');
    }

    if (refund.status !== RefundStatus.PENDING) {
      throw new BadRequestException('Can only reject pending refunds');
    }

    const updated = await this.prisma.refunds.update({
      where: { id: refundId },
      data: {
        status: RefundStatus.FAILED,
        reason: `${refund.reason}\nRejection reason: ${reason}`,
      },
      include: {
        payment: {
          include: {
            booking: true,
          },
        },
      },
    });

    return {
      data: this.mapToDetailDto(updated),
      message: 'Refund rejected',
    };
  }

  private mapToDetailDto(refund: Prisma.RefundsGetPayload<{
    include: {
      payment: {
        include: {
          booking: true;
        };
      };
    };
  }>): RefundDetailDto {
    return {
      id: refund.id,
      paymentId: refund.payment_id,
      bookingId: refund.payment?.booking_id || '',
      bookingCode: refund.payment?.booking?.booking_code || '',
      amount: Number(refund.amount),
      reason: refund.reason,
      status: refund.status as RefundStatus,
      refundedAt: refund.refunded_at,
      createdAt: refund.created_at,
      payment: refund.payment
        ? {
            id: refund.payment.id,
            amount: Number(refund.payment.amount),
            paymentMethod: refund.payment.payment_method,
            transactionId: refund.payment.transaction_id,
          }
        : undefined,
    };
  }
}

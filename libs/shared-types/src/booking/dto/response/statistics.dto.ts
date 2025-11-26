import { BookingStatus, PaymentStatus } from '../../enum';

/**
 * Booking statistics response
 */
export interface BookingStatisticsDto {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  bookingsByStatus: {
    status: BookingStatus;
    count: number;
    revenue: number;
  }[];
  bookingsByPaymentStatus: {
    status: PaymentStatus;
    count: number;
  }[];
  topConcessions?: {
    concessionId: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  topPromotions?: {
    code: string;
    usageCount: number;
    totalDiscount: number;
  }[];
  period?: {
    startDate: Date;
    endDate: Date;
  };
}

/**
 * Revenue report response
 */
export interface RevenueReportDto {
  totalRevenue: number;
  totalTicketRevenue: number;
  totalConcessionRevenue: number;
  totalDiscount: number;
  totalRefund: number;
  netRevenue: number;
  bookingCount: number;
  averageBookingValue: number;
  revenueByPeriod: {
    period: string; // e.g., "2025-11-24", "2025-W47", "2025-11"
    revenue: number;
    bookingCount: number;
  }[];
  revenueByCinema?: {
    cinemaId: string;
    cinemaName: string;
    revenue: number;
    bookingCount: number;
  }[];
  period: {
    startDate: Date;
    endDate: Date;
  };
}

/**
 * Payment statistics response
 */
export interface PaymentStatisticsDto {
  totalPayments: number;
  totalAmount: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  successRate: number; // percentage
  averagePaymentAmount: number;
  paymentsByMethod: {
    method: string;
    count: number;
    amount: number;
  }[];
  paymentsByStatus: {
    status: PaymentStatus;
    count: number;
    amount: number;
  }[];
  period?: {
    startDate: Date;
    endDate: Date;
  };
}

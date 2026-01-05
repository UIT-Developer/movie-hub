/**
 * Dashboard API Client
 *
 * BFF endpoints for the Admin Dashboard.
 * All functions use the shared api-client with Clerk auth.
 */

import { api } from './api-client';

// ==================== Types ====================

export interface DashboardStatsDto {
  totalMovies: number;
  totalCinemas: number;
  todayShowtimes: number;
  weekRevenue: number;
  totalBookings: number;
  averageRating: number;
}

export interface TopMovieDto {
  movieId: string;
  title: string;
  posterUrl?: string;
  totalBookings: number;
  totalRevenue: number;
}

export interface TopCinemaDto {
  cinemaId: string;
  name: string;
  location: string;
  totalRevenue: number;
  occupancyRate: number;
}

export interface RecentBookingDto {
  id: string;
  bookingCode: string;
  showtimeId: string;
  movieTitle: string;
  cinemaName: string;
  hallName: string;
  startTime: string;
  seatCount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface RecentReviewDto {
  id: string;
  movieId: string;
  movieTitle: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RevenueReportDto {
  totalRevenue: number;
  totalTicketRevenue: number;
  totalConcessionRevenue: number;
  totalDiscount: number;
  totalRefund: number;
  netRevenue: number;
  bookingCount: number;
  averageBookingValue: number;
  revenueByPeriod: Array<{
    period: string;
    revenue: number;
    bookingCount: number;
  }>;
  period: {
    startDate?: string;
    endDate?: string;
  };
}

export interface OccupancyDto {
  cinemaId: string;
  cinemaName: string;
  totalCapacity: number;
  soldSeats: number;
  occupancyRate: number;
}

// ==================== API Functions ====================

const DASHBOARD_BASE = '/api/v1/dashboard';

/**
 * Get dashboard KPI statistics
 */
export async function getDashboardStats(): Promise<DashboardStatsDto> {
  return api.get<DashboardStatsDto>(`${DASHBOARD_BASE}/stats`);
}

/**
 * Get revenue report with date filters
 */
export async function getRevenueReport(filters?: {
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'week' | 'month';
}): Promise<RevenueReportDto> {
  const params = new URLSearchParams();
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  if (filters?.groupBy) params.append('groupBy', filters.groupBy);

  return api.get<RevenueReportDto>(
    `${DASHBOARD_BASE}/revenue?${params.toString()}`
  );
}

/**
 * Get top movies by bookings
 */
export async function getTopMovies(limit = 5): Promise<TopMovieDto[]> {
  return api.get<TopMovieDto[]>(`${DASHBOARD_BASE}/top-movies?limit=${limit}`);
}

/**
 * Get top cinemas by revenue
 */
export async function getTopCinemas(limit = 5): Promise<TopCinemaDto[]> {
  return api.get<TopCinemaDto[]>(
    `${DASHBOARD_BASE}/top-cinemas?limit=${limit}`
  );
}

/**
 * Get recent bookings
 */
export async function getRecentBookings(
  limit = 10
): Promise<RecentBookingDto[]> {
  return api.get<RecentBookingDto[]>(
    `${DASHBOARD_BASE}/recent-bookings?limit=${limit}`
  );
}

/**
 * Get recent reviews
 */
export async function getRecentReviews(limit = 10): Promise<RecentReviewDto[]> {
  return api.get<RecentReviewDto[]>(
    `${DASHBOARD_BASE}/recent-reviews?limit=${limit}`
  );
}

/**
 * Get occupancy rates
 */
export async function getOccupancy(date?: string): Promise<OccupancyDto[]> {
  const params = date ? `?date=${date}` : '';
  return api.get<OccupancyDto[]>(`${DASHBOARD_BASE}/occupancy${params}`);
}

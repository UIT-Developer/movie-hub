import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ClerkAuthGuard } from '../../common/guard/clerk-auth.guard';

/**
 * Dashboard Controller
 *
 * BFF (Backend-for-Frontend) endpoints for the Admin Dashboard.
 * Aggregates data from multiple microservices into dashboard-ready formats.
 */
@Controller({
  version: '1',
  path: 'dashboard',
})
@UseGuards(ClerkAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * GET /v1/dashboard/stats
   * Returns KPI summary: total movies, cinemas, revenue, bookings, etc.
   */
  @Get('stats')
  async getStats() {
    return this.dashboardService.getStats();
  }

  /**
   * GET /v1/dashboard/revenue
   * Returns revenue report with optional date filters
   */
  @Get('revenue')
  async getRevenueReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('groupBy') groupBy?: 'day' | 'week' | 'month'
  ) {
    return this.dashboardService.getRevenueReport({
      startDate,
      endDate,
      groupBy,
    });
  }

  /**
   * GET /v1/dashboard/top-movies
   * Returns top movies by bookings with movie metadata
   */
  @Get('top-movies')
  async getTopMovies(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.dashboardService.getTopMovies(parsedLimit);
  }

  /**
   * GET /v1/dashboard/top-cinemas
   * Returns top cinemas by revenue with cinema metadata
   */
  @Get('top-cinemas')
  async getTopCinemas(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.dashboardService.getTopCinemas(parsedLimit);
  }

  /**
   * GET /v1/dashboard/recent-bookings
   * Returns latest bookings with enriched movie/cinema data
   */
  @Get('recent-bookings')
  async getRecentBookings(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.dashboardService.getRecentBookings(parsedLimit);
  }

  /**
   * GET /v1/dashboard/recent-reviews
   * Returns latest reviews with movie titles
   */
  @Get('recent-reviews')
  async getRecentReviews(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.dashboardService.getRecentReviews(parsedLimit);
  }

  /**
   * GET /v1/dashboard/occupancy
   * Returns hall occupancy rates for a given date (defaults to today)
   */
  @Get('occupancy')
  async getOccupancy(@Query('date') date?: string) {
    return this.dashboardService.getOccupancy(date);
  }
}

/**
 * DTO for finding user's booking at a specific showtime
 * Used when entering showtime screen to check if user already has a booking
 */
export interface FindUserBookingByShowtimeDto {
  showtimeId: string;
  userId: string;
  /**
   * Optional: Include only specific statuses
   * Default: PENDING (active bookings that can be edited)
   */
  includeStatuses?: ('PENDING' | 'CONFIRMED' | 'CANCELLED')[];
}

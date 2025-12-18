// ============================================================================
// SHARED TYPES - Based on Backend API Responses
// ============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// MOVIE TYPES (API 1.x)
// ============================================================================

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  description?: string;
  duration: number; // minutes
  releaseDate: string; // ISO date
  posterUrl?: string;
  trailerUrl?: string;
  language: string;
  rating?: number; // 0-10
  status: 'COMING_SOON' | 'NOW_SHOWING' | 'ENDED';
  director?: string;
  cast?: string[];
  genreIds?: string[];
  genres?: Genre[];
  ageRating?: string; // P, C13, C16, C18
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMovieRequest {
  title: string;
  originalTitle?: string;
  description?: string;
  duration: number;
  releaseDate: string;
  posterUrl?: string;
  trailerUrl?: string;
  language: string;
  rating?: number;
  status: 'COMING_SOON' | 'NOW_SHOWING' | 'ENDED';
  director?: string;
  cast?: string[];
  genreIds?: string[];
  ageRating?: string;
  country?: string;
}

export type UpdateMovieRequest = Partial<CreateMovieRequest>;

// ============================================================================
// GENRE TYPES (API 2.x)
// ============================================================================

export interface Genre {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGenreRequest {
  name: string;
}

export interface UpdateGenreRequest {
  name: string;
}

// ============================================================================
// CINEMA TYPES (API 3.x)
// ============================================================================

export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone?: string;
  email?: string;
  description?: string;
  amenities?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCinemaRequest {
  name: string;
  address: string;
  city: string;
  district: string;
  phone?: string;
  email?: string;
  description?: string;
  amenities?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type UpdateCinemaRequest = Partial<CreateCinemaRequest>;

export interface CinemaFiltersParams {
  city?: string;
  district?: string;
  amenities?: string[];
  page?: number;
  limit?: number;
}

// ============================================================================
// HALL TYPES (API 4.x & 5.x)
// ============================================================================

export type HallType = '2D' | '3D' | 'IMAX' | '4DX' | 'SCREEN_X' | 'DOLBY_ATMOS';
export type SeatType = 'STANDARD' | 'VIP' | 'COUPLE' | 'WHEELCHAIR';
export type SeatStatus = 'AVAILABLE' | 'BROKEN' | 'MAINTENANCE' | 'RESERVED';

export interface Seat {
  id: string;
  rowLabel: string; // A, B, C...
  seatNumber: number; // 1, 2, 3...
  type: SeatType;
  status: SeatStatus;
  position?: {
    x: number;
    y: number;
  };
}

export interface Hall {
  id: string;
  cinemaId: string;
  cinema?: Cinema;
  name: string;
  type: HallType;
  capacity: number;
  rows: number;
  seatsPerRow: number;
  layout?: {
    rows: number;
    columns: number;
    seatMap: Seat[];
  };
  hallCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHallRequest {
  cinemaId: string;
  name: string;
  type: HallType;
  capacity: number;
  rows: number;
  seatsPerRow: number;
  layout?: {
    rows: number;
    columns: number;
    seatMap: Seat[];
  };
  hallCode?: string;
}

export type UpdateHallRequest = Partial<Omit<CreateHallRequest, 'cinemaId'>>;

export interface UpdateSeatStatusRequest {
  status: SeatStatus;
}

// ============================================================================
// SHOWTIME TYPES (API 5.x)
// ============================================================================

export type ShowtimeFormat = '2D' | '3D' | 'IMAX' | '4DX';
export type ShowtimeLanguage = 'Vietnamese' | 'English' | 'Korean' | 'Japanese';

export interface Showtime {
  id: string;
  movieId: string;
  movie?: Movie;
  cinemaId: string;
  cinema?: Cinema;
  hallId: string;
  hall?: Hall;
  startTime: string; // ISO datetime
  endTime?: string;
  format: ShowtimeFormat;
  language: ShowtimeLanguage;
  price: number;
  availableSeats?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShowtimeRequest {
  movieId: string;
  cinemaId: string;
  hallId: string;
  startTime: string;
  format: ShowtimeFormat;
  language: ShowtimeLanguage;
  price: number;
}

export type UpdateShowtimeRequest = Partial<CreateShowtimeRequest>;

export interface ShowtimeFiltersParams {
  cinemaId?: string;
  movieId?: string;
  date?: string; // YYYY-MM-DD
  hallId?: string;
}

export interface BatchCreateShowtimesRequest {
  movieId: string;
  cinemaId: string;
  hallId: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  timeSlots: string[]; // ["10:00", "14:30", "19:00"]
  format: ShowtimeFormat;
  language: ShowtimeLanguage;
  price: number;
  excludeDates?: string[]; // Skip specific dates
}

// ============================================================================
// SHOWTIME SEAT TYPES
// ============================================================================

export interface ShowtimeSeat extends Seat {
  showtimeId: string;
  isReserved: boolean;
  isBooked: boolean;
  price?: number;
}

// ============================================================================
// MOVIE RELEASE TYPES (API 6.x)
// ============================================================================

export interface MovieRelease {
  id: string;
  movieId: string;
  movie?: Movie;
  cinemaId: string;
  cinema?: Cinema;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'ENDED';
  note: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMovieReleaseRequest {
  movieId: string;
  cinemaId: string;
  startDate: string;
  endDate: string;
  note?: string;
}

export type UpdateMovieReleaseRequest = Partial<CreateMovieReleaseRequest>;

// ============================================================================
// TICKET PRICING TYPES (API 7.x)
// ============================================================================

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface TicketPricing {
  id: string;
  cinemaId: string;
  cinema?: Cinema;
  hallType: HallType;
  seatType: SeatType;
  dayOfWeek: DayOfWeek;
  timeSlot: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'LATE_NIGHT';
  basePrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateTicketPricingRequest {
  basePrice: number;
}

export interface TicketPricingFiltersParams {
  cinemaId?: string;
  hallType?: HallType;
  seatType?: SeatType;
  dayOfWeek?: DayOfWeek;
}

// ============================================================================
// STATS & REPORTS (Placeholder - APIs not implemented)
// ============================================================================

export interface DashboardStats {
  totalMovies: number;
  totalCinemas: number;
  totalHalls: number;
  totalShowtimes: number;
  recentBookings?: number;
  revenue?: number;
}

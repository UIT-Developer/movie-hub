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

export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | 'C';
export type LanguageType = 'ORIGINAL' | 'DUBBED';

export interface MovieCast {
  name: string;
  profileUrl?: string;
  character?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  overview?: string; // Backend uses 'overview' not 'description'
  runtime: number; // Backend uses 'runtime' not 'duration' (minutes)
  releaseDate: string | Date; // ISO date
  posterUrl: string;
  backdropUrl?: string;
  trailerUrl: string;
  originalLanguage: string;
  spokenLanguages?: string[];
  languageType?: LanguageType;
  productionCountry?: string;
  ageRating: AgeRating;
  director?: string;
  cast?: MovieCast[]; // Backend uses array of objects with name, profileUrl
  genreIds?: string[];
  genre?: Genre[]; // Backend returns 'genre' not 'genres'
  status?: 'COMING_SOON' | 'NOW_SHOWING' | 'ENDED';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateMovieRequest {
  title: string;
  originalTitle: string;
  overview: string; // Backend uses 'overview'
  runtime: number; // Backend uses 'runtime'
  releaseDate: string | Date;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  originalLanguage: string;
  spokenLanguages: string[];
  languageType: LanguageType;
  productionCountry: string;
  ageRating: AgeRating;
  director: string;
  cast: MovieCast[]; // Backend expects array of objects
  genreIds: string[];
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
  district?: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude?: number; // Backend uses flat structure, not nested
  longitude?: number; // Backend uses flat structure, not nested
  description?: string;
  amenities?: string[];
  facilities?: Record<string, any>;
  images?: string[];
  virtualTour360Url?: string;
  operatingHours?: Record<string, any>;
  socialMedia?: Record<string, any>;
  timezone?: string;
  status?: string;
  rating?: number;
  totalReviews?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateCinemaRequest {
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude?: number; // Flat structure to match backend
  longitude?: number; // Flat structure to match backend
  description?: string;
  amenities?: string[];
  facilities?: Record<string, any>;
  images?: string[];
  virtualTour360Url?: string;
  operatingHours?: Record<string, any>;
  socialMedia?: Record<string, any>;
  timezone?: string;
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

export type HallType = 'STANDARD' | 'VIP' | 'IMAX' | 'FOUR_DX' | 'PREMIUM';
export type LayoutType = 'STANDARD' | 'CUSTOM';
export type SeatType = 'STANDARD' | 'VIP' | 'COUPLE' | 'PREMIUM' | 'WHEELCHAIR';
export type SeatStatus = 'ACTIVE' | 'BROKEN' | 'MAINTENANCE'; // Backend uses these statuses

export interface Seat {
  id: string;
  rowLetter: string; // Backend uses rowLetter not rowLabel
  seatNumber: number;
  type: SeatType;
  status: SeatStatus;
}

export interface PhysicalSeatRow {
  row: string;
  seats: Seat[];
}

export interface Hall {
  id: string;
  cinemaId: string;
  cinema?: Cinema;
  name: string;
  type: HallType;
  capacity: number; // Calculated from seatMap
  rows: number; // Calculated from seatMap
  screenType?: string;
  soundSystem?: string;
  features?: string[];
  layoutType?: LayoutType;
  status?: string;
  seatMap?: PhysicalSeatRow[]; // Backend returns seatMap as array of rows
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateHallRequest {
  cinemaId: string;
  name: string;
  type: HallType;
  screenType?: string;
  soundSystem?: string;
  features?: string[];
  layoutType?: LayoutType;
}

export type UpdateHallRequest = Partial<Omit<CreateHallRequest, 'cinemaId'>>;

export interface UpdateSeatStatusRequest {
  status: SeatStatus;
}

// ============================================================================
// SHOWTIME TYPES (API 5.x)
// ============================================================================

export type ShowtimeFormat = 'TWO_D' | 'THREE_D' | 'IMAX' | 'FOUR_DX'; // Backend uses these formats

export interface Showtime {
  id: string;
  movieId: string;
  movie?: Movie;
  movieReleaseId: string; // Backend requires this
  cinemaId: string;
  cinema?: Cinema;
  hallId: string;
  hall?: Hall;
  startTime: string; // ISO datetime or 'yyyy-MM-dd HH:mm:ss'
  endTime?: string;
  format: ShowtimeFormat;
  language: string; // Backend uses string, not enum
  subtitles?: string[]; // Backend has subtitles field
  availableSeats?: number;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateShowtimeRequest {
  movieId: string;
  movieReleaseId: string; // Backend requires this
  cinemaId: string;
  hallId: string;
  startTime: string; // Format: 'yyyy-MM-dd HH:mm:ss'
  format: ShowtimeFormat;
  language: string;
  subtitles?: string[];
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
  movieReleaseId: string; // Backend requires this
  cinemaId: string;
  hallId: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  timeSlots: string[]; // ["10:00", "14:30", "19:00"]
  format: ShowtimeFormat;
  language: string;
  subtitles?: string[];
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
  cinemaId?: string; // Backend might not always return this
  cinema?: Cinema;
  startDate: string | Date;
  endDate: string | Date;
  status?: 'UPCOMING' | 'ACTIVE' | 'ENDED'; // Calculated field, not in request
  note?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateMovieReleaseRequest {
  movieId?: string; // Optional in backend
  cinemaId?: string; // Note: Backend schema doesn't have cinemaId, only movieId
  startDate: string | Date;
  endDate: string | Date;
  note?: string;
}

export type UpdateMovieReleaseRequest = Partial<CreateMovieReleaseRequest>;

// ============================================================================
// TICKET PRICING TYPES (API 7.x)
// ============================================================================

export type DayType = 'WEEKDAY' | 'WEEKEND' | 'HOLIDAY';

export interface TicketPricing {
  id: string;
  hallId: string;
  hall?: Hall;
  seatType: SeatType;
  dayType: DayType; // Backend uses dayType (WEEKDAY/WEEKEND/HOLIDAY)
  price: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UpdateTicketPricingRequest {
  price: number; // Backend only allows updating price
}

export interface TicketPricingFiltersParams {
  hallId?: string;
  seatType?: SeatType;
  dayType?: DayType;
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

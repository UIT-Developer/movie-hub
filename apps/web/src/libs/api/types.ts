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

export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | 'C'; // Vietnam age ratings
export type LanguageType = 'ORIGINAL' | 'SUBTITLE' | 'DUBBED';

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
  genre?: Genre; // Backend returns single 'genre' object, not array
  averageRating?: number;
  reviewCount?: number;
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
  facilities?: Record<string, unknown>;
  images?: string[];
  virtualTour360Url?: string;
  operatingHours?: Record<string, unknown>;
  socialMedia?: Record<string, unknown>;
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
  facilities?: Record<string, unknown>;
  images?: string[];
  virtualTour360Url?: string;
  operatingHours?: Record<string, unknown>;
  socialMedia?: Record<string, unknown>;
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
export type LayoutType = 'STANDARD' | 'DUAL_AISLE' | 'STADIUM';
export type SeatType = 'STANDARD' | 'VIP' | 'COUPLE' | 'PREMIUM' | 'WHEELCHAIR';
export type SeatStatus = 'ACTIVE' | 'BROKEN' | 'MAINTENANCE';

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
  startTime: string; // ISO datetime format (per OpenAPI date-time)
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
  movieId?: string; // Optional per BE DTO
  cinemaId?: string; // Backend schema doesn't have cinemaId in create request
  startDate: string | Date;
  endDate: string | Date;
  note?: string; // Optional per BE DTO
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
// STAFF TYPES (API 8.x)
// ============================================================================

export type Gender = 'MALE' | 'FEMALE';
export type StaffStatus = 'ACTIVE' | 'INACTIVE';
export type WorkType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
export type ShiftType = 'MORNING' | 'AFTERNOON' | 'NIGHT';

export type StaffPosition = 
  | 'CINEMA_MANAGER' 
  | 'ASSISTANT_MANAGER' 
  | 'TICKET_CLERK' 
  | 'CONCESSION_STAFF' 
  | 'USHER' 
  | 'PROJECTIONIST' 
  | 'CLEANER' 
  | 'SECURITY';

export interface Staff {
  id: string;
  cinemaId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: string | Date;
  position: StaffPosition;
  status: StaffStatus;
  workType: WorkType;
  shiftType: ShiftType;
  salary: number;
  hireDate: string | Date;
}

export interface CreateStaffRequest {
  cinemaId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: string | Date;
  position: StaffPosition;
  status: StaffStatus;
  workType: WorkType;
  shiftType: ShiftType;
  salary: number;
  hireDate: string | Date;
}

export interface CreateStaffResponse {
  id: string;
  cinemaId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: string | Date;
  position: StaffPosition;
  status: StaffStatus;
  workType: WorkType;
  shiftType: ShiftType;
  salary: number;
  hireDate: string | Date;
  createdAt: string | Date;
}

export interface UpdateStaffRequest {
  fullName?: string;
  phone?: string;
  gender?: Gender;
  dob?: string | Date;
  position?: StaffPosition;
  status?: StaffStatus;
  workType?: WorkType;
  shiftType?: ShiftType;
  salary?: number;
  hireDate?: string | Date;
}

export interface UpdateStaffResponse {
  id: string;
  cinemaId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: string | Date;
  position: StaffPosition;
  status: StaffStatus;
  workType: WorkType;
  shiftType: ShiftType;
  salary: number;
  hireDate: string | Date;
  updatedAt: string | Date;
}

export type GetStaffResponse = PaginatedResponse<Staff>;

export interface DeleteStaffResponse {
  success: boolean;
  message?: string;
}

export interface StaffFiltersParams extends PaginationParams {
  cinemaId?: string;
  fullName?: string;
  gender?: Gender;
  position?: StaffPosition;
  status?: StaffStatus;
  workType?: WorkType;
  shiftType?: ShiftType;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// BOOKING/RESERVATION TYPES (API 9.x - Admin)
// ============================================================================

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'EXPIRED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface SeatInfo {
  seatId: string;
  row: string;
  number: number;
  seatType: string;
  ticketType: string;
  price: number;
}

export interface ConcessionInfo {
  concessionId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BookingSummary {
  id: string;
  bookingCode: string;
  showtimeId: string;
  movieTitle: string;
  cinemaName: string;
  hallName: string;
  startTime: string | Date;
  seatCount: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string | Date;
}

export interface BookingDetail extends BookingSummary {
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  seats: SeatInfo[];
  concessions?: ConcessionInfo[];
  subtotal: number;
  discount: number;
  pointsUsed: number;
  pointsDiscount: number;
  finalAmount: number;
  promotionCode?: string;
  paymentStatus: PaymentStatus;
  expiresAt?: string | Date;
  cancelledAt?: string | Date;
  cancellationReason?: string;
  updatedAt: string | Date;
}

export type GetBookingsResponse = PaginatedResponse<BookingSummary>;

export type GetBookingDetailResponse = BookingDetail;

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
  reason?: string;
}

export interface UpdateBookingStatusResponse {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  updatedAt: string | Date;
}

export interface ConfirmBookingResponse {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  confirmedAt: string | Date;
}

export interface BookingFiltersParams extends PaginationParams {
  userId?: string;
  showtimeId?: string;
  cinemaId?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string | Date;
  endDate?: string | Date;
  sortBy?: 'created_at' | 'final_amount' | 'expires_at';
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// REVIEW TYPES (API 10.x)
// ============================================================================

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  content: string;
  createdAt: string | Date;
}

export type GetReviewsResponse = PaginatedResponse<Review>;

export interface DeleteReviewResponse {
  success: boolean;
  message?: string;
}

export interface ReviewFiltersParams extends PaginationParams {
  rating?: number;
  userId?: string;
  movieId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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

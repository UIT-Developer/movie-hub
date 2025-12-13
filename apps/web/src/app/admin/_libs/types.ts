// Admin Types - Cinema Management System

export type CinemaStatus = 'ACTIVE' | 'MAINTENANCE' | 'CLOSED';
export type HallType = 'STANDARD' | 'PREMIUM' | 'IMAX' | 'FOUR_DX';
export type HallStatus = 'ACTIVE' | 'MAINTENANCE' | 'CLOSED';
export type LayoutType = 'STANDARD' | 'DUAL_AISLE' | 'STADIUM';
export type SeatType = 'STANDARD' | 'VIP' | 'COUPLE' | 'PREMIUM' | 'WHEELCHAIR';
export type ShowtimeStatus = 'SELLING' | 'STOPPED' | 'CANCELLED';
export type ShowtimeFormat = 'TWO_D' | 'THREE_D' | 'IMAX' | 'FOUR_DX';
export type DayType = 'WEEKDAY' | 'WEEKEND' | 'HOLIDAY';
export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | 'C';
export type LanguageType = 'ORIGINAL' | 'SUBTITLE' | 'DUBBED';
export type MovieStatus = 'now_showing' | 'upcoming';

// Generic object type to replace any
type GenericObject = Record<string, unknown>;

export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  amenities: string[];
  facilities?: GenericObject;
  images: string[];
  virtualTour360Url?: string;
  rating?: number;
  totalReviews: number;
  operatingHours?: GenericObject;
  socialMedia?: GenericObject;
  status: CinemaStatus;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCinemaRequest {
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  amenities?: string[];
  facilities?: GenericObject;
  images?: string[];
  virtualTour360Url?: string;
  operatingHours?: GenericObject;
  socialMedia?: GenericObject;
  timezone: string;
}

export interface Hall {
  id: string;
  cinemaId: string;
  name: string;
  type: HallType;
  capacity: number;
  rows: number;
  screenType?: string;
  soundSystem?: string;
  features: string[];
  layoutType?: LayoutType;
  status: HallStatus;
  createdAt: string;
  updatedAt: string;
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

export interface UpdateHallRequest {
  name?: string;
  type?: HallType;
  screenType?: string;
  soundSystem?: string;
  features?: string[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface MovieCast {
  name: string;
  profileUrl?: string;
}

export interface MovieSummary {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  runtime: number;
  ageRating: AgeRating;
  productionCountry: string;
  languageType: LanguageType;
}

export interface Movie extends MovieSummary {
  originalTitle?: string;
  overview: string;
  cast: MovieCast[];
  trailerUrl?: string;
  originalLanguage: string;
  spokenLanguages: string[];
  genre: Genre[];
  releaseDate: string;
  director?: string;
  status?: MovieStatus;
}

export interface CreateMovieDto {
  title: string;
  overview: string;
  originalTitle?: string;
  posterUrl: string;
  trailerUrl?: string;
  backdropUrl?: string;
  runtime: number;
  releaseDate: string;
  ageRating: AgeRating;
  originalLanguage: string;
  spokenLanguages: string[];
  languageType: LanguageType;
  productionCountry: string;
  director?: string;
  cast: MovieCast[];
  genreIds: string[];
}

export interface Showtime {
  id: string;
  movieId: string;
  movieReleaseId: string;
  cinemaId: string;
  hallId: string;
  startTime: string;
  endTime: string;
  format: ShowtimeFormat;
  language: string;
  subtitles: string[];
  availableSeats: number;
  totalSeats: number;
  status: ShowtimeStatus;
  dayType: DayType;
  createdAt: string;
  updatedAt: string;
  // Nested relations (optional for expanded queries)
  movieRelease?: {
    movie?: {
      title?: string;
    };
  };
  hall?: {
    name?: string;
  };
  cinema?: {
    name?: string;
  };
}

export interface CreateShowtimeRequest {
  movieId: string;
  movieReleaseId: string;
  cinemaId: string;
  hallId: string;
  startTime: string;
  format: ShowtimeFormat;
  language: string;
  subtitles: string[];
}

export interface UpdateShowtimeRequest {
  movieId?: string;
  movieReleaseId?: string;
  cinemaId?: string;
  hallId?: string;
  startTime?: string;
  format?: ShowtimeFormat;
  language?: string;
  subtitles?: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  hiredAt: string;
  status: string;
  locationId: string;
}

export interface MovieRelease {
  id: string;
  movieId: string;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'ENDED';
  note: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Seat types
export type SeatStatus = 'ACTIVE' | 'MAINTENANCE' | 'BROKEN';
export type ShowtimeSeatStatus = 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'LOCKED';

export interface Seat {
  id: string;
  hallId: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ShowtimeSeat {
  id: string;
  showtimeId: string;
  seatId: string;
  status: ShowtimeSeatStatus;
  price: number;
  seat?: Seat;
  createdAt: string;
  updatedAt: string;
}

export interface TicketPricing {
  id: string;
  hallId: string;
  seatType: SeatType;
  dayType: DayType;
  format?: ShowtimeFormat;
  price: number;
  createdAt: string;
  updatedAt: string;
  // Optional nested relations
  hall?: {
    name?: string;
    cinema?: {
      name?: string;
    };
  };
}

// ============================================
// Batch Showtimes Types
// ============================================

export interface BatchCreateShowtimesInput {
  movieId: string;
  movieReleaseId: string;
  cinemaId: string;
  hallId: string;
  startDate: string;
  endDate: string;
  timeSlots: string[];
  repeatType: 'DAILY' | 'WEEKLY' | 'CUSTOM_WEEKDAYS';
  weekdays?: number[];
  format: string;
  language: string;
  subtitles: string[];
}

export interface BatchCreateResponse {
  createdCount: number;
  skippedCount: number;
  created: Array<{
    id: string;
    startTime: string;
  }>;
  skipped: Array<{
    start: string;
    reason: string;
  }>;
}

// ============================================
// Seat Status Types  
// ============================================

export interface SeatDetail {
  id: string;
  row: number;
  seatNumber: number;
  type: SeatType;
  status: SeatStatus;
}

export interface HallDetail {
  id: string;
  name: string;
  type: string;
  capacity: number;
  rows: number;
  status: string;
  seats: SeatDetail[];
}

// ============================================
// Settings Types
// ============================================

export interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  bookingAlerts: boolean;
  revenueReports: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginNotifications: boolean;
  ipWhitelist: string[];
  lastPasswordChange: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  debugMode: boolean;
  apiRateLimit: number;
  maxUploadSize: number;
  cacheEnabled: boolean;
  cacheTTL: number;
  backupFrequency: string;
  logRetention: number;
}

export interface BillingSettings {
  companyName: string;
  taxId: string;
  billingEmail: string;
  billingAddress: string;
  paymentMethod: string;
  autoRenewal: boolean;
  currentPlan: string;
  nextBillingDate: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
  sidebarCollapsed: boolean;
}

// ============================================
// Showtime Seats Types
// ============================================

export type ReservationStatus = 'AVAILABLE' | 'HELD' | 'RESERVED' | 'SOLD';

export interface ShowtimeSeatDetail {
  id: string;
  number: number;
  seatType: SeatType;
  seatStatus: SeatStatus;
  reservationStatus: ReservationStatus;
  isHeldByCurrentUser: boolean | null;
}

export interface SeatRow {
  row: string;
  seats: ShowtimeSeatDetail[];
}

export interface ShowtimeInfo {
  id: string;
  movieId: string;
  movieTitle: string;
  start_time: string;
  end_time: string;
  dateType: DayType;
  format: string;
  language: string;
  subtitles: string[];
}

export interface TicketPrice {
  seatType: SeatType;
  price: number;
}

export interface ShowtimeSeatsData {
  showtime: ShowtimeInfo;
  cinemaId: string;
  cinemaName: string;
  hallId: string;
  hallName: string;
  layoutType: string;
  seat_map: SeatRow[];
  ticketPrices: TicketPrice[];
  rules: {
    max_selectable: number;
    hold_time_seconds: number;
  };
}

// ============================================
// Ticket Pricing Page Types
// ============================================

export interface TicketPricingItem {
  id: string;
  hallId: string;
  seatType: SeatType;
  dayType: DayType;
  price: number;
}

import { api } from './api-client';
import type {
  Movie,
  CreateMovieRequest,
  UpdateMovieRequest,
  MoviesListParams,
  Genre,
  CreateGenreRequest,
  UpdateGenreRequest,
  Cinema,
  CreateCinemaRequest,
  UpdateCinemaRequest,
  CinemaFiltersParams,
  GetCinemasResponse,
  Hall,
  CreateHallRequest,
  UpdateHallRequest,
  UpdateSeatStatusRequest,
  CinemasGroupedResponse,
  Showtime,
  CreateShowtimeRequest,
  UpdateShowtimeRequest,
  ShowtimeFiltersParams,
  BatchCreateShowtimesRequest,
  ShowtimeSeat,
  MovieRelease,
  CreateMovieReleaseRequest,
  UpdateMovieReleaseRequest,
  MovieReleasesListParams,
  TicketPricing,
  UpdateTicketPricingRequest,
  TicketPricingFiltersParams,
  Staff,
  CreateStaffRequest,
  UpdateStaffRequest,
  StaffFiltersParams,
  BookingSummary,
  BookingDetail,
  BookingStatus,
  BookingFiltersParams,
  UpdateBookingStatusRequest,
  Review,
  ReviewFiltersParams,
} from './types';

// ============================================================================
// MOVIES API (1.x)
// ============================================================================

export const moviesApi = {
  getAll: (params?: MoviesListParams) =>
    api.get<Movie[]>('/api/v1/movies', { params }),

  getById: (id: string) =>
    api.get<Movie>(`/api/v1/movies/${id}`),

  create: (data: CreateMovieRequest) =>
    api.post<Movie>('/api/v1/movies', data),

  update: (id: string, data: UpdateMovieRequest) =>
    api.put<Movie>(`/api/v1/movies/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/movies/${id}`),
};

// ============================================================================
// GENRES API (2.x)
// ============================================================================

export const genresApi = {
  getAll: () =>
    api.get<Genre[]>('/api/v1/genres'),

  getById: (id: string) =>
    api.get<Genre>(`/api/v1/genres/${id}`),

  create: (data: CreateGenreRequest) =>
    api.post<Genre>('/api/v1/genres', data),

  update: (id: string, data: UpdateGenreRequest) =>
    api.put<Genre>(`/api/v1/genres/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/genres/${id}`),
};

// ============================================================================
// CINEMAS API (3.x)
// ============================================================================

export const cinemasApi = {
  getAll: async (params?: CinemaFiltersParams): Promise<Cinema[]> => {
    const response = await api.get<GetCinemasResponse>(
      '/api/v1/cinemas/filters',
      { params }
    );
    return response.cinemas;
  },

  getById: (id: string) =>
    api.get<Cinema>(`/api/v1/cinemas/${id}`),

  create: (data: CreateCinemaRequest) =>
    api.post<Cinema>('/api/v1/cinemas/cinema', data),

  update: (cinemaId: string, data: UpdateCinemaRequest) =>
    api.patch<Cinema>(`/api/v1/cinemas/cinema/${cinemaId}`, data),

  delete: (cinemaId: string) =>
    api.delete(`/api/v1/cinemas/cinema/${cinemaId}`),
};

// ============================================================================
// HALLS API (4.x & 5.x)
// ============================================================================

export const hallsApi = {
  getById: (hallId: string) =>
    api.get<Hall>(`/api/v1/halls/hall/${hallId}`),

  getByCinema: (cinemaId: string) =>
    api.get<Hall[]>(`/api/v1/halls/cinema/${cinemaId}`),

  // Workaround for getting all halls grouped by cinema
  getAllGroupedByCinema: async (): Promise<CinemasGroupedResponse> => {
    const cinemas = await cinemasApi.getAll();
    const result: CinemasGroupedResponse = {};

    await Promise.all(
      cinemas.map(async (cinema) => {
        const halls = await hallsApi.getByCinema(cinema.id);
        result[cinema.id] = { cinema, halls };
      })
    );

    return result;
  },

  create: (data: CreateHallRequest) =>
    api.post<Hall>('/api/v1/halls/hall', data),

  update: (hallId: string, data: UpdateHallRequest) =>
    api.patch<Hall>(`/api/v1/halls/hall/${hallId}`, data),

  delete: (hallId: string) =>
    api.delete(`/api/v1/halls/hall/${hallId}`),

  updateSeatStatus: (seatId: string, data: UpdateSeatStatusRequest) =>
    api.patch<void>(`/api/v1/halls/seat/${seatId}/status`, data),
};

// ============================================================================
// SHOWTIMES API (5.x)
// ============================================================================

export const showtimesApi = {
  // Workaround for flexible filtering
  getWithFilters: async (filters: ShowtimeFiltersParams): Promise<Showtime[]> => {
    const { cinemaId, movieId, date, hallId } = filters;

    // If both cinemaId and movieId provided, use the specific endpoint
    if (cinemaId && movieId) {
      const params = date ? { date } : {};
      return api.get<Showtime[]>(
        `/api/v1/cinemas/${cinemaId}/movies/${movieId}/showtimes/admin`,
        { params }
      );
    }

    // Otherwise, fetch all combinations and filter client-side
    const cinemas = cinemaId ? [{ id: cinemaId }] : await cinemasApi.getAll();
    const movies = movieId ? [{ id: movieId }] : await moviesApi.getAll();

    const allShowtimes: Showtime[] = [];

    await Promise.all(
      cinemas.map(async (cinema) => {
        await Promise.all(
          movies.map(async (movie) => {
            try {
              const params = date ? { date } : {};
              const showtimes = await api.get<Showtime[]>(
                `/api/v1/cinemas/${cinema.id}/movies/${movie.id}/showtimes/admin`,
                { params }
              );
              allShowtimes.push(...showtimes);
            } catch {
              // Skip if no showtimes found for this combination
            }
          })
        );
      })
    );

    // Filter by hallId if provided
    return hallId
      ? allShowtimes.filter((st) => st.hallId === hallId)
      : allShowtimes;
  },

  getById: (id: string) =>
    api.get<Showtime>(`/api/v1/showtimes/${id}`),

  // Backend endpoint: POST /api/v1/showtimes/showtime
  create: (data: CreateShowtimeRequest) =>
    api.post<Showtime>('/api/v1/showtimes/showtime', data),

  // Backend endpoint: PATCH /api/v1/showtimes/showtime/:id
  update: (id: string, data: UpdateShowtimeRequest) =>
    api.patch<Showtime>(`/api/v1/showtimes/showtime/${id}`, data),

  // Backend endpoint: DELETE /api/v1/showtimes/showtime/:id
  delete: (id: string) =>
    api.delete(`/api/v1/showtimes/showtime/${id}`),

  // Backend endpoint: POST /api/v1/showtimes/batch
  batchCreate: (data: BatchCreateShowtimesRequest) =>
    api.post<Showtime[]>('/api/v1/showtimes/batch', data),

  // Backend endpoint: GET /api/v1/showtimes/:id/seats
  getSeats: (showtimeId: string) =>
    api.get<ShowtimeSeat[]>(`/api/v1/showtimes/${showtimeId}/seats`),

  updateSeatStatus: (seatId: string, data: UpdateSeatStatusRequest) =>
    api.patch(`/api/v1/seats/${seatId}`, data),
};

// ============================================================================
// MOVIE RELEASES API (6.x)
// ============================================================================

export const movieReleasesApi = {
  getAll: (params?: MovieReleasesListParams) =>
    api.get<MovieRelease[]>('/api/v1/movie-releases', { params }),

  getById: (id: string) =>
    api.get<MovieRelease>(`/api/v1/movie-releases/${id}`),

  create: (data: CreateMovieReleaseRequest) =>
    api.post<MovieRelease>('/api/v1/movie-releases', data),

  // Backend uses PUT not PATCH
  update: (id: string, data: UpdateMovieReleaseRequest) =>
    api.put<MovieRelease>(`/api/v1/movie-releases/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/movie-releases/${id}`),
};

// ============================================================================
// TICKET PRICING API (7.x)
// ============================================================================

export const ticketPricingApi = {
  // Backend endpoint: GET /api/v1/ticket-pricings/hall/:hallId
  getAll: (params?: TicketPricingFiltersParams): Promise<TicketPricing[]> => {
    if (params?.hallId) {
      return api.get<TicketPricing[]>(`/api/v1/ticket-pricings/hall/${params.hallId}`);
    }
    // If no hallId, return empty array (consider implementing fetch for all halls if needed)
    return Promise.resolve([] as TicketPricing[]);
  },

  getByHall: (hallId: string) =>
    api.get<TicketPricing[]>(`/api/v1/ticket-pricings/hall/${hallId}`),

  // Backend endpoint: PATCH /api/v1/ticket-pricings/pricing/:pricingId
  update: (pricingId: string, data: UpdateTicketPricingRequest) =>
    api.patch<TicketPricing>(`/api/v1/ticket-pricings/pricing/${pricingId}`, data),
};

// ============================================================================
// STAFF API (8.x)
// ============================================================================

export const staffApi = {
  getAll: (params?: StaffFiltersParams) =>
    api.get<Staff[]>('/api/v1/staffs', { params }),

  getById: (id: string) =>
    api.get<Staff>(`/api/v1/staffs/${id}`),

  create: (data: CreateStaffRequest) =>
    api.post<Staff>('/api/v1/staffs', data),

  update: (id: string, data: UpdateStaffRequest) =>
    api.put<Staff>(`/api/v1/staffs/${id}`, data),

  // Note: Backend might not have DELETE endpoint, adjust if needed
  delete: (id: string) =>
    api.delete(`/api/v1/staffs/${id}`),
};

// ============================================================================
// BOOKING/RESERVATION API (9.x - Admin)
// ============================================================================

export const bookingsApi = {
  // Admin: Get all bookings with filters
  getAll: (params?: BookingFiltersParams) =>
    api.get<BookingSummary[]>('/api/v1/bookings/admin/all', { params }),

  // Get booking detail
  getById: (id: string) =>
    api.get<BookingDetail>(`/api/v1/bookings/${id}/summary`),

  // Get bookings by showtime
  getByShowtime: (showtimeId: string, status?: BookingStatus) =>
    api.get<BookingSummary[]>(`/api/v1/bookings/admin/showtime/${showtimeId}`, {
      params: status ? { status } : undefined,
    }),

  // Get bookings by date range
  getByDateRange: (startDate: string | Date, endDate: string | Date, status?: BookingStatus) =>
    api.get<BookingSummary[]>('/api/v1/bookings/admin/date-range', {
      params: { startDate, endDate, status },
    }),

  // Update booking status
  updateStatus: (bookingId: string, data: UpdateBookingStatusRequest) =>
    api.put<BookingDetail>(`/api/v1/bookings/admin/${bookingId}/status`, data),

  // Confirm booking
  confirm: (bookingId: string) =>
    api.post<BookingDetail>(`/api/v1/bookings/admin/${bookingId}/confirm`),
};

// ============================================================================
// REVIEWS API (10.x)
// ============================================================================

export const reviewsApi = {
  getAll: (params?: ReviewFiltersParams) =>
    api.get<Review[]>('/api/v1/reviews', { params }),

  delete: (id: string) =>
    api.delete(`/api/v1/reviews/${id}`),
};

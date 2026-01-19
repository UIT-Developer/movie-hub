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
  ShowtimeSeatResponse,
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
  Concession,
  CreateConcessionRequest,
  UpdateConcessionRequest,
  SystemConfig,
  UpdateSystemConfigRequest,
  CreateReviewRequest,
  UpdateReviewRequest,
  Promotion,
  CreatePromotionRequest,
  UpdatePromotionRequest,
  PromotionFiltersParams,
} from './types';

// ============================================================================
// MOVIES API (1.x)
// ============================================================================

export const moviesApi = {
  getAll: (params?: MoviesListParams) =>
    api.get<Movie[]>('/movies', { params }),

  getById: (id: string) => api.get<Movie>(`/movies/${id}`),

  create: (data: CreateMovieRequest) => api.post<Movie>('/movies', data),

  update: (id: string, data: UpdateMovieRequest) =>
    api.put<Movie>(`/movies/${id}`, data),

  delete: (id: string) => api.delete(`/movies/${id}`),

  // Reviews
  getReviews: (movieId: string, params?: ReviewFiltersParams) =>
    api.get<Review[]>(`/movies/${movieId}/reviews`, { params }),

  createReview: (movieId: string, data: CreateReviewRequest) =>
    api.post<Review>(`/movies/${movieId}/reviews`, data),

  updateReview: (
    movieId: string,
    reviewId: string,
    data: UpdateReviewRequest
  ) => api.put<Review>(`/movies/${movieId}/reviews/${reviewId}`, data),
};

// ============================================================================
// GENRES API (2.x)
// ============================================================================

export const genresApi = {
  getAll: () => api.get<Genre[]>('/genres'),

  getById: (id: string) => api.get<Genre>(`/genres/${id}`),

  create: (data: CreateGenreRequest) => api.post<Genre>('/genres', data),

  update: (id: string, data: UpdateGenreRequest) =>
    api.put<Genre>(`/genres/${id}`, data),

  delete: (id: string) => api.delete(`/genres/${id}`),
};

// ============================================================================
// CINEMAS API (3.x)
// ============================================================================

export const cinemasApi = {
  getAll: async (params?: CinemaFiltersParams): Promise<Cinema[]> => {
    const response = await api.get<Cinema[]>('/cinemas', { params });
    return response || [];
  },

  getById: (id: string) => api.get<Cinema>(`/cinemas/${id}`),

  create: (data: CreateCinemaRequest) =>
    api.post<Cinema>('/cinemas/cinema', data),

  update: (cinemaId: string, data: UpdateCinemaRequest) =>
    api.patch<Cinema>(`/cinemas/cinema/${cinemaId}`, data),

  delete: (cinemaId: string) =>
    api.delete(`/cinemas/cinema/${cinemaId}`),
};

// ============================================================================
// HALLS API (4.x & 5.x)
// ============================================================================

export const hallsApi = {
  getById: (hallId: string) => api.get<Hall>(`/halls/hall/${hallId}`),

  getByCinema: (cinemaId: string) =>
    api.get<Hall[]>(`/halls/cinema/${cinemaId}`),

  // Workaround for getting all halls grouped by cinema
  getAllGroupedByCinema: async (): Promise<CinemasGroupedResponse> => {
    const cinemas = await cinemasApi.getAll();
    const result: CinemasGroupedResponse = {};

    await Promise.all(
      cinemas.map(async (cinema) => {
        try {
          const halls = await hallsApi.getByCinema(cinema.id);
          // Ensure each hall has cinemaId set (in case BE doesn't return it)
          const hallsWithCinemaId = (halls || []).map((hall) => ({
            ...hall,
            cinemaId: hall.cinemaId || cinema.id,
          }));
          result[cinema.id] = { cinema, halls: hallsWithCinemaId };
        } catch {
          // Skip if error fetching halls for this cinema
          result[cinema.id] = { cinema, halls: [] };
        }
      })
    );

    return result;
  },

  create: (data: CreateHallRequest) =>
    api.post<Hall>('/halls/hall', data),

  update: (hallId: string, data: UpdateHallRequest) =>
    api.patch<Hall>(`/halls/hall/${hallId}`, data),

  delete: (hallId: string) => api.delete(`/halls/hall/${hallId}`),

  updateSeatStatus: (seatId: string, data: UpdateSeatStatusRequest) =>
    api.patch<void>(`/halls/seat/${seatId}/status`, data),
};

// ============================================================================
// SHOWTIMES API (5.x)
// ============================================================================

export const showtimesApi = {
  // Use BE endpoint with proper filters
  getWithFilters: async (
    filters: ShowtimeFiltersParams
  ): Promise<Showtime[]> => {
    const { cinemaId, movieId, date, hallId } = filters;

    // Build query params for BE endpoint
    const params: Record<string, string> = {};
    if (cinemaId) params.cinemaId = cinemaId;
    if (movieId) params.movieId = movieId;
    if (date) params.date = date;
    if (hallId) params.hallId = hallId;

    try {
      console.log('[ShowtimesAPI] Fetching showtimes with filters:', {
        filters,
        params,
      });
      // Call BE GET /api/v1/showtimes with filters
      const result = await api.get<Showtime[]>('/showtimes', { params });
      console.log('[ShowtimesAPI] Got showtimes:', result);
      return result || [];
    } catch (error) {
      console.error('[ShowtimesAPI] Error fetching showtimes:', error);
      return [];
    }
  },

  getById: (id: string) => api.get<Showtime>(`/showtimes/${id}`),

  // Backend endpoint: POST /api/v1/showtimes/showtime
  create: (data: CreateShowtimeRequest) =>
    api.post<Showtime>('/showtimes/showtime', data),

  // Backend endpoint: PATCH /api/v1/showtimes/showtime/:id
  update: (id: string, data: UpdateShowtimeRequest) =>
    api.patch<Showtime>(`/showtimes/showtime/${id}`, data),

  // Backend endpoint: DELETE /api/v1/showtimes/showtime/:id
  delete: (id: string) => api.delete(`/showtimes/showtime/${id}`),

  // Backend endpoint: POST /api/v1/showtimes/batch
  batchCreate: (data: BatchCreateShowtimesRequest) =>
    api.post<Showtime[]>('/showtimes/batch', data),

  // Backend endpoint: GET /api/v1/showtimes/:id/seats
  getSeats: (showtimeId: string) =>
    api.get<ShowtimeSeatResponse>(`/showtimes/${showtimeId}/seats`),

  updateSeatStatus: (seatId: string, data: UpdateSeatStatusRequest) =>
    api.patch(`/seats/${seatId}`, data),
};

// ============================================================================
// MOVIE RELEASES API (6.x)
// ============================================================================

export const movieReleasesApi = {
  getAll: async (params?: MovieReleasesListParams): Promise<MovieRelease[]> => {
    // When movieId is provided, fetch releases for that specific movie
    if (params?.movieId) {
      return api.get<MovieRelease[]>(
        `/movies/${params.movieId}/releases`
      );
    }

    // Otherwise, fetch all movies and then fetch releases for each
    // (Workaround for missing GET /api/v1/movie-releases endpoint)
    let movies: Movie[] = [];

    try {
      movies = await moviesApi.getAll();
    } catch (error) {
      console.warn('[MovieReleasesAPI] Failed to fetch movies list:', error);
      // Continue anyway - we can still fetch releases by iterating through them individually
      // This fallback won't work for the full list, but is better than complete failure
      return [];
    }

    const allReleases: MovieRelease[] = [];

    // Fetch releases for each movie and combine
    for (const movie of movies) {
      try {
        const releases = await api.get<MovieRelease[]>(
          `/movies/${movie.id}/releases`
        );
        // Enrich releases with movie data so dialog can populate fields
        const enrichedReleases = (releases || []).map((r) => ({
          ...r,
          // Ensure movieId is present for FE usage; backend may omit it
          movieId: r.movieId || movie.id,
          movie, // Include full movie object
        }));
        allReleases.push(...enrichedReleases);
      } catch {
        // Skip if error fetching for this movie
        console.warn(
          `[MovieReleasesAPI] Failed to fetch releases for movie ${movie.id}`
        );
      }
    }

    return allReleases;
  },

  getById: async (id: string): Promise<MovieRelease | null> => {
    try {
      const release = await api.get<MovieRelease>(
        `/movie-releases/${id}`
      );

      // Enrich with movie data if movieId is present and movie is not already loaded
      if (release && release.movieId && !release.movie) {
        try {
          const movie = await moviesApi.getById(release.movieId);
          if (movie) {
            return { ...release, movie };
          }
        } catch {
          // If movie fetch fails, return release without movie data
          console.warn(
            `[MovieReleasesAPI] Failed to fetch movie details for release ${id}`
          );
        }
      }

      return release;
    } catch {
      return null;
    }
  },

  create: (data: CreateMovieReleaseRequest) =>
    api.post<MovieRelease>('/movie-releases', data),

  // Backend uses PUT not PATCH
  update: (id: string, data: UpdateMovieReleaseRequest) =>
    api.put<MovieRelease>(`/movie-releases/${id}`, data),

  delete: (id: string) => api.delete(`/movie-releases/${id}`),
};

// ============================================================================
// TICKET PRICING API (7.x)
// ============================================================================

export const ticketPricingApi = {
  // Backend endpoint: GET /api/v1/ticket-pricings/hall/:hallId
  getAll: (params?: TicketPricingFiltersParams): Promise<TicketPricing[]> => {
    if (params?.hallId) {
      return api.get<TicketPricing[]>(
        `/ticket-pricings/hall/${params.hallId}`
      );
    }
    // If no hallId, return empty array (consider implementing fetch for all halls if needed)
    return Promise.resolve([] as TicketPricing[]);
  },

  getByHall: (hallId: string) =>
    api.get<TicketPricing[]>(`/ticket-pricings/hall/${hallId}`),

  // Backend endpoint: PATCH /api/v1/ticket-pricings/pricing/:pricingId
  update: (pricingId: string, data: UpdateTicketPricingRequest) =>
    api.patch<TicketPricing>(
      `/ticket-pricings/pricing/${pricingId}`,
      data
    ),
};

// ============================================================================
// STAFF API (8.x)
// ============================================================================

export const staffApi = {
  getAll: (params?: StaffFiltersParams) =>
    api.get<Staff[]>('/staffs', { params }),

  getById: (id: string) => api.get<Staff>(`/staffs/${id}`),

  create: (data: CreateStaffRequest) => api.post<Staff>('/staffs', data),

  update: (id: string, data: UpdateStaffRequest) =>
    api.put<Staff>(`/staffs/${id}`, data),

  // Note: Backend might not have DELETE endpoint, adjust if needed
  delete: (id: string) => api.delete(`/staffs/${id}`),
};

// ============================================================================
// BOOKING/RESERVATION API (9.x - Admin)
// ============================================================================

export const bookingsApi = {
  // Admin: Get all bookings with filters
  getAll: (params?: BookingFiltersParams) => {
    // Clean params to remove undefined, empty strings, and "all" sentinel values
    const cleanParams: Record<string, string | number | boolean> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        // Skip undefined, null, empty strings, and "all" sentinel values
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          value !== 'all'
        ) {
          cleanParams[key] = value as string | number | boolean;
        }
      });
    }
    return api.get<BookingSummary[]>('/bookings/admin/all', {
      params: Object.keys(cleanParams).length > 0 ? cleanParams : undefined,
    });
  },

  // Get booking detail
  getById: (id: string) =>
    api.get<BookingDetail>(`/bookings/${id}/summary`),

  // Get bookings by showtime
  getByShowtime: (showtimeId: string, status?: BookingStatus) =>
    api.get<BookingSummary[]>(`/bookings/admin/showtime/${showtimeId}`, {
      params: status ? { status } : undefined,
    }),

  // Get bookings by date range
  getByDateRange: (
    startDate: string | Date,
    endDate: string | Date,
    status?: BookingStatus
  ) =>
    api.get<BookingSummary[]>('/bookings/admin/date-range', {
      params: { startDate, endDate, status },
    }),

  // Update booking status
  updateStatus: (bookingId: string, data: UpdateBookingStatusRequest) =>
    api.put<BookingDetail>(`/bookings/admin/${bookingId}/status`, data),

  // Confirm booking
  confirm: (bookingId: string) =>
    api.post<BookingDetail>(`/bookings/admin/${bookingId}/confirm`),

  // Refund as Voucher
  refundAsVoucher: (bookingId: string, reason: string) =>
    api.post<{ voucher: { code: string } }>(
      `/refunds/booking/${bookingId}/voucher`,
      { reason }
    ),
};

// ============================================================================
// REVIEWS API (10.x)
// ============================================================================

export const reviewsApi = {
  getAll: (params?: ReviewFiltersParams) =>
    api.get<Review[]>('/reviews', { params }),

  delete: (id: string) => api.delete(`/reviews/${id}`),
};

// ============================================================================
// CONCESSIONS API
// ============================================================================

export const concessionsApi = {
  getAll: (params?: {
    cinemaId?: string;
    category?: string;
    available?: boolean;
  }) => api.get<Concession[]>('/concessions', { params }),

  getById: (id: string) => api.get<Concession>(`/concessions/${id}`),

  create: (data: CreateConcessionRequest) =>
    api.post<Concession>('/concessions', data),

  update: (id: string, data: UpdateConcessionRequest) =>
    api.put<Concession>(`/concessions/${id}`, data),

  delete: (id: string) => api.delete(`/concessions/${id}`),

  updateInventory: (id: string, quantity: number) =>
    api.patch<Concession>(`/concessions/${id}/inventory`, { quantity }),
};

// ============================================================================
// CONFIG API
// ============================================================================

export const configApi = {
  getAll: () => api.get<SystemConfig[]>('/config'),

  update: (key: string, data: UpdateSystemConfigRequest) =>
    api.put<SystemConfig>(`/config/${key}`, data),
};

// ============================================================================
// PROMOTIONS API
// ============================================================================

export const promotionsApi = {
  getAll: (params?: PromotionFiltersParams) =>
    api.get<Promotion[]>('/promotions', { params }),

  getById: (id: string) => api.get<Promotion>(`/promotions/${id}`),

  create: (data: CreatePromotionRequest) =>
    api.post<Promotion>('/promotions', data),

  update: (id: string, data: UpdatePromotionRequest) =>
    api.put<Promotion>(`/promotions/${id}`, data),

  delete: (id: string) => api.delete(`/promotions/${id}`),

  toggleActive: (id: string) =>
    api.patch<Promotion>(`/promotions/${id}/toggle-active`),
};

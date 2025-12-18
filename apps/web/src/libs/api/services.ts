import { api } from './api-client';
import type {
  Movie,
  CreateMovieRequest,
  UpdateMovieRequest,
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
  Showtime,
  CreateShowtimeRequest,
  UpdateShowtimeRequest,
  ShowtimeFiltersParams,
  BatchCreateShowtimesRequest,
  ShowtimeSeat,
  MovieRelease,
  CreateMovieReleaseRequest,
  UpdateMovieReleaseRequest,
  TicketPricing,
  UpdateTicketPricingRequest,
  TicketPricingFiltersParams,
} from './types';

// ============================================================================
// MOVIES API (1.x)
// ============================================================================

export const moviesApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
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
  getAll: (params?: CinemaFiltersParams) =>
    api.get<Cinema[]>('/api/v1/cinemas/filters', { params }),

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
  getAllGroupedByCinema: async (): Promise<{ [cinemaId: string]: { cinema: Cinema; halls: Hall[] } }> => {
    const cinemas = await cinemasApi.getAll();
    const result: { [cinemaId: string]: { cinema: Cinema; halls: Hall[] } } = {};

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

  create: (data: CreateShowtimeRequest) =>
    api.post<Showtime>('/api/v1/showtimes/showtime', data),

  update: (id: string, data: UpdateShowtimeRequest) =>
    api.patch<Showtime>(`/api/v1/showtimes/showtime/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/showtimes/showtime/${id}`),

  batchCreate: (data: BatchCreateShowtimesRequest) =>
    api.post<Showtime[]>('/api/v1/showtimes/batch', data),

  getSeats: (showtimeId: string) =>
    api.get<ShowtimeSeat[]>(`/api/v1/showtimes/${showtimeId}/seats`),

  updateSeatStatus: (seatId: string, data: UpdateSeatStatusRequest) =>
    api.patch(`/api/v1/seats/${seatId}`, data),
};

// ============================================================================
// MOVIE RELEASES API (6.x)
// ============================================================================

export const movieReleasesApi = {
  getAll: (params?: { cinemaId?: string; movieId?: string }) =>
    api.get<MovieRelease[]>('/api/v1/movie-releases', { params }),

  getById: (id: string) =>
    api.get<MovieRelease>(`/api/v1/movie-releases/${id}`),

  create: (data: CreateMovieReleaseRequest) =>
    api.post<MovieRelease>('/api/v1/movie-releases', data),

  update: (id: string, data: UpdateMovieReleaseRequest) =>
    api.patch<MovieRelease>(`/api/v1/movie-releases/${id}`, data),

  delete: (id: string) =>
    api.delete(`/api/v1/movie-releases/${id}`),
};

// ============================================================================
// TICKET PRICING API (7.x)
// ============================================================================

export const ticketPricingApi = {
  getAll: (params?: TicketPricingFiltersParams) =>
    api.get<TicketPricing[]>('/api/v1/ticket-pricing', { params }),

  getById: (id: string) =>
    api.get<TicketPricing>(`/api/v1/ticket-pricing/${id}`),

  update: (id: string, data: UpdateTicketPricingRequest) =>
    api.patch<TicketPricing>(`/api/v1/ticket-pricing/${id}`, data),
};

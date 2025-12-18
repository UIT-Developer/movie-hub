import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  moviesApi,
  genresApi,
  cinemasApi,
  hallsApi,
  showtimesApi,
  movieReleasesApi,
  ticketPricingApi,
} from './services';
import type {
  CreateMovieRequest,
  UpdateMovieRequest,
  CreateGenreRequest,
  UpdateGenreRequest,
  CreateCinemaRequest,
  UpdateCinemaRequest,
  CreateHallRequest,
  UpdateHallRequest,
  CreateShowtimeRequest,
  UpdateShowtimeRequest,
  ShowtimeFiltersParams,
  BatchCreateShowtimesRequest,
  CreateMovieReleaseRequest,
  UpdateMovieReleaseRequest,
  UpdateTicketPricingRequest,
  UpdateSeatStatusRequest,
  TicketPricingFiltersParams,
} from './types';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const queryKeys = {
  movies: {
    all: ['movies'] as const,
    lists: () => [...queryKeys.movies.all, 'list'] as const,
    list: (params?: { page?: number; limit?: number; search?: string }) => [...queryKeys.movies.lists(), params] as const,
    details: () => [...queryKeys.movies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.movies.details(), id] as const,
  },
  genres: {
    all: ['genres'] as const,
    lists: () => [...queryKeys.genres.all, 'list'] as const,
    details: () => [...queryKeys.genres.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.genres.details(), id] as const,
  },
  cinemas: {
    all: ['cinemas'] as const,
    lists: () => [...queryKeys.cinemas.all, 'list'] as const,
    list: (params?: { page?: number; limit?: number; search?: string }) => [...queryKeys.cinemas.lists(), params] as const,
    details: () => [...queryKeys.cinemas.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.cinemas.details(), id] as const,
  },
  halls: {
    all: ['halls'] as const,
    lists: () => [...queryKeys.halls.all, 'list'] as const,
    byCinema: (cinemaId: string) => [...queryKeys.halls.lists(), 'cinema', cinemaId] as const,
    grouped: () => [...queryKeys.halls.lists(), 'grouped'] as const,
    details: () => [...queryKeys.halls.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.halls.details(), id] as const,
  },
  showtimes: {
    all: ['showtimes'] as const,
    lists: () => [...queryKeys.showtimes.all, 'list'] as const,
    list: (filters?: ShowtimeFiltersParams) => [...queryKeys.showtimes.lists(), filters] as const,
    details: () => [...queryKeys.showtimes.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.showtimes.details(), id] as const,
    seats: (id: string) => [...queryKeys.showtimes.detail(id), 'seats'] as const,
  },
  movieReleases: {
    all: ['movie-releases'] as const,
    lists: () => [...queryKeys.movieReleases.all, 'list'] as const,
    list: (params?: { cinemaId?: string; movieId?: string }) => [...queryKeys.movieReleases.lists(), params] as const,
    details: () => [...queryKeys.movieReleases.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.movieReleases.details(), id] as const,
  },
  ticketPricing: {
    all: ['ticket-pricing'] as const,
    lists: () => [...queryKeys.ticketPricing.all, 'list'] as const,
    list: (params?: TicketPricingFiltersParams) => [...queryKeys.ticketPricing.lists(), params] as const,
    details: () => [...queryKeys.ticketPricing.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.ticketPricing.details(), id] as const,
  },
};

// ============================================================================
// MOVIES HOOKS
// ============================================================================

export const useMovies = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: queryKeys.movies.list(params),
    queryFn: () => moviesApi.getAll(params),
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: queryKeys.movies.detail(id),
    queryFn: () => moviesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieRequest) => moviesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.lists() });
      toast.success('Movie created successfully');
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieRequest }) =>
      moviesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.detail(variables.id) });
      toast.success('Movie updated successfully');
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => moviesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.lists() });
      toast.success('Movie deleted successfully');
    },
  });
};

// ============================================================================
// GENRES HOOKS
// ============================================================================

export const useGenres = () => {
  return useQuery({
    queryKey: queryKeys.genres.lists(),
    queryFn: () => genresApi.getAll(),
  });
};

export const useGenre = (id: string) => {
  return useQuery({
    queryKey: queryKeys.genres.detail(id),
    queryFn: () => genresApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGenreRequest) => genresApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.lists() });
      toast.success('Genre created successfully');
    },
  });
};

export const useUpdateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGenreRequest }) =>
      genresApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.detail(variables.id) });
      toast.success('Genre updated successfully');
    },
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => genresApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.lists() });
      toast.success('Genre deleted successfully');
    },
  });
};

// ============================================================================
// CINEMAS HOOKS
// ============================================================================

export const useCinemas = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: queryKeys.cinemas.list(params),
    queryFn: () => cinemasApi.getAll(params),
  });
};

export const useCinema = (id: string) => {
  return useQuery({
    queryKey: queryKeys.cinemas.detail(id),
    queryFn: () => cinemasApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCinemaRequest) => cinemasApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cinemas.lists() });
      toast.success('Cinema created successfully');
    },
  });
};

export const useUpdateCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCinemaRequest }) =>
      cinemasApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cinemas.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.cinemas.detail(variables.id) });
      toast.success('Cinema updated successfully');
    },
  });
};

export const useDeleteCinema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cinemasApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cinemas.lists() });
      toast.success('Cinema deleted successfully');
    },
  });
};

// ============================================================================
// HALLS HOOKS
// ============================================================================

export const useHallsByCinema = (cinemaId: string) => {
  return useQuery({
    queryKey: queryKeys.halls.byCinema(cinemaId),
    queryFn: () => hallsApi.getByCinema(cinemaId),
    enabled: !!cinemaId,
  });
};

export const useHallsGroupedByCinema = () => {
  return useQuery({
    queryKey: queryKeys.halls.grouped(),
    queryFn: () => hallsApi.getAllGroupedByCinema(),
  });
};

export const useHall = (id: string) => {
  return useQuery({
    queryKey: queryKeys.halls.detail(id),
    queryFn: () => hallsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHallRequest) => hallsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.byCinema(variables.cinemaId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.grouped() });
      toast.success('Hall created successfully');
    },
  });
};

export const useUpdateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateHallRequest }) =>
      hallsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.grouped() });
      toast.success('Hall updated successfully');
    },
  });
};

export const useDeleteHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hallsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.halls.grouped() });
      toast.success('Hall deleted successfully');
    },
  });
};

// ============================================================================
// SHOWTIMES HOOKS
// ============================================================================

export const useShowtimes = (filters?: ShowtimeFiltersParams) => {
  return useQuery({
    queryKey: queryKeys.showtimes.list(filters),
    queryFn: () => showtimesApi.getWithFilters(filters || {}),
  });
};

export const useShowtime = (id: string) => {
  return useQuery({
    queryKey: queryKeys.showtimes.detail(id),
    queryFn: () => showtimesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateShowtime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShowtimeRequest) => showtimesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.lists() });
      toast.success('Showtime created successfully');
    },
  });
};

export const useUpdateShowtime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShowtimeRequest }) =>
      showtimesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.detail(variables.id) });
      toast.success('Showtime updated successfully');
    },
  });
};

export const useDeleteShowtime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => showtimesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.lists() });
      toast.success('Showtime deleted successfully');
    },
  });
};

export const useBatchCreateShowtimes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BatchCreateShowtimesRequest) => showtimesApi.batchCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.lists() });
      toast.success('Showtimes created successfully');
    },
  });
};

// ============================================================================
// MOVIE RELEASES HOOKS
// ============================================================================

export const useMovieReleases = (params?: { cinemaId?: string; movieId?: string }) => {
  return useQuery({
    queryKey: queryKeys.movieReleases.list(params),
    queryFn: () => movieReleasesApi.getAll(params),
  });
};

export const useMovieRelease = (id: string) => {
  return useQuery({
    queryKey: queryKeys.movieReleases.detail(id),
    queryFn: () => movieReleasesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateMovieRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieReleaseRequest) => movieReleasesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.lists() });
      toast.success('Movie release created successfully');
    },
  });
};

export const useUpdateMovieRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieReleaseRequest }) =>
      movieReleasesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.detail(variables.id) });
      toast.success('Movie release updated successfully');
    },
  });
};

export const useDeleteMovieRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => movieReleasesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.lists() });
      toast.success('Movie release deleted successfully');
    },
  });
};

// ============================================================================
// TICKET PRICING HOOKS
// ============================================================================

export const useTicketPricing = (params?: TicketPricingFiltersParams) => {
  return useQuery({
    queryKey: queryKeys.ticketPricing.list(params),
    queryFn: () => ticketPricingApi.getAll(params),
  });
};

export const useUpdateTicketPricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicketPricingRequest }) =>
      ticketPricingApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ticketPricing.lists() });
      toast.success('Ticket pricing updated successfully');
    },
  });
};

// ============================================================================
// SHOWTIME SEATS HOOKS
// ============================================================================

export const useShowtimeSeats = (showtimeId?: string) => {
  return useQuery({
    queryKey: queryKeys.showtimes.seats(showtimeId || ''),
    queryFn: () => {
      if (!showtimeId) throw new Error('Showtime ID is required');
      return showtimesApi.getSeats(showtimeId);
    },
    enabled: !!showtimeId,
  });
};

export const useUpdateSeatStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ seatId, data }: { seatId: string; data: UpdateSeatStatusRequest }) =>
      showtimesApi.updateSeatStatus(seatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.all });
      toast.success('Seat status updated successfully');
    },
  });
};

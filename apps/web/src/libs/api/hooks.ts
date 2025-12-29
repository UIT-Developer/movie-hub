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
  staffApi,
  bookingsApi,
  reviewsApi,
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
  CreateStaffRequest,
  UpdateStaffRequest,
  StaffFiltersParams,
  BookingFiltersParams,
  UpdateBookingStatusRequest,
  ReviewFiltersParams,
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
  staff: {
    all: ['staff'] as const,
    lists: () => [...queryKeys.staff.all, 'list'] as const,
    list: (params?: StaffFiltersParams) => [...queryKeys.staff.lists(), params] as const,
    details: () => [...queryKeys.staff.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.staff.details(), id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (params?: BookingFiltersParams) => [...queryKeys.bookings.lists(), params] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
    byShowtime: (showtimeId: string) => [...queryKeys.bookings.lists(), 'showtime', showtimeId] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (params?: ReviewFiltersParams) => [...queryKeys.reviews.lists(), params] as const,
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
    // Enable fetching even without movieId to get all releases
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
    onSuccess: async (created, variables) => {
      // Invalidate general lists, then try to fetch releases for the affected movie
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.lists() });
      toast.success('Movie release created successfully');

      try {
        const movieId = (variables as any)?.movieId;
        if (movieId) {
          const releases = await movieReleasesApi.getAll({ movieId });

          // Try to find the created release by id or by matching dates
          const createdId = (created as any)?.id;
          const found = Array.isArray(releases)
            ? releases.find((r: any) => r.id === createdId) || releases.find((r: any) => r.startDate === (created as any)?.startDate && r.endDate === (created as any)?.endDate)
            : null;

          if (found) {
            // Update list cache for the specific movieId list key
            const listKey = queryKeys.movieReleases.list({ movieId });
            queryClient.setQueryData(listKey, (old: any) => {
              // If we don't have an old array, use fetched releases
              if (!Array.isArray(old)) return releases;
              // Merge ensuring dedup by id
              const byId = new Map<string, any>();
              for (const it of [...old, ...releases]) {
                if (it && it.id) byId.set(it.id, it);
              }
              return Array.from(byId.values());
            });

            // Ensure detail cache exists for the created release
            if (found.id) {
              queryClient.setQueryData(queryKeys.movieReleases.detail(found.id), found);
            }
          }
        }
      } catch (err) {
        console.warn('[MovieRelease] post-create fetch error:', err);
      }
    },
    onError: (error: unknown) => {
      // If error was wrapped by api-client, it may include status and responseData
      const errAny = error as any;
      const status = errAny?.status;
      const responseData = errAny?.responseData;

      // Show concise toast with status, and log full details to console
      const toastMsg = status ? `${errAny?.message} (status: ${status})` : errAny?.message || 'Failed to create movie release';
      toast.error(toastMsg);
      console.error('[MovieRelease] create error details:', { status, responseData, raw: errAny?.raw || errAny });
    },
  });
};

export const useUpdateMovieRelease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieReleaseRequest }) =>
      movieReleasesApi.update(id, data),
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.movieReleases.detail(variables.id) });
      toast.success('Movie release updated successfully');

      try {
        // After update, refetch releases for the movie and update cache for the updated item
        const movieId = (variables as any)?.data?.movieId;
        const updatedId = variables.id;
        if (movieId) {
          const releases = await movieReleasesApi.getAll({ movieId });
          if (Array.isArray(releases)) {
            const found = releases.find((r: any) => r.id === updatedId);
            if (found) {
              // Update specific list cache and detail cache
              const listKey = queryKeys.movieReleases.list({ movieId });
              queryClient.setQueryData(listKey, (old: any) => {
                if (!Array.isArray(old)) return releases;
                const byId = new Map<string, any>();
                for (const it of [...old, ...releases]) {
                  if (it && it.id) byId.set(it.id, it);
                }
                return Array.from(byId.values());
              });

              queryClient.setQueryData(queryKeys.movieReleases.detail(found.id), found);
            }
          }
        }
      } catch (err) {
        console.warn('[MovieRelease] post-update fetch error:', err);
      }
    },
    onError: (error: unknown) => {
      const errAny = error as any;
      const status = errAny?.status;
      const responseData = errAny?.responseData;
      const toastMsg = status ? `${errAny?.message} (status: ${status})` : errAny?.message || 'Failed to update movie release';
      toast.error(toastMsg);
      console.error('[MovieRelease] update error details:', { status, responseData, raw: errAny?.raw || errAny });
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
      hallsApi.updateSeatStatus(seatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.showtimes.all });
      toast.success('Seat status updated successfully');
    },
  });
};

// ============================================================================
// STAFF HOOKS
// ============================================================================

export const useStaff = (params?: StaffFiltersParams) => {
  return useQuery({
    queryKey: queryKeys.staff.list(params),
    queryFn: () => staffApi.getAll(params),
  });
};

export const useStaffById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.staff.detail(id),
    queryFn: () => staffApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffRequest) => staffApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      toast.success('Staff member created successfully');
    },
    onError: (error: unknown) => {
      let errorMessage = 'Failed to create staff member';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Check for additional error details
        const err = error as Error & { responseData?: Record<string, unknown> };
        if (err.responseData?.errors && Array.isArray(err.responseData.errors)) {
          const details = (err.responseData.errors as unknown[]).map((e: unknown) => {
            if (typeof e === 'string') return e;
            if (e && typeof e === 'object') {
              const errObj = e as Record<string, unknown>;
              if (errObj.message) return String(errObj.message);
              if (errObj.path) return `${errObj.path}: ${errObj.message || errObj.code}`;
            }
            return JSON.stringify(e);
          }).join('; ');
          errorMessage = `Validation failed: ${details}`;
        }
      }
      
      console.error('[useCreateStaff] Error:', { error, errorMessage });
      toast.error(errorMessage);
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStaffRequest }) =>
      staffApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.detail(variables.id) });
      toast.success('Staff member updated successfully');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to update staff member');
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      toast.success('Staff member deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to delete staff member');
    },
  });
};

// ============================================================================
// BOOKINGS/RESERVATIONS HOOKS
// ============================================================================

export const useBookings = (params?: BookingFiltersParams) => {
  return useQuery({
    queryKey: queryKeys.bookings.list(params),
    queryFn: () => bookingsApi.getAll(params),
  });
};

export const useBookingById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.bookings.detail(id),
    queryFn: () => bookingsApi.getById(id),
    enabled: !!id,
  });
};

export const useBookingsByShowtime = (showtimeId: string) => {
  return useQuery({
    queryKey: queryKeys.bookings.byShowtime(showtimeId),
    queryFn: () => bookingsApi.getByShowtime(showtimeId),
    enabled: !!showtimeId,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingStatusRequest }) =>
      bookingsApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.lists() });
      toast.success('Booking status updated successfully');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to update booking status');
    },
  });
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsApi.confirm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.lists() });
      toast.success('Booking confirmed successfully');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to confirm booking');
    },
  });
};

// ============================================================================
// REVIEWS HOOKS
// ============================================================================

export const useReviews = (params?: ReviewFiltersParams) => {
  return useQuery({
    queryKey: queryKeys.reviews.list(params),
    queryFn: () => reviewsApi.getAll(params),
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.lists() });
      toast.success('Review deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to delete review');
    },
  });
};

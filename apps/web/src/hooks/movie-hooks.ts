import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  createMovie,
  CreateMovieRequest,
  deleteMovie,
  getMovieDetail,
  getMovies,
  updateMovie,
  UpdateMovieRequest,
} from '../libs/actions/movies/movie-action';
import { useAuth } from '@clerk/nextjs';
import { MovieDetailResponse, MovieSummary } from '@movie-hub/shared-types';
import { toast } from 'sonner';
export const useGetMovies = () => {
  const { getToken } = useAuth();
  return useSuspenseQuery<MovieSummary[]>({
    queryKey: ['movies'],
    queryFn: async () => {;
      return await getMovies();
    },
  });
};

export const useGetMovieDetail = (movieId: string) => {
  const { getToken } = useAuth();
  return useSuspenseQuery<MovieDetailResponse>({
    queryKey: ['movies', movieId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await getMovieDetail(movieId, token);
    },
  });
};

export const useCreateMovie = (data: CreateMovieRequest) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['create-movie'],
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await createMovie(data, token);
    },
    onMutate() {
      toast.loading('Creating movie...');
    },
    onSuccess: () => {
      toast.success('Movie created successfully');
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  });
};

export const useUpdateMovie = (movieId: string, data: UpdateMovieRequest) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['update-movie', movieId],
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await updateMovie(movieId, data, token);
    }
    ,
    onMutate() {
      toast.loading('Updating movie...');
    },
    onSuccess: () => {
      toast.success('Movie updated successfully');
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['movies', movieId] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  });
}

export const useDeleteMovie = (movieId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['delete-movie', movieId],
    mutationFn: async () => {
      const token = await getToken();   
      if (!token) throw new Error('Token is required');
      return await deleteMovie(movieId, token);
    },
    onMutate() {
      toast.loading('Deleting movie...');
    },
    onSuccess: () => {
      toast.success('Movie deleted successfully');  
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['movies', movieId] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  });
}

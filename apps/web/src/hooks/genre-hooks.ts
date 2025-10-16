import { useAuth } from '@clerk/nextjs';
import { createGenre, CreateGenreRequest, getGenreDetail, getGenres, updateGenre } from '../libs/actions/genre/genre-action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetGenres = (token: string) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await getGenres(token);
    },
  });
};

export const useGetDetailGenre = (id: string) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['genres', id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await getGenreDetail(id, token);
    },
  });
};

export const useCreateGenre = (data: CreateGenreRequest) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['create-genre'],
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await createGenre(data, token);
    },
    onMutate() {
      toast.loading('Creating genre...');
    },
    onSuccess: () => {
      toast.success('Genre created successfully');
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  })
}

export const useUpdateGenre = (id: string, genreData: CreateGenreRequest) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['update-genre'],
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await updateGenre(id, genreData, token);
    },
    onMutate() {
      toast.loading('Updating genre...');
    },
    onSuccess: () => {
      toast.success('Genre updated successfully');
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      queryClient.invalidateQueries({ queryKey: ['genres', id] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  });
}

export const useDeleteGenre = (id: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['delete-genre', id],
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      // return await deleteGenre(id, token);
    },
    onMutate() {
      toast.loading('Deleting genre...');
    },
    onSuccess: () => {
      toast.success('Genre deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      queryClient.invalidateQueries({ queryKey: ['genres', id] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    },
  }); 
}
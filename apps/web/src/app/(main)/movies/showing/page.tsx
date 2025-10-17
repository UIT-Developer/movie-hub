import { auth } from '@clerk/nextjs/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getMovies } from 'apps/web/src/libs/actions/movies/movie-action';
import { Suspense } from 'react';
import { MovieList } from '../_components/movie-list';
const ShowingPage = async () => {
  const queryClient = new QueryClient();
  const { getToken } = await auth();
  const token = typeof getToken === 'function' ? await getToken() : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      if (!token) throw new Error('Token is required');
      return await getMovies(token);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-3xl font-bold text-gray-300 mb-6 text-center mt-10">
          🎬 PHIM ĐANG CHIẾU
          
        </h1>
        <MovieList isShowing={true} />
      </div>
        
      </Suspense>
    </HydrationBoundary>
  );
};

export default ShowingPage;

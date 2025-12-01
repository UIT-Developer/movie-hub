import { CinemaLocationResponse } from 'apps/web/src/libs/types/cinema.type';
import CinemaDetailCard from './_components/cinema-detail-card';
import { getQueryClient } from 'apps/web/src/libs/get-query-client';
import {
  getCinemaDetail,
  getMovieAtCinemas,
} from 'apps/web/src/libs/actions/cinemas/cinema-action';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { MoviesAtCinema } from './_components/movies-list-cinema';
import { init } from 'next/dist/compiled/webpack/webpack';
import { ServiceResult } from '@movie-hub/shared-types';
import { MovieWithShowtimeResponse } from 'apps/web/src/libs/types/movie.type';

export default async function CinemaDetailPage({
  params,
}: {
  params: Promise<{ cinemaId: string }>;
}) {
  const { cinemaId } = await params;
  const queryClient = getQueryClient();
  const cinema = await queryClient.fetchQuery({
    queryKey: ['cinemas', 'detail', cinemaId],
    queryFn:() => getCinemaDetail(cinemaId)
  });
  // queryClient.prefetchInfiniteQuery({
  //   queryKey: ['movies-at-cinema', cinemaId],
  //   queryFn: async ({pageParam = 1}) => {
  //     const response = await getMovieAtCinemas(cinemaId, {
  //       page: pageParam,
  //       limit: 20,
  //     });
  //     return response.data;
  //   },

  //   select: (data) => {
  //     return {
  //       pages: data.pages.flatMap((page) => page.data),
  //       pageParams: data.pageParams,
  //     };
  //   },
  //   initialPageParam: 1,
  // });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-center gap-4">
        <CinemaDetailCard cinema={cinema} />
        <MoviesAtCinema cinemaId={cinemaId} />
      </div>
    </HydrationBoundary>
  );
}

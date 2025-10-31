import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getMovieDetail } from 'apps/web/src/libs/actions/movies/movie-action';
import { DateSelect } from './_components/date-select';
import { MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';
import { getQueryClient } from 'apps/web/src/libs/get-query-client';

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['movie-detail', params.id],
    queryFn: () => getMovieDetail(params.id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex flex-col gap-10 pb-20">
        <MovieHeader movieId={params.id} />

        <section className="relative flex flex-col gap-4">
          <p className="text-white text-lg font-bold mt-20">Diễn viên</p>
          <MovieCast movieId={params.id} />
        </section>

        <DateSelect id={params.id} />
      </div>
    </HydrationBoundary>
  );
}

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getMovieDetail } from 'apps/web/src/libs/actions/movies/movie-action';
import { DateSelect } from './_components/date-select';
import { MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';
import { getQueryClient } from 'apps/web/src/libs/get-query-client';
import { getAvailableCities, getCinemaDetail } from 'apps/web/src/libs/actions/cinemas/cinema-action';
import { TrailerModal } from 'apps/web/src/components/modal/trailer-modal';

export default async function MovieDetailsPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams?: { cinemaId?: string };
}) {
  const { id } = await params; // ✅ await params trước
  const cinemaId = searchParams?.cinemaId;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => getMovieDetail(id),
  });
  const availableCities = await queryClient.fetchQuery({
    queryKey: ['movie-available-cities'],
    queryFn: () => getAvailableCities(),
  });
  if (cinemaId) {
    await queryClient.prefetchQuery({
      queryKey: ['cinema-detail', cinemaId],
      queryFn: () => getCinemaDetail(cinemaId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen flex flex-col gap-10 pb-20">
        <MovieHeader movieId={id} />

        <section className="relative flex flex-col gap-4">
          <p className="text-white text-lg font-bold mt-20">Diễn viên</p>
          <MovieCast movieId={id} />
        </section>

        <DateSelect movieId={id} cinemaId={cinemaId}  availableCities={availableCities}/>
        <TrailerModal/>
      </div>
    </HydrationBoundary>
  );
}


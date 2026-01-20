import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
export const dynamic = 'force-dynamic';
import { getMovieDetail } from '@/libs/actions/movies/movie-action';
import { DateSelect } from './_components/date-select';
import { MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';
import { getQueryClient } from '@/libs/get-query-client';
import {
  getAvailableCities,
  getCinemaDetail,
} from '@/libs/actions/cinemas/cinema-action';
import { TrailerModal } from '@/components/modal/trailer-modal';
import { MovieReviews } from './_components/movie-reviews';

export default async function MovieDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ cinemaId?: string }>;
}) {
  const { id } = await params; // ✅ await params trước
  const resolvedSearchParams = await searchParams;
  const cinemaId = resolvedSearchParams?.cinemaId;
  const queryClient = getQueryClient();
  let availableCities: string[] = [];

  await Promise.all([
    (async () => {
      try {
        await queryClient.prefetchQuery({
          queryKey: ['movies', id],
          queryFn: () => getMovieDetail(id),
        });
      } catch (error) {
        console.error('[MovieDetailsPage] Failed to prefetch movie detail', error);
      }
    })(),
    (async () => {
      try {
        const cities = await queryClient.fetchQuery({
          queryKey: ['movie-available-cities'],
          queryFn: () => getAvailableCities(),
        });
        availableCities = cities.data ?? [];
      } catch (error) {
        console.error('[MovieDetailsPage] Failed to fetch available cities', error);
        availableCities = [];
      }
    })(),
    cinemaId
      ? (async () => {
          try {
            await queryClient.prefetchQuery({
              queryKey: ['cinema-detail', cinemaId],
              queryFn: () => getCinemaDetail(cinemaId),
            });
          } catch (error) {
            console.error('[MovieDetailsPage] Failed to prefetch cinema detail', error);
          }
        })()
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-12 pb-32 relative">
        <MovieHeader movieId={id} />

        <div className="max-w-[1920px] mx-auto w-full space-y-20">
          <section className="relative flex flex-col gap-6 px-4">
            <h2 className="text-white text-3xl font-bold tracking-tight">
              Diễn viên
            </h2>
            <MovieCast movieId={id} />
          </section>

          <DateSelect
            movieId={id}
            cinemaId={cinemaId}
            availableCities={availableCities}
          />

          <MovieReviews movieId={id} />
        </div>

        <TrailerModal />
      </div>
    </HydrationBoundary>
  );
}

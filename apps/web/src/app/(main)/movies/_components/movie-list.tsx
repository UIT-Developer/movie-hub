'use client';
import { useGetMovies } from 'apps/web/src/hooks/movie-hooks';
import MovieCard from '../../_components/MovieCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { ErrorFallback } from 'apps/web/src/components/error-fallback';

interface MovieListProps {
  isShowing: boolean;
}
export const MovieList = ({ isShowing }: MovieListProps) => {
  const { data, isError, error, isLoading, fetchNextPage, isFetchingNextPage } = useGetMovies({
    status: isShowing ? 'now-showing' : 'upcoming',
    limit: 12,
  });
  const movies = data?.pages ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);


  return (
    <div className="relative md:px-16 lg:px-40 overflow-hidden">
      {isError ? (
        <ErrorFallback message={error.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, idx) => (
              <MovieCard.Skeleton key={idx} />
            ))
          ) : movies.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500 flex items-center justify-center w-full">
              🎬 Không có phim nào để hiển thị.
            </div>
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
          )}
          <div ref={ref} className="col-span-full flex justify-center w-full">
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, idx) => (
                <MovieCard.Skeleton key={idx} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

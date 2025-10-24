'use client';
import { useGetMovieDetail } from 'apps/web/src/hooks/movie-hooks';
import { useParams } from 'next/navigation';
import { DateSelect } from './_components/date-select';
import { Actor, MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMovieDetail(id as string);
  

  return (
    <div className="min-h-screen flex flex-col gap-10 pb-20">
      {isLoading ? (
        <MovieHeader.Skeleton />
      ) : (
        <> 
        <MovieHeader movie={data?.data ?? {}} />
      <MovieCast actors={data?.data.cast as Actor[]} />
      <DateSelect id={id as string} />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;

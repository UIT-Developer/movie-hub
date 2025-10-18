'use client';
import { useParams } from 'next/navigation';
import { DateSelect } from './_components/date-select';
import { Actor, MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';
import { use } from 'react';
import { useGetMovieDetail } from 'apps/web/src/hooks/movie-hooks';


const MovieDetailsPage = () => {
  const { id } = useParams();

  

  const {data} = useGetMovieDetail(id as string);

  return (
    <div className="min-h-screen flex flex-col gap-10 pb-20">
      <MovieHeader
        data={data}
      />
      <MovieCast actors={data.cast as Actor[]} />
      <DateSelect id={id as string} />
    </div>
  );
};

export default MovieDetailsPage;

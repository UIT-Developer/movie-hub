
import { Suspense } from 'react';
import { MovieList } from '../_components/movie-list';
const ShowingPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-3xl font-bold text-gray-300 mb-6 text-center mt-10">
          🎬 PHIM ĐANG CHIẾU
        </h1>
        <MovieList isShowing={true} />
      </div>
    </Suspense>
  );
};

export default ShowingPage;

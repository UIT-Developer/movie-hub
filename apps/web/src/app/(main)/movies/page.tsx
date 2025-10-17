import MovieSlider from '../_components/MovieSlider';
import QuickBooking from '../_components/QuickBooking';

const MoviesPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <QuickBooking />
      {/* Slider phim đang chiếu */}
      <section>
        <MovieSlider title="🎬 PHIM ĐANG CHIẾU" href='showing' movies={[]} />
      </section>

      {/* Slider phim sắp chiếu */}
      <section>
        <MovieSlider title="🎥 PHIM SẮP CHIẾU" href='upcoming' movies={[]} />
      </section>
    </div>
  );
};
export default MoviesPage;

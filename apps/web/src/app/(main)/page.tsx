import MovieSlider from "./_components/MovieSlider";
import OtherServices from "./_components/OtherServices";
import PromoBanner from "./_components/PromoBanner";
import QuickBooking from "./_components/QuickBooking";
import TopAdBanner from "./_components/TopAdBanner";


const MainPage = () => {
  const nowShowing = [
    {
      title: 'Avengers',
      image: '/movies/avengers.jpg',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Inception',
      image: '/movies/inception.jpg',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Interstellar',
      image: '/movies/interstellar.jpg',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Joker',
      image: '/movies/joker.jpg',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'MƯA ĐỎ',
      image: '/movies/muado.webp',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
  ];

  const comingSoon = [
    {
      title: 'Avatar 3',
      image: '/upcoming/avatar3.jpg',
      releaseDate: '15/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Spider-Man',
      image: '/upcoming/spiderman.jpg',
      releaseDate: '20/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Batman',
      image: '/upcoming/batman.jpg',
      releaseDate: '01/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Dune 2',
      image: '/upcoming/dune2.webp',
      releaseDate: '05/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
    {
      title: 'Frozen 3',
      image: '/upcoming/frozen3.jfif',
      releaseDate: '25/10/2025',
      genre: ['Hành động'],
      runtime: 120,
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      <TopAdBanner />
      <QuickBooking />

      {/* Slider phim đang chiếu */}
      <section>
        <MovieSlider title="🎬 PHIM ĐANG CHIẾU" movies={nowShowing} />
      </section>

      {/* Slider phim sắp chiếu */}
      <section>
        <MovieSlider title="🎥 PHIM SẮP CHIẾU" movies={comingSoon} />
      </section>

      <PromoBanner  />
      <OtherServices />

    </div>
  );
}

export default MainPage
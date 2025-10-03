import Navbar from "./components_main/Navbar";
import TopAdBanner from "./components_main/TopAdBanner"; 
import MovieSlider from "./components_main/MovieSlider";
import Footer from "./components_main/Footer";
import PromoBanner from "./components_main/PromoBanner";
import OtherServices from "./components_main/OtherServices";

import QuickBooking from "@/app/components_main/QuickBooking";

export default function Home() {
  const nowShowing = [
    { title: "Avengers", image: "/movies/avengers.jpg" },
    { title: "Inception", image: "/movies/inception.jpg" },
    { title: "Interstellar", image: "/movies/interstellar.jpg" },
    { title: "Joker", image: "/movies/joker.jpg" },
    { title: "MƯA ĐỎ", image: "/movies/muado.webp" }
  ];

  const comingSoon = [
    { title: "Avatar 3", image: "/upcoming/avatar3.jpg", releaseDate: "15/10/2025" },
    { title: "Spider-Man", image: "/upcoming/spiderman.jpg", releaseDate: "20/10/2025" },
    { title: "Batman", image: "/upcoming/batman.jpg", releaseDate: "01/10/2025" },
    { title: "Dune 2", image: "/upcoming/dune2.webp", releaseDate: "05/10/2025" },
    { title: "Frozen 3", image: "/upcoming/frozen3.jfif", releaseDate: "25/10/2025" },
  ];

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <Navbar />
      <TopAdBanner />
      <QuickBooking />

      {/* Slider phim đang chiếu */}
      <section className="bg-gray-800/90 py-10">
        <MovieSlider title="🎬 PHIM ĐANG CHIẾU" movies={nowShowing} />
      </section>

      {/* Slider phim sắp chiếu */}
      <section className="bg-gray-900/90 py-10">
        <MovieSlider title="🎥 PHIM SẮP CHIẾU" movies={comingSoon} />
      </section>

      <PromoBanner />
      <OtherServices />
      <Footer />
    </div>
  );
}

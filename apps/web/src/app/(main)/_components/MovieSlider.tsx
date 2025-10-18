"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BlurCircle } from "apps/web/src/components/blur-circle";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import MovieCard from "./MovieCard";
import { useGetMovies } from "apps/web/src/hooks/movie-hooks";

type Movie = {
  title: string;
  image: string;
  releaseDate?: string;
  genre: string[],
  runtime: number
};

type Props = {
  href: string;
  title: string;
  movies: Movie[];
};

export default function MovieSlider({href, title, movies}: Props) {
  const {data} = useGetMovies()
  return (
    <div className="px-6 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-bold text-lg">{title}</p>

        <Link
          href={`movies/${href}`}
          className="relative z-10 group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
          prefetch
        >
          Xem tất cả
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </Link>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={3} // 👉 Bấm 1 lần chuyển 4 phim
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          0: {
            // từ 0px trở lên (mobile)
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            // từ md: 768px trở lên (tablet/desktop)
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {data.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              runtime={movie.runtime}
              title={movie.title}
              posterUrl={movie.posterUrl}
              backdropUrl={movie.backdropUrl}
              id={movie.id}
              ageRating={movie.ageRating}
              languageType={movie.languageType}
              productionCountry={movie.productionCountry}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng
      <button className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition ">
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition">
        <ChevronRight className="text-white w-6 h-6" />
      </button> */}
    </div>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

type Movie = {
  title: string;
  image: string;
  releaseDate?: string;
};

type Props = {
  title: string;
  movies: Movie[];
};

export default function MovieSlider({ title, movies }: Props) {
  return (
    <div className="relative max-w-8xl mx-auto py-12 px-24  ">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={75}
        slidesPerView={4}
        slidesPerGroup={4}   // 👉 Bấm 1 lần chuyển 4 phim
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              title={movie.title}
              image={movie.image}
              releaseDate={movie.releaseDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng */}
      <button className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition ">
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition">
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

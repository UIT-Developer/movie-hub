import { Button } from '@movie-hub/shacdn-ui/button';
import { useEffect, useState } from 'react';
import MovieSlider from './_components/MovieSlider';
import OtherServices from './_components/OtherServices';
import PromoBanner from './_components/PromoBanner';
import { CinemaListNearby } from './_components/cinema-near-list';
import QuickBooking from './_components/QuickBooking';
import { getQueryClient } from '../../libs/get-query-client';
import { getMovies } from '../../libs/actions/movies/movie-action';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function MainPage() {
  const queryClient = getQueryClient();


  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['movies', { status: 'now_showing', page: 1, limit: 10 }],
      queryFn: () => getMovies({ status: 'now_showing', page: 1, limit: 10 }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['movies', { status: 'upcoming', page: 1, limit: 10 }],
      queryFn: () => getMovies({ status: 'upcoming', page: 1, limit: 10 }),
    }),
  ]);


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8">
        <QuickBooking />

        {/* Các rạp gần vị trí */}

        <CinemaListNearby />

        {/* Slider phim đang chiếu */}
        <section>
          <MovieSlider
            title="🎬 PHIM ĐANG CHIẾU"
            href="showing"
            status="now_showing"
          />
        </section>

        {/* Slider phim sắp chiếu */}
        <section>
          <MovieSlider
            title="🎥 PHIM SẮP CHIẾU"
            href="upcoming"
            status="upcoming"
          />
        </section>

        <PromoBanner />
        <OtherServices />
      </div>
    </HydrationBoundary>
  );
};



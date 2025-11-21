'use client';
import { useGetCinemasNearby } from 'apps/web/src/hooks/cinema-hooks';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { CinemaLocationCard } from './cinema-loaction-card';
import { ErrorFallback } from 'apps/web/src/components/error-fallback';
import { BlurCircle } from 'apps/web/src/components/blur-circle';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@movie-hub/shacdn-ui/carousel';

export const CinemaListNearby = ({
  longtitude,
  latitude,
}: {
  longtitude: number;
  latitude: number;
}) => {
  const { data, isLoading, error, isError } = useGetCinemasNearby(
    latitude,
    longtitude,
    10,
    10
  );
  const router = useRouter();

  const goToCinemaDetail = useCallback(
    (cinemaId: string) => {
      router.push(`/cinemas/${cinemaId}`);
    },
    [router]
  );

  const cinemas = data?.cinemas || [];



  

  return (
    // <div className="grid grid-cols-1 gap-4 py-4">
    //   {cinemas.map((cinema) => (
    //     <CinemaLocationCard
    //       key={cinema.id}
    //       cinema={cinema}
    //       onSelect={goToCinemaDetail}
    //     />
    //   ))}
    // </div>

    <div className="px-6">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-bold text-lg"> 🎯RẠP GẦN BẠN</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="m-0">
          {isError ? (
            <ErrorFallback message={error.message} />
          ) : isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <CinemaLocationCard.Skeleton />
              </CarouselItem>
            ))
          ) : cinemas.length === 0 ? (
            <div className="text-center py-10 text-gray-500 flex items-center justify-center w-full">
              🎦Không có rạp nào gần cả.
            </div>
          ) : (
            cinemas.map((cinema, idx) => {
              return (
                <CarouselItem
                  key={cinema.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <CinemaLocationCard cinema={cinema} onSelect={goToCinemaDetail}/>
                </CarouselItem>
              );
            })
          )}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

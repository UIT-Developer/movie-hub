import { Button } from "@movie-hub/shacdn-ui/button";
import { Card, CardContent } from "@movie-hub/shacdn-ui/card";
import { CinemaLocationResponse } from "apps/web/src/libs/types/cinema.type";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export function CinemaLocationCard({ cinema, onSelect }: {
  cinema: CinemaLocationResponse,
  onSelect: (cinemaId: string) => void,
}) {
  return (
    <Card
      className="w-full rounded-2xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer bg-gray-900 border-none"
      onClick={() => onSelect(cinema.id)}
    >
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="relative w-full h-40 rounded-xl overflow-hidden border ">
          <Image
            src={cinema.images?.[0] || '/images/placeholder-bg.png'}
            alt={cinema.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-white text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
            {cinema.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {cinema.location?.distanceText || '—'}
          </div>

          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-4 h-4" /> {cinema.rating || '—'}
            <span className="text-gray-500 ml-1">({cinema.totalReviews})</span>
          </div>
        </div>

        <Button  className="w-full mt-2 rounded-xl">Xem chi tiết</Button>
      </CardContent>
    </Card>
  );
}

CinemaLocationCard.Skeleton = function CinemaLocationCardSkeleton() {
  return (
    <Card className="w-full rounded-2xl shadow-md p-4 animate-pulse">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="w-full h-40 rounded-xl bg-gray-700" />

        <div className="flex flex-col gap-2">
          <div className="h-6 w-3/4 bg-gray-700 rounded" />
          <div className="h-4 w-1/2 bg-gray-700 rounded" />
          <div className="h-4 w-1/3 bg-gray-700 rounded" />
        </div>
        <div className="h-10 w-full bg-gray-700 rounded-xl mt-2" />
      </CardContent>
    </Card>
  );
}
import { Button } from "@movie-hub/shacdn-ui/button";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  title: string;
  image: string;
  releaseDate?: string;
  genre: string[],
  runtime: number
}

export default function MovieCard({ title, image, releaseDate, genre, runtime }: Props) {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-between p-4 bg-gray-900 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
      {/* Poster */}
      <div
        onClick={() => {
          router.push(`/movies/`);
          scrollTo(0,0)
        }}
        className="relative  w-full h-60 rounded-lg cursor-pointer"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-right-bottom object-cover rounded-lg"
        />
      </div>

      <p className="font-semibold mt-2 truncate text-white ">{title}</p>
      <p className="text-sm text-gray-400 mt-2 overflow-ellipsis whitespace-nowrap">
        {releaseDate} | {(genre ?? []).join(' | ')} | {runtime}
      </p>
      <div className="flex items-center justify-between mt-4 pb-4">
        <Button className="rounded-xl">
          Đặt vé
        </Button>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-purple-600 fill-purple-600" />
          5.0
        </p>
      </div>
    </div>
  );
}

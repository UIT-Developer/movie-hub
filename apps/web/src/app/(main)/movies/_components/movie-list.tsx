'use client'
import { useGetMovies } from "apps/web/src/hooks/movie-hooks";

interface MovieListProps {
  isShowing: boolean;
}
export const MovieList = ({ isShowing }: MovieListProps) => {
  const {data, error} = useGetMovies();
  if (error) {
    return <div className="text-lg font-bold text-gray-300 mb-6 text-center">Đã có lỗi xảy ra</div>;
  }
  return data.length > 0 ? (
    <div className="relative md:px-16 lg:px-40 overflow-hidden min-h-[80vh]">
      <div className="flex flex-wrap max-sm:justify-center gap-8"></div>
    </div>
  ) : (
    <div className="text-lg font-bold text-gray-300 mb-6 text-center">Không có phim nào</div>
  );
}
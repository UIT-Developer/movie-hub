import Image from "next/image";

type Props = {
  title: string;
  image: string;
  releaseDate?: string; // optional, chỉ dùng cho phim sắp chiếu
};

export default function MovieCard({ title, image, releaseDate }: Props) {
  return (
    <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden mx-auto flex flex-col ">
      {/* Poster */}
      <div className="relative w-full h-[380px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover" 
        />
      </div>

      {/* Info */}
      <div className="p-3 text-center flex flex-col gap-2 bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-b-lg">
        <h3 className="font-extrabold text-base md:text-lg uppercase text-white mb-1 tracking-wide" style={{letterSpacing:1}}>
          {title}
        </h3>

        {/* Ngày chiếu (nếu có) */}
        {releaseDate && (
          <p className="text-sm text-yellow-300 mb-2">📅 Ra mắt: {releaseDate}</p>
        )}

        <div className="flex items-center justify-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-red-500 bg-white text-red-600 font-semibold text-sm shadow hover:bg-red-50 transition">
            <span className="inline-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
            </span>
            <span className="underline">Trailer</span>
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-1 rounded font-sans font-bold text-sm text-gray-900 shadow transition">
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
}

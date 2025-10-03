'use client';

export const CinemaScreen = () => {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 700 50" className="w-full h-12 text-rose-500/30">
        <path
          d="M10 40 Q350 10 690 40"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
        />
      </svg>
      <p className="text-gray-400 text-sm mb-6">Màn hình</p>
    </div>
  );
};

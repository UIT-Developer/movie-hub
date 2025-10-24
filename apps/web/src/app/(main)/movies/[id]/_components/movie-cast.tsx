'use client';
import Image from 'next/image';

export interface Actor {
  name?: string;
  profileUrl?: string;
}

interface MovieCastProps {
  actors?: Actor[] | null;
}

export const MovieCast = ({ actors }: MovieCastProps) => (
  <div className="relative">
    <p className="text-white text-lg font-bold mt-20">Diễn viên</p>
    {actors && actors.length > 0 ? (<div className="overflow-x-auto hide-scrollbar mt-8 pb-4">
      <div className="flex items-center gap-4 w-max px-4">
        {actors.map((actor, idx) => (
          <div key={idx} className="flex flex-col items-center text-center mx-4">
            <Image
              src={typeof actor?.profileUrl === 'string' && actor?.profileUrl.trim() !== ''
                ? actor.profileUrl
                : '/images/placeholder.png'}
              alt={actor?.name || 'Actor'}
              className="rounded-full aspect-square object-cover"
              height={100}
              width={100}
            />
            <p className="text-xl font-medium text-neutral-400 mt-3">
              {actor.name || 'Chưa cập nhật'}
            </p>
          </div>
        ))}
      </div>
    </div>) : (
      <p className="text-gray-500 mt-4">Không có thông tin diễn viên.</p>
    )}
  </div>
);

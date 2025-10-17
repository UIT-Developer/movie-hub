'use client';
import Image from 'next/image';

interface Actor {
  name: string;
  image: string;
}

interface MovieCastProps {
  actors: Actor[];
}

export const MovieCast = ({ actors }: MovieCastProps) => (
  <div className='relative'>
    <p className="text-white text-lg font-bold mt-20">Diễn viên</p>
    <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
      <div className="flex items-center gap-4 w-max px-4">
        {actors.map((actor, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <Image
              src={actor.image}
              alt={actor.name}
              className="rounded-full aspect-square object-cover"
              height={100}
              width={100}
            />
            <p className="text-xl font-medium text-neutral-400 mt-3">
              {actor.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

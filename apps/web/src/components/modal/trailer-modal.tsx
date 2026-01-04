'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useTrailerModal } from '../../stores/trailer-modal-store';

export const TrailerModal = () => {
  const { isOpen, trailerUrl, closeModal } = useTrailerModal();

  if (!isOpen || !trailerUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={closeModal} // click overlay sẽ đóng
    >
      <div
        className="rounded-lg overflow-hidden w-[90%] md:w-[800px]"
        onClick={(e) => e.stopPropagation()} // chặn click bên trong khung
      >
        <div className="flex justify-end p-2">
          <Button variant="ghost" onClick={closeModal}>
            ✕
          </Button>
        </div>
        <div className="aspect-video">
          <iframe
            src={trailerUrl.replace('watch?v=', 'embed/') + '?autoplay=1'}
            title="Trailer"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

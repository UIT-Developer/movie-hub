import { create } from "zustand";

interface TrailerModalState {
  isOpen: boolean;
  trailerUrl: string | null;
  openModal: (url: string) => void;
  closeModal: () => void;
}

export const useTrailerModal = create<TrailerModalState>((set) => ({
  isOpen: false,
  trailerUrl: null,
  openModal: (url) => set({ isOpen: true, trailerUrl: url }),
  closeModal: () => set({ isOpen: false, trailerUrl: null }),
}));

'use client';
import { useEffect, useState } from "react";
import { TrailerModal } from "../modal/trailer-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <TrailerModal />
    </>
  );
};

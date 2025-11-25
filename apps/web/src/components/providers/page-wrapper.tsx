'use client';
import { useState, useEffect } from 'react';
import Loading from '../loading';

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Khi client mount xong thì bật mounted
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return <>{children}</>;
}

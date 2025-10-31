'use client';
import { useState, useEffect } from 'react';
import Loading from '../loading';


export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Khi mount xong => tắt loading
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
}

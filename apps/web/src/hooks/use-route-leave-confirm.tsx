'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBookingStore } from '../stores/booking-store';


export function useBookingLeaveProtection() {
  const router = useRouter();
  const { selectedSeats, resetBooking } = useBookingStore();

  const [open, setOpen] = useState(false);
  const nextUrlRef = useRef<string | null>(null);

  // ❗ 1) Bảo vệ khi F5 / back / close tab
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (selectedSeats.length > 0) {
        event.preventDefault();
        event.returnValue = ''; // popup native browser
        resetBooking();
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [selectedSeats, resetBooking]);

  // ❗ 2) Intercept navigation trong SPA Next.js
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a'
      ) as HTMLAnchorElement;
      if (!anchor) return;

      const url = anchor.href;
      if (!url) return;

      // Nếu bỏ trang mà đang giữ ghế → mở Dialog
      if (selectedSeats.length > 0) {
        e.preventDefault();
        nextUrlRef.current = url;
        setOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [selectedSeats]);

  // ❗ User xác nhận thoát
  const confirmLeave = useCallback(() => {
    resetBooking();
    if (nextUrlRef.current) {
      window.location.href = nextUrlRef.current;
    }
  }, [resetBooking]);

  // ❗ User muốn ở lại
  const cancelLeave = useCallback(() => {
    nextUrlRef.current = null;
    setOpen(false);
  }, []);

  return { open, confirmLeave, cancelLeave };
}

'use client';
import { useCallback, useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useRouter } from 'next/navigation';

export default function BookingBar() {
  const router = useRouter();
  const {
    selectedSeats,
    totalPrice,
    tickets,
    ticketCounts,
    holdTimeSeconds,
    resetBooking,
    currentShowtimeId,
  } = useBookingStore();
  const [timeLeft, setTimeLeft] = useState(holdTimeSeconds);

  useEffect(() => {
    if (selectedSeats.length === 0) {
      setTimeLeft(holdTimeSeconds);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          resetBooking();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSeats, holdTimeSeconds, resetBooking]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const onClickContinue = useCallback(() => {
    if (currentShowtimeId) {
      router.push(`${currentShowtimeId}/select-food`);
    }
  }, [router, currentShowtimeId]);

  return (
    <AnimatePresence>
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white border-t border-gray-700 shadow-lg"
        >
          <div className="max-w-4xl mx-auto flex justify-between items-center p-4 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div>
                <span className="font-medium">Ghế đã chọn: </span>
                <span>
                  {selectedSeats.map((seatLabel) => seatLabel).join(', ')}
                </span>
              </div>

              <div className="hidden sm:block h-4 w-px bg-gray-700 mx-2" />

              <div className="flex flex-col">
                <span className="font-medium">Số lượng theo loại vé:</span>
                <div className="mt-1 space-y-1">
                  {tickets.map((ticket) => {
                    const count = ticketCounts[ticket.key] ?? 0;
                    if (count === 0) return null; // chỉ hiện loại vé có số lượng > 0
                    return (
                      <div
                        key={ticket.key}
                        className="flex justify-between text-xs"
                      >
                        <span>{ticket.label}</span>
                        <span className="font-semibold">x{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden sm:block h-4 w-px bg-gray-700 mx-2" />

              <div>
                <span className="font-medium">Tổng tiền: </span>
                <span className="font-semibold text-white">
                  {totalPrice.toLocaleString()}₫
                </span>
              </div>

              <div className="hidden sm:block h-4 w-px bg-gray-700 mx-2" />

              <div>
                <span className="font-medium">Giữ ghế còn lại: </span>
                <span className="font-mono text-white">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <Button onClick={onClickContinue}>Tiếp tục</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

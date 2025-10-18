'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@movie-hub/shacdn-ui/button';

type BookingSummaryModalProps = {
  totalTickets: number;
  selectedSeats: string[];
  ticketCounts: Record<string, number>;
  tickets: { key: string; label: string; price: number }[];
  onCheckout: () => void;
};

export const BookingSummaryModal: React.FC<BookingSummaryModalProps> = ({
  totalTickets,
  selectedSeats,
  ticketCounts,
  tickets,
  onCheckout,
}) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 phút = 300 giây

  // ⏳ Đếm ngược giữ chỗ
  useEffect(() => {
    if (totalTickets === 0 || selectedSeats.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTickets, selectedSeats]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // 💰 Tính tổng tiền
  const totalPrice = tickets.reduce((sum, t) => {
    return sum + t.price * (ticketCounts[t.key] || 0);
  }, 0);

  // 🎬 Ẩn modal khi chưa chọn ghế hoặc vé
  if (totalTickets === 0 || selectedSeats.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className="fixed w-full bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-zinc-700 px-6 py-4 text-white backdrop-blur-md z-50"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-col">
          <p className="text-sm opacity-80">
            Vé: {totalTickets} | Ghế: {selectedSeats.join(', ')}
          </p>
          <p className="font-semibold text-lg">
            Tổng tiền: {totalPrice.toLocaleString()} đ
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-red-400 font-medium">
            Giữ chỗ: {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <Button
            onClick={onCheckout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

'use client';

import { useMemo } from 'react';
import { getVietnameseDay } from '../app/utils/get-vietnamese-day';

type SelectedDateKey = string; // dạng 'YYYY-MM-DD'

interface DateSelect7DaysProps {
  selected: SelectedDateKey;
  onSelect: (value: SelectedDateKey) => void;
}

export const DateSelect7Days = ({
  selected,
  onSelect,
}: DateSelect7DaysProps) => {
  const next7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d.toISOString().split('T')[0]; // format YYYY-MM-DD
    });
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold text-white max-sm:text-center">
        Chọn ngày
      </p>
      <div className="mt-5 flex items-center gap-6 text-sm">
        <span className="grid grid-cols-3 gap-4 md:flex md:flex-wrap">
          {next7Days.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => onSelect(date)}
              className={`flex h-20 w-20 aspect-square cursor-pointer flex-col items-center justify-center rounded-lg ${
                selected === date
                  ? 'bg-rose-500 text-white'
                  : 'border border-rose-500/70'
              }`}
            >
              <span className="font-bold text-white">
                {new Date(date).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                })}
              </span>
              <span className="font-semibold text-neutral-400">
                {getVietnameseDay(date)}
              </span>
            </button>
          ))}
        </span>
      </div>
    </div>
  );
};

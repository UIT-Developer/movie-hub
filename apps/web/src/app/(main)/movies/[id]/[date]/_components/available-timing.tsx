'use client';
import { isoTimeFormat } from '../../../../../utils/iso-time-format';
import { ClockIcon } from 'lucide-react';

interface AvailableTimingProps {
  times: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export const AvailableTiming = ({
  times,
  selectedTime,
  onSelect,
}: AvailableTimingProps) => {
  return (
    <div className="w-60 bg-rose-500/10 border border-rose-500/20 rounded-lg py-10 h-max md:sticky md:top-30">
      <p className="text-lg font-semibold px-6 text-neutral-400">Khung giờ</p>
      <div className="mt-5 space-y-1">
        {times.map((item) => (
          <div
            key={item}
            onClick={() => onSelect(item)}
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
              selectedTime === item
                ? 'bg-rose-500 text-white'
                : 'hover:bg-rose-500/20'
            }`}
          >
            <ClockIcon className="w-5 h-4" color="white" />
            <p className="text-sm text-white">{isoTimeFormat(item)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

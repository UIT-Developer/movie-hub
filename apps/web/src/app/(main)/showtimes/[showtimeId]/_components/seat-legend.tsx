import {
  ReservationStatusEnum,
  SeatStatusEnum,
  SeatTypeEnum,
} from 'apps/web/src/libs/types/showtime.type';
import { Accessibility } from 'lucide-react';

const seatLegendItems = [
  // --- Trạng thái ---
  {
    label: 'Đã đặt',
    color: 'bg-rose-800',
    type: 'CONFIRMED',
  },
  {
    label: 'Đang giữ',
    color: 'bg-neutral-400 animate-pulse',
    type: 'HELD',
  },
  {
    label: 'Hỏng',
    color: 'bg-gray-700',
    type: 'BROKEN',
  },

  // --- Loại ghế ---
  {
    label: 'Thường',
    color: 'bg-transparent border border-rose-500',
    type: SeatTypeEnum.STANDARD,
  },
  {
    label: 'VIP',
    color: 'bg-transparent border border-yellow-500',
    type: SeatTypeEnum.VIP,
  },
  {
    label: 'Cao cấp',
    color: 'bg-transparent border border-blue-400 shadow-[0_0_6px_#60a5fa]',
    type: SeatTypeEnum.PREMIUM,
  },
  {
    label: 'Xe lăn',
    color:
      'bg-transparent border border-cyan-400 text-[10px] flex items-center justify-center',
    icon: Accessibility,
    type: SeatTypeEnum.WHEELCHAIR,
  },
  {
    label: 'Đôi',
    color: 'border-purple-500',
    type: SeatTypeEnum.COUPLE,
    isCouple: true,
  },
];

export const SeatLegend = () => (
  <div className="flex flex-wrap gap-4 mt-8 text-white">
    {seatLegendItems.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        {/* Couple Seat */}
        {item.isCouple ? (
          <div className={`h-5 w-10 rounded border ${item.color}`} />
        ) : (
          <div
            className={`h-5 w-5 rounded flex items-center justify-center ${item.color}`}
          >
            {/* icon wheelchair nếu có */}
            {item.icon && (
              <item.icon className="w-3 h-3 md:w-4 md:h-4 text-cyan-300" />
            )}
          </div>
        )}

        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

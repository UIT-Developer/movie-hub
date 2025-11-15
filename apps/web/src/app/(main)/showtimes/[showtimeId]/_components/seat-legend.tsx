import {
  ReservationStatusEnum,
  SeatStatusEnum,
  SeatTypeEnum,
} from 'apps/web/src/libs/types/showtime.type';

const seatLegendItems = [
  {
    label: 'Đã đặt',
    color: 'bg-rose-800',
    type: ReservationStatusEnum.CONFIRMED,
  },
  {
    label: 'Đang giữ',
    color: 'bg-neutral-400 animate-pulse',
    type: ReservationStatusEnum.HELD,
  },
  { label: 'Hỏng', color: 'bg-gray-700', type: SeatStatusEnum.BROKEN },
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
  { label: 'Đôi', color: 'border-purple-500', type: SeatTypeEnum.COUPLE },
];

export const SeatLegend = () => (
  <div className="flex flex-wrap gap-4 mt-8 text-white">
    {seatLegendItems.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        {item.type === SeatTypeEnum.COUPLE ? (
          <div className="flex">
            <div className={`h-5 w-5 rounded border ${item.color}`} />
            <div className={`h-5 w-5 rounded border ${item.color}`} />
          </div>
        ) : (
          <div className={`h-5 w-5 rounded ${item.color}`} />
        )}
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

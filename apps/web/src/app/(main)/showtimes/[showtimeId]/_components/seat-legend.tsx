import { ReservationStatusEnum, SeatStatusEnum, SeatTypeEnum } from "apps/web/src/libs/types/showtime.type";



const seatLegendItems = [
  {
    label: 'Đã đặt',
    color: 'bg-rose-700',
    status: ReservationStatusEnum.CONFIRMED,
  },
  {
    label: 'Đang giữ',
    color: 'bg-rose-500',
    status: ReservationStatusEnum.HELD,
  },
  {
    label: 'Hỏng',
    color: 'bg-gray-600',
    status: SeatStatusEnum.BROKEN,
  },
  {
    label: 'Thường',
    color: 'bg-transparent border border-rose-500',
    type: SeatTypeEnum.STANDARD,
  },
  { label: 'VIP', color: 'bg-blue-500', type: SeatTypeEnum.VIP },
  { label: 'Đôi', color: 'bg-purple-500', type: SeatTypeEnum.COUPLE },
];

export const SeatLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-8 text-white">
      {seatLegendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded ${item.color}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

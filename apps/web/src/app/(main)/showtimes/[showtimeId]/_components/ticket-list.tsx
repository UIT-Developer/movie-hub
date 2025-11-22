'use client';

import { SeatTypeEnum } from 'apps/web/src/libs/types/showtime.type';
import React from 'react';

export type TicketType = {
  key: SeatTypeEnum;
  label: string;
  price: number;
};

type TicketTypeListProps = {
  tickets: TicketType[];
};

export const TicketTypeList: React.FC<TicketTypeListProps> = ({
  tickets,
}) => {
  return (
    <div className="w-full mt-10 text-white flex-col gap-4 items-center justify-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Giá vé</h2>

      <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
        {tickets.map((ticket) => (
          <div
            key={ticket.key}
            className="flex flex-col justify-between items-center bg-rose-700/20 border border-rose-700/30 p-4 rounded-xl gap-4"
          >
            <p className="font-medium text-rose-400">{ticket.label}</p>
            <p className="text-sm opacity-80 text-neutral-300">
              {ticket.price.toLocaleString()} đ
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

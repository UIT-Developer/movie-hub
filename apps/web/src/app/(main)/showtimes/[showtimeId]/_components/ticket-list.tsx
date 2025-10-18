'use client';
import { TicketTypeEnum } from '@movie-hub/shared-types';
import React from 'react';

export type TicketType = {
  key: string;
  label: string;
  price: number;
};

type TicketTypeListProps = {
  tickets: TicketType[];
  ticketCounts: Record<string, number>;
  onTicketChange: (type: string, delta: number) => void;
};

export const TicketTypeList: React.FC<TicketTypeListProps> = ({
  tickets,
  ticketCounts,
  onTicketChange,
}) => {
  return (
    <div className="w-full mt-10 text-white flex-col gap-4 items-center justify-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Chọn loại vé</h2>

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

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded-md bg-rose-700/30 text-rose-400 border-rose-700/60 hover:bg-rose-600 hover:text-white hover:border-rose-500"
                onClick={() => onTicketChange(ticket.key, -1)}
              >
                -
              </button>

              <span className="w-[20px] text-center">
                {ticketCounts[ticket.key] ?? 0}
              </span>

              <button
                className="px-3 py-1 rounded-md bg-rose-700/30 text-rose-400 border-rose-700/60 hover:bg-rose-600 hover:text-white hover:border-rose-500"
                onClick={() => onTicketChange(ticket.key, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

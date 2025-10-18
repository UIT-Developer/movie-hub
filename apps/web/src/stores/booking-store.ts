import { create } from 'zustand';

import {
  ReservationStatusEnum,
  SeatRowDto,
  SeatTypeEnum,
  ShowtimeSeatResponse,
  TicketTypeEnum
} from '@movie-hub/shared-types';
import { toast } from 'sonner';

type BookingState = {
  selectedSeats: string[];
  seatReservationStatus: Record<string, ReservationStatusEnum>;
  seatMap: SeatRowDto[];

  tickets: { key: TicketTypeEnum; label: string; price: number }[];
  ticketCounts: Record<TicketTypeEnum, number>;

  maxTickets: number;
  holdTimeSeconds: number;
  socketConnected: boolean;
  // connectSocket: (showtimeId: string) => void;
  // disconnectSocket: () => void;

  initBookingData: (data: ShowtimeSeatResponse) => void;
  toggleSeat: (seatId: string) => void;
  updateTicketCount: (type: TicketTypeEnum, delta: number) => void;
  // resetBooking: () => void;

  totalTickets: number;
  totalPrice: number;
};

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedSeats: [],
  seatReservationStatus: {},
  seatMap: [],
  tickets: [],
  ticketCounts: {} as Record<TicketTypeEnum, number>,
  maxTickets: 8,
  holdTimeSeconds: 300,
  socketConnected: false,

  initBookingData: (data: ShowtimeSeatResponse) => {
    const seatReservationStatus: Record<string, ReservationStatusEnum> = {};
    data.seat_map.forEach((row) =>
      row.seats.forEach((seat) => {
        seatReservationStatus[seat.id] = seat.reservationStatus;
      })
    );

    const tickets = data.ticketTypes.map((type) => {
      const pricing = data.ticketPrices.find(
        (p) => p.ticketType === type && p.seatType === SeatTypeEnum.STANDARD
      );
      const label =
        type === TicketTypeEnum.ADULT
          ? 'Người lớn'
          : type === TicketTypeEnum.STUDENT
          ? 'Học sinh/Sinh viên'
          : type === TicketTypeEnum.CHILD
          ? 'Trẻ em'
          : 'Đôi';
      return { key: type, label, price: pricing?.price ?? 0 };
    });

    const ticketCounts = Object.fromEntries(
      data.ticketTypes.map((t) => [t, 0])
    ) as Record<TicketTypeEnum, number>;

    set({
      seatMap: data.seat_map,
      tickets,
      ticketCounts,
      maxTickets: data.rules.max_selectable,
      holdTimeSeconds: data.rules.hold_time_seconds,
      selectedSeats: [],
    });
  },

  toggleSeat: (seatId) => {
    const { selectedSeats, totalTickets, seatReservationStatus } = get();
    if (totalTickets === 0) {
      toast.error('Vui lòng chọn vé trước!');
      return;
    }
    if (seatReservationStatus[seatId] === ReservationStatusEnum.CONFIRMED) {
      toast.error('Ghế này đã được đặt!');
      return;
    }
    if (seatReservationStatus[seatId] === ReservationStatusEnum.HELD) {
      toast.error('Ghế này đang được giữ bởi người dùng khác!');
      return;
    }
    if (
      !selectedSeats.includes(seatId) &&
      selectedSeats.length >= totalTickets
    ) {
      toast.error(`Chỉ có thể chọn tối đa ${get().maxTickets} ghế!`);
      return;
    }

    const newSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((s) => s !== seatId)
      : [...selectedSeats, seatId];

    set({ selectedSeats: newSeats,  });
  },

  updateTicketCount: (type, delta) => {
    const { ticketCounts, selectedSeats, maxTickets } = get();
    const updated = {
      ...ticketCounts,
      [type]: Math.max(0, (ticketCounts[type] ?? 0) + delta),
    };
    const total = Object.values(updated).reduce((a, b) => a + b, 0);

    if (total > maxTickets) {
      toast.error(`Chỉ được chọn tối đa ${maxTickets} vé!`);
      return;
    }

    if (total < selectedSeats.length) {
      set({ selectedSeats: [] });
    }

    set({ ticketCounts: updated });
  },

  get totalTickets() {
    return Object.values(get().ticketCounts).reduce((a, b) => a + b, 0);
  },

  get totalPrice() {
    const { tickets, ticketCounts } = get();
    return tickets.reduce(
      (sum, t) => sum + t.price * (ticketCounts[t.key] ?? 0),
      0
    );
  },

  // connectSocket: (showtimeId) => {
  //   const socket = getSocket();
  //   if (!socket.connected) socket.connect();
  //   socket.emit('join_showtime', { showtimeId });

  //   socket.on('connect', () => set({ socketConnected: true }));
  //   socket.on('seat_locked', (seatId: string) =>
  //     set((state) => ({
  //       seatReservationStatus: {
  //         ...state.seatReservationStatus,
  //         [seatId]: ReservationStatusEnum.HELD,
  //       },
  //     }))
  //   );
  //   socket.on('seat_unlocked', (seatId: string) =>
  //     set((state) => ({
  //       seatReservationStatus: {
  //         ...state.seatReservationStatus,
  //         [seatId]: ReservationStatusEnum.AVAILABLE,
  //       },
  //     }))

  //   );
  //   socket.on('seat_confirmed', (seatId: string) =>
  //     set((state) => ({
  //       seatReservationStatus: {
  //         ...state.seatReservationStatus,
  //         [seatId]: ReservationStatusEnum.CONFIRMED,
  //       },
  //       selectedSeats: state.selectedSeats.filter((s) => s !== seatId),
  //     }))
  //   );
  // },

  // disconnectSocket: () => {
  //   const socket = getSocket();
  //   socket.disconnect();
  //   set({ socketConnected: false });
  // },

  // resetBooking: () =>
  //   set({
  //     selectedSeats: [],
  //     ticketCounts: {} as Record<TicketTypeEnum, number>,
  //   }),
}));

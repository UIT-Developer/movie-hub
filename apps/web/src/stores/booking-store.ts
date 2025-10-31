import { create } from 'zustand';
import { toast } from 'sonner';
import {
  ReservationStatusEnum,
  SeatRowDto,
  SeatTypeEnum,
  ShowtimeSeatResponse,
  TicketTypeEnum,
} from '../libs/types/showtime.type';
import { io, Socket } from 'socket.io-client';
import { SeatEvent } from '@movie-hub/shared-types';

type BookingState = {
  selectedSeats: string[];
  seatReservationStatus: Record<string, ReservationStatusEnum>;
  seatHeldByUser: Record<string, boolean>;
  seatMap: SeatRowDto[];

  tickets: { key: TicketTypeEnum; label: string; price: number }[];
  ticketCounts: Record<TicketTypeEnum, number>;

  maxTickets: number;
  holdTimeSeconds: number;
  socketConnected: boolean;
  connectSocket: (showtimeId: string, token: string) => void;
  disconnectSocket: () => void;

  initBookingData: (data: ShowtimeSeatResponse) => void;
  toggleSeat: (seatId: string) => void;
  updateTicketCount: (type: TicketTypeEnum, delta: number) => void;
  resetBooking: () => void;

  totalTickets: number;
  totalPrice: number;
};
let socket: Socket | null = null;
export const useBookingStore = create<BookingState>(
  (set, get) => ({
  selectedSeats: [],
  seatReservationStatus: {},
  seatHeldByUser: {},
  seatMap: [],
  tickets: [],
  ticketCounts: {} as Record<TicketTypeEnum, number>,
  maxTickets: 8,
  holdTimeSeconds: 300,
  socketConnected: false,

  initBookingData: (data: ShowtimeSeatResponse) => {
    const seatReservationStatus: Record<string, ReservationStatusEnum> = {};
    const seatHeldByUser: Record<string, boolean> = {};
    const selectedSeats = [] as string[];
    data.seat_map.forEach((row) =>
      row.seats.forEach((seat) => {
        seatReservationStatus[seat.id] = seat.reservationStatus;
        seatHeldByUser[seat.id] = seat.isHeldByCurrentUser || false;
        selectedSeats.push(...(seat.isHeldByCurrentUser ? [seat.id] : []));
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
      seatReservationStatus,
      seatHeldByUser,
      selectedSeats,
    });
  },

  toggleSeat: (seatId) => {
    const { selectedSeats, ticketCounts, seatReservationStatus } = get();
    const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
    if (totalTickets === 0) {
      toast.error('Vui lòng chọn vé trước!');
      return;
    }
    if (seatReservationStatus[seatId] === ReservationStatusEnum.CONFIRMED) {
      toast.error('Ghế này đã được đặt!');
      return;
    }
    const isHeldByOther =
      seatReservationStatus[seatId] === ReservationStatusEnum.HELD &&
      !get().seatHeldByUser[seatId];

    if (isHeldByOther) {
      toast.error('Ghế này đang được giữ bởi người dùng khác!');
      return;
    }
    if (
      !selectedSeats.includes(seatId) &&
      selectedSeats.length >= totalTickets
    ) {
      toast.error(
        `Chỉ được chọn tối đa ${totalTickets} ghế theo số vé đã chọn!`
      );
      return;
    }

    const newSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((s) => s !== seatId)
      : [...selectedSeats, seatId];

    set({ selectedSeats: newSeats });

    if (socket) {
      if (selectedSeats.includes(seatId)) {
        socket.emit('release_seat', {
          showtimeId: getShowtimeId(),
          seatId,
        });
      } else {
        socket.emit('hold_seat', {
          showtimeId: getShowtimeId(),
          seatId,
        });
      }
    }
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

  connectSocket: (showtimeId: string, userId: string) => {
    if (socket && socket.connected) return;
    socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
      query: { showtimeId },
    });

    socket.on('connect', () => set({ socketConnected: true }));
    socket.on('disconnect', () => set({ socketConnected: false }));

    // EVENTS
    socket.on('seat_held', (data: SeatEvent) => {
      set((state) => {
        

        return {
          seatReservationStatus: {
            ...state.seatReservationStatus,
            [data.seatId]: ReservationStatusEnum.HELD,
          },
          seatHeldByUser: {
            ...state.seatHeldByUser,
            [data.seatId]: data.userId === userId,
          },
        };
      });
    });

    socket.on('seat_released', (data: SeatEvent) => {
      set((state) => {
        return {
          seatReservationStatus: {
            ...state.seatReservationStatus,
            [data.seatId]: ReservationStatusEnum.AVAILABLE,
          },
          seatHeldByUser: {
            ...state.seatHeldByUser,
            [data.seatId]: false,
          },
        };
      });
    });

    socket.on('seat_booked', (data: SeatEvent) => {
      set((state) => {
        const newSeatMap = state.seatMap.map((row) => ({
          ...row,
          seats: row.seats.map((seat) =>
            seat.id === data.seatId
              ? { ...seat, reservationStatus: ReservationStatusEnum.CONFIRMED }
              : seat
          ),
        }));

        return {
          seatMap: newSeatMap,
          seatReservationStatus: {
            ...state.seatReservationStatus,
            [data.seatId]: ReservationStatusEnum.CONFIRMED,
          },
          selectedSeats: state.selectedSeats.filter((s) => s !== data.seatId),
        };
      });
    });

    socket.on('limit_reached', () =>
      toast.error('Bạn đã chọn quá số ghế cho phép!')
    );
  },

  disconnectSocket: () => {
    if (socket) socket.disconnect();
    socket = null;
    set({ socketConnected: false });
  },

  resetBooking: () =>
    set({
      selectedSeats: [],
      ticketCounts: {} as Record<TicketTypeEnum, number>,
    }),
})
)
;

function getShowtimeId() {
  // Nếu bạn có cách lấy showtimeId global trong store thì dùng ở đây
  return '1743dad9-5b78-49a1-be56-5c7205d248b2';
}

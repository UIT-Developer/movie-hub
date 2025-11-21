import { SeatEvent } from '@movie-hub/shared-types';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { create } from 'zustand';
import {
  ReservationStatusEnum,
  SeatRowDto,
  SeatTypeEnum,
  ShowtimeSeatResponse,

} from '../libs/types/showtime.type';
import { updateLocalStorage } from '../app/utils/update-local-storage';
const foodList = [
  {
    id: 'f1',
    name: 'Bắp rang bơ',
    price: 25000,
    image: 'https://i.imgur.com/1aB6FJX.jpg',
  },
  {
    id: 'f2',
    name: 'Pepsi',
    price: 15000,
    image: 'https://i.imgur.com/7QyLxLm.jpg',
  },
  {
    id: 'f3',
    name: 'Kẹo',
    price: 10000,
    image: 'https://i.imgur.com/Xz2KXWw.jpg',
  },
  {
    id: 'f4',
    name: 'Combo Bắp + Nước',
    price: 60000,
    image: 'https://i.imgur.com/0tDyYV2.jpg',
  },
];
type BookingState = {
  currentShowtimeId: string | null;
  selectedSeats: string[]; // row+number
  seatReservationStatus: Record<string, ReservationStatusEnum>;
  seatHeldByUser: Record<string, boolean>;
  seatMap: SeatRowDto[];
  tickets: { key: SeatTypeEnum; label: string; price: number }[];
  ticketCounts: Record<SeatTypeEnum, number>;
  maxTickets: number;
  holdTimeSeconds: number;
  socketConnected: boolean;

  // Map label <-> seatId để emit socket
  seatLabelToId: Record<string, string>;
  seatIdToLabel: Record<string, string>;

  connectSocket: (showtimeId: string, userId: string) => void;
  disconnectSocket: () => void;

  initBookingData: (data: ShowtimeSeatResponse) => void;
  toggleSeat: (seatLabel: string) => void;
  updateTicketCount: (type: SeatTypeEnum, delta: number) => void;
  resetBooking: () => void;

  totalTickets: number;
  totalPrice: number;

  foodSelections: Record<string, number>; // key = foodId, value = quantity
  setFoodSelection: (foodId: string, qty: number) => void;
  totalFoodPrice: number;
};

let socket: Socket | null = null;

export const useBookingStore = create<BookingState>((set, get) => ({
  currentShowtimeId: null,
  selectedSeats: [],
  seatReservationStatus: {},
  seatHeldByUser: {},
  seatMap: [],
  tickets: [],
  ticketCounts: {} as Record<SeatTypeEnum, number>,
  maxTickets: 8,
  totalPrice: 0,
  totalTickets: 0,
  holdTimeSeconds: 600,
  socketConnected: false,
  seatLabelToId: {},
  seatIdToLabel: {},
  foodSelections: {},
  totalFoodPrice: 0,

  // ---------------- initBookingData ----------------
  initBookingData: (data: ShowtimeSeatResponse) => {
    const seatReservationStatus: Record<string, ReservationStatusEnum> = {};
    const seatHeldByUser: Record<string, boolean> = {};
    const selectedSeats: string[] = [];
    const seatLabelToId: Record<string, string> = {};
    const seatIdToLabel: Record<string, string> = {};

    const seatMap = data.seat_map.map((row) => ({
      ...row,
      seats: row.seats.map((seat) => {
        const label = `${row.row}${seat.number}`;
        seatReservationStatus[label] = seat.reservationStatus;
        seatHeldByUser[label] = seat.isHeldByCurrentUser || false;
        if (seat.isHeldByCurrentUser) selectedSeats.push(label);
        seatLabelToId[label] = seat.id;
        seatIdToLabel[seat.id] = label;
        return { ...seat, label };
      }),
    }));

    const tickets = data.ticketPrices.map((type) => {
      const pricing = type.price;
      const label =
        type.seatType === SeatTypeEnum.STANDARD
          ? 'Ghế thường'
          : type.seatType === SeatTypeEnum.PREMIUM
          ? 'Vé cao cấp'
          : type.seatType === SeatTypeEnum.VIP
          ? 'Vé VIP'
          : type.seatType === SeatTypeEnum.COUPLE
          ? 'Vé đôi'
          : 'Vé xe lăn';
      return { key: type.seatType, label, price: pricing ?? 0 };
    });

    const ticketCounts = Object.fromEntries(
      data.ticketPrices.map((t) => [t.seatType, 0])
    ) as Record<SeatTypeEnum, number>;

    set({
      currentShowtimeId: data.showtime.id,
      seatMap,
      seatReservationStatus,
      seatHeldByUser,
      selectedSeats,
      tickets,
      ticketCounts,
      maxTickets: data.rules.max_selectable,
      seatLabelToId,
      seatIdToLabel,
    });

    const hasHeldSeats = selectedSeats.length > 0;

    // Hydrate localStorage
    const storageKey = `bookingState_${data.showtime.id}`;
    const saved = localStorage.getItem(storageKey);
    if (!hasHeldSeats) {
      const newState = {
        showtimeId: data.showtime.id,
        selectedSeats,
        ticketCounts,
        totalTickets: 0,
        totalPrice: 0,
        totalPriceFood: 0
      };
      localStorage.setItem(storageKey, JSON.stringify(newState));
    } else {
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.showtimeId === data.showtime.id) {
          set({
            selectedSeats: parsed.selectedSeats || [],
            ticketCounts: parsed.ticketCounts || ticketCounts,
            totalTickets: parsed.totalTickets || 0,
            totalPrice: parsed.totalPrice || 0,
            totalFoodPrice: parsed.totalFoodPrice || 0
          });
        }
      } else {
        // Lưu lần đầu
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            showtimeId: data.showtime.id,
            selectedSeats,
            ticketCounts,
            totalTickets: 0,
            totalPrice: 0,
            totalFoodPrice: 0
            
          })
        );
      }
    }
  },

  // ---------------- toggleSeat ----------------
  toggleSeat: (seatLabel: string) => {
    const {
      selectedSeats,
      totalTickets,
      seatReservationStatus,
      seatLabelToId,
    } = get();

    if (totalTickets === 0) {
      toast.error('Vui lòng chọn vé trước!');
      return;
    }

    if (seatReservationStatus[seatLabel] === ReservationStatusEnum.CONFIRMED) {
      toast.error('Ghế này đã được đặt!');
      return;
    }

    const isHeldByOther =
      seatReservationStatus[seatLabel] === ReservationStatusEnum.HELD &&
      !get().seatHeldByUser[seatLabel];

    if (isHeldByOther) {
      toast.error('Ghế này đang được giữ bởi người dùng khác!');
      return;
    }

    if (
      !selectedSeats.includes(seatLabel) &&
      selectedSeats.length >= totalTickets
    ) {
      toast.error(
        `Chỉ được chọn tối đa ${totalTickets} ghế theo số vé đã chọn!`
      );
      return;
    }

    const newSeats = selectedSeats.includes(seatLabel)
      ? selectedSeats.filter((s) => s !== seatLabel)
      : [...selectedSeats, seatLabel];

    set({ selectedSeats: newSeats });

    // update localStorage
    const currentShowtimeId = get().currentShowtimeId;
    const storageKey = `bookingState_${currentShowtimeId}`;
    updateLocalStorage(
      {
        selectedSeats: newSeats,
      },
      storageKey
    );

    // emit socket
    if (socket) {
      const seatId = seatLabelToId[seatLabel];
      console.log('Emitting socket for seatId:', seatId);
      if (selectedSeats.includes(seatLabel)) {
        socket.emit('release_seat', { showtimeId: getShowtimeId(), seatId });
      } else {
        socket.emit('hold_seat', { showtimeId: getShowtimeId(), seatId });
      }
    }
  },

  // ---------------- updateTicketCount ----------------
  updateTicketCount: (type, delta) => {
    const { tickets, ticketCounts, selectedSeats, maxTickets } = get();
    const updated = {
      ...ticketCounts,
      [type]: Math.max(0, (ticketCounts[type] ?? 0) + delta),
    };
    const total = Object.values(updated).reduce((a, b) => a + b, 0);

    if (total > maxTickets) {
      toast.error(`Chỉ được chọn tối đa ${maxTickets} vé!`);
      return;
    }

    let newSelectedSeats = selectedSeats;
    if (total < selectedSeats.length) newSelectedSeats = [];

    const newTotalPrice = tickets.reduce(
      (sum, t) => sum + t.price * (updated[t.key] ?? 0),
      0
    );

    set({
      ticketCounts: updated,
      selectedSeats: newSelectedSeats,
      totalTickets: total,
      totalPrice: newTotalPrice,
    });

    // update localStorage
    const currentShowtimeId = get().currentShowtimeId;
    const storageKey = `bookingState_${currentShowtimeId}`;
    updateLocalStorage(
      {
        ticketCounts: updated,
        totalTickets: total,
        totalPrice: newTotalPrice,
      },
      storageKey
    );
  },

  setFoodSelection: (foodId, qty) => {
  set(state => {
    const updated = { ...state.foodSelections, [foodId]: qty };
     const totalFoodPrice = Object.entries(updated).reduce((sum, [id, q]) => {
      const food = foodList.find(f => f.id === id);
      return sum + (food?.price ?? 0) * q;
    }, 0);
    
    // Update localStorage
    const currentShowtimeId = state.currentShowtimeId;
    if (currentShowtimeId) {
      const storageKey = `bookingState_${currentShowtimeId}`;
     updateLocalStorage(
        { foodSelections: updated, totalFoodPrice },
        storageKey
      );
    }

    return { foodSelections: updated, totalFoodPrice };
  });
},

  // ---------------- Socket ----------------
  connectSocket: (showtimeId: string, userId: string) => {
    if (socket && socket.connected) return;

    socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
      query: { showtimeId },
    });

    socket.on('connect', () => set({ socketConnected: true }));
    socket.on('disconnect', () => set({ socketConnected: false }));

    socket.on('seat_held', (data: SeatEvent) => {
      const label = get().seatIdToLabel[data.seatId];
      if (!label) return;
      set((state) => ({
        seatReservationStatus: {
          ...state.seatReservationStatus,
          [label]: ReservationStatusEnum.HELD,
        },
        seatHeldByUser: {
          ...state.seatHeldByUser,
          [label]: data.userId === userId,
        },
      }));
    });

    socket.on('seat_released', (data: SeatEvent) => {
      const label = get().seatIdToLabel[data.seatId];
      if (!label) return;
      set((state) => ({
        seatReservationStatus: {
          ...state.seatReservationStatus,
          [label]: ReservationStatusEnum.AVAILABLE,
        },
        seatHeldByUser: { ...state.seatHeldByUser, [label]: false },
      }));
    });

    socket.on('seat_booked', (data: SeatEvent) => {
      const label = get().seatIdToLabel[data.seatId];
      if (!label) return;
      set((state) => ({
        seatReservationStatus: {
          ...state.seatReservationStatus,
          [label]: ReservationStatusEnum.CONFIRMED,
        },
        selectedSeats: state.selectedSeats.filter((s) => s !== label),
      }));
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

  resetBooking: () => {
    const { currentShowtimeId } = get();
    if (currentShowtimeId) {
      localStorage.removeItem(`bookingState_${currentShowtimeId}`);
    }
    set({
      selectedSeats: [],
      ticketCounts: {} as Record<SeatTypeEnum, number>,
    });
  },
}));

function getShowtimeId() {
  return (
    useBookingStore.getState().currentShowtimeId ??
    '1743dad9-5b78-49a1-be56-5c7205d248b2'
  );
}

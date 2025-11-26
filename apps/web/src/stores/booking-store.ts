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
  updateHoldTimeSeconds: (seconds: number) => void;
  resetBooking: () => void;

  totalTickets: number;

  foodSelections: Record<string, number>; // key = foodId, value = quantity
  setFoodSelection: (foodId: string, qty: number) => void;
  totalPrice: number;
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
          })
        );
      }
    }
  },

  // ---------------- toggleSeat ----------------
  toggleSeat: (seatLabel: string) => {
    const {
      selectedSeats,
      tickets,
      seatReservationStatus,
      seatLabelToId,
      seatMap,
      maxTickets,
    } = get();

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
    // Tìm seat object
    const allSeats = seatMap.flatMap((row) => row.seats);
    const seatObj = allSeats.find((s) => s.id === seatLabelToId[seatLabel]);
    if (!seatObj) return;

    let newSeats: string[];
    if (selectedSeats.includes(seatLabel)) {
      // bỏ ghế
      newSeats = selectedSeats.filter((s) => s !== seatLabel);
    } else {
      if (selectedSeats.length >= maxTickets) {
        toast.error(`Chỉ được chọn tối đa ${maxTickets} ghế!`);
        return;
      }
      // thêm ghế
      newSeats = [...selectedSeats, seatLabel];
    }

    // 🔹 Tính lại ticketCounts theo loại ghế
    const newTicketCounts: Record<SeatTypeEnum, number> = {
      [SeatTypeEnum.STANDARD]: 0,
      [SeatTypeEnum.VIP]: 0,
      [SeatTypeEnum.COUPLE]: 0,
      [SeatTypeEnum.PREMIUM]: 0,
      [SeatTypeEnum.WHEELCHAIR]: 0,
    };
    newSeats.forEach((label) => {
      const seat = allSeats.find((s) => s.id === seatLabelToId[label]);
      if (seat) {
        newTicketCounts[seat.seatType] =
          (newTicketCounts[seat.seatType] ?? 0) + 1;
      }
    });

    // 🔹 Tính lại tổng số vé
    const totalTickets = newSeats.length;

    // 🔹 Tính lại tổng tiền
    const newTotalPrice = tickets.reduce(
      (sum, t) => sum + t.price * (newTicketCounts[t.key] ?? 0),
      0
    );

    set({
      selectedSeats: newSeats,
      ticketCounts: newTicketCounts,
      totalTickets,
      totalPrice: newTotalPrice,
    });

    // update localStorage
    const currentShowtimeId = get().currentShowtimeId;
    const storageKey = `bookingState_${currentShowtimeId}`;
    updateLocalStorage(
      {
        selectedSeats: newSeats,
        ticketCounts: newTicketCounts,
        totalTickets,
        totalPrice: newTotalPrice,
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
  foodSelections: {},
  setFoodSelection: (foodId, qty) => {
    // const newSelections = { ...get().foodSelections, [foodId]: qty };


    // const foodList = get().foodSelections; // hoặc lưu foodList vào store khi init
    // let newTotalFoodPrice = 0;
    // Object.entries(newSelections).forEach(([id, count]) => {
    //   // bạn cần có map id -> price, ví dụ lưu trong store
    //   const foodPrice = get().foodPriceMap?.[id] ?? 0;
    //   newTotalFoodPrice += foodPrice * count;
    // });

    // set({
    //   foodSelections: newSelections,
    //   totalFoodPrice: newTotalFoodPrice,
    // });

    // // update localStorage
    // const currentShowtimeId = get().currentShowtimeId;
    // if (currentShowtimeId) {
    //   const storageKey = `bookingState_${currentShowtimeId}`;
    //   updateLocalStorage(
    //     {
    //       foodSelections: newSelections,
    //       totalFoodPrice: newTotalFoodPrice,
    //     },
    //     storageKey
    //   );
    // }
  },

  updateHoldTimeSeconds: (seconds: number) => {
    set({ holdTimeSeconds: seconds });
    console.log('Updated holdTimeSeconds to', seconds);
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

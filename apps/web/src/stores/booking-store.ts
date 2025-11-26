import { SeatEvent, UpdateBookingDto } from '@movie-hub/shared-types';
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

type SeatItem = {
  type: string;
  quantity: number;
  price: number;
};

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
  totalTicketPrice: number;

  concessionSelections: Record<string, number>;
  concessionMap: Record<string, { name: string; price: number }>;
  totalConcessionPrice: number;

  promotionCode: string | null;
  discountAmount: number;



  // Actions
  setConcessionSelection: (
    id: string,
    qty: number,
    meta?: { name: string; price: number }
  ) => void;
  setPromotionCode: (code: string | null, amount: number) => void;

  // Build DTO for server
  buildBookingPayload: () => UpdateBookingDto;

  // Build preview UI
  buildPreviewData: () => {
    seats: SeatItem[];
    concessions: Array<{ name: string; price: number; quantity: number }>;
    discountCode: string | null;
    discountAmount: number;
    total: number;
  };

  getTotalFinal: () => number;
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
  totalTicketPrice: 0,
  totalTickets: 0,
  holdTimeSeconds: 60,
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
          ? 'Ghế cao cấp'
          : type.seatType === SeatTypeEnum.VIP
          ? 'Ghế VIP'
          : type.seatType === SeatTypeEnum.COUPLE
          ? 'Ghế đôi'
          : 'Ghế xe lăn';
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
            totalTicketPrice: parsed.totalTicketPrice || 0,
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
      if (selectedSeats.length > maxTickets) {
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
    if (newSeats.length === 0) 
      set({ holdTimeSeconds: 60 });

    set({
      selectedSeats: newSeats,
      ticketCounts: newTicketCounts,
      totalTickets,
      totalTicketPrice: newTotalPrice,
    });

    // update localStorage
    const currentShowtimeId = get().currentShowtimeId;
    const storageKey = `bookingState_${currentShowtimeId}`;
    updateLocalStorage(
      {
        selectedSeats: newSeats,
        ticketCounts: newTicketCounts,
        totalTickets,
        totalTicketPrice: newTotalPrice,
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
  concessionSelections: {},
  concessionMap: {},
  promotionCode: null,
  discountAmount: 0,
  totalConcessionPrice: 0,
  setConcessionSelection: (id, qty, meta) => {
    const state = get();

    const newSelections = {
      ...state.concessionSelections,
      [id]: qty,
    };

    // Lưu thông tin name + price chỉ 1 lần (meta từ FoodSelector truyền vào)
    const newMap = { ...state.concessionMap };
    if (meta) {
      newMap[id] = meta;
    }

    // Tính tổng tiền concession
    let totalConcessionPrice = 0;
    Object.entries(newSelections).forEach(([cid, quantity]) => {
      const price = newMap[cid]?.price ?? 0;
      totalConcessionPrice += price * quantity;
    });

   

    set({
      concessionSelections: newSelections,
      concessionMap: newMap,
      totalConcessionPrice,
    });
  },

  setPromotionCode: (code, amount) => {
    
    set({
      promotionCode: code,
      discountAmount: amount,
    });
  },

  buildBookingPayload: () => {
    const state = get();

    return {
      seats: state.selectedSeats.map((label) => {
        const id = state.seatLabelToId[label];
        return {
        seatId: id ,
        ticketType:
          state.seatMap.flatMap((r) => r.seats).find((s) => s.id === id)
            ?.seatType || '',
      }}),

      concessions: Object.entries(state.concessionSelections)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => ({
          concessionId: id,
          quantity: qty,
        })),

      promotionCode: state.promotionCode || undefined,
      usePoints: 0, // để sau nếu có loyalty
    };
  },

  buildPreviewData: () => {
    const state = get();

    const seatGroups: Record<
      string,
      { type: string; quantity: number; price: number }
    > = {};

    state.selectedSeats.forEach((label) => {
      const id = state.seatLabelToId[label];
      const seat = state.seatMap
        .flatMap((r) => r.seats)
        .find((s) => s.id === id);
      if (!seat) return;

      const ticket = state.tickets.find((t) => t.key === seat.seatType);
      if (!ticket) return;

      if (!seatGroups[seat.seatType]) {
        seatGroups[seat.seatType] = {
          type: ticket.label, // Ghế thường / VIP / Premium...
          quantity: 0,
          price: ticket.price, // giá của 1 vé
        };
      }

      seatGroups[seat.seatType].quantity += 1;
    });

    const seats: SeatItem[] = Object.values(seatGroups);

    const concessions = Object.entries(state.concessionSelections)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        name: state.concessionMap[id]?.name ?? 'Món',
        price: state.concessionMap[id]?.price ?? 0,
        quantity: qty,
      }));
      const totalFinal = state.totalTicketPrice + state.totalConcessionPrice - state.discountAmount;
    return {
      seats,
      concessions,
      discountCode: state.promotionCode,
      discountAmount: state.discountAmount,
      total: totalFinal,
    };
  },
  getTotalFinal: () => {
    const state = get();
    return state.totalTicketPrice + state.totalConcessionPrice - state.discountAmount;
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

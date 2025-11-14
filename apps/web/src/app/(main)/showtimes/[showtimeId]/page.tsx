'use client';
import { useAuth, useClerk, useUser } from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';
import { BlurCircle } from 'apps/web/src/components/blur-circle';
import { useGetShowtimeSeats } from 'apps/web/src/hooks/showtime-hooks';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { Film, LogIn } from 'lucide-react';
import { useEffect } from 'react';
import { CinemaScreen } from './_components/cinema-screen';
import { SeatGrid } from './_components/seat-grid';
import { SeatLegend } from './_components/seat-legend';
import { TicketTypeList } from './_components/ticket-list';
import { RequireSignIn } from 'apps/web/src/components/require-sign-in';
import BookingBar from './_components/booking-summary';

const SeatBookingPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  const { data } = useGetShowtimeSeats(
    isSignedIn ? '1743dad9-5b78-49a1-be56-5c7205d248b2' : undefined
  );
  const {
    seatMap,
    seatReservationStatus,
    seatHeldByUser,
    selectedSeats,
    ticketCounts,
    tickets,
    initBookingData,
    toggleSeat,
    updateTicketCount,
    connectSocket,
    disconnectSocket,
  } = useBookingStore();

  useEffect(() => {
    if (data) initBookingData(data);
  }, [data, initBookingData]);

  useEffect(() => {
    const token = getToken();
    if (!isSignedIn || !token) return;

    connectSocket('1743dad9-5b78-49a1-be56-5c7205d248b2', user.id);
    return () => {
      disconnectSocket();
    };
  }, [isSignedIn, data, connectSocket, disconnectSocket, getToken, user]);

  return (
    <RequireSignIn>
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40  w-full ">
        <div className="relative flex-1 flex flex-col items-center max-md:mt-16 gap-4">
          <BlurCircle top="-100px" left="-100px" />
          <BlurCircle bottom="0" right="0" />
          <h1 className="text-2xl font-bold text-white">Chọn chỗ</h1>
          <CinemaScreen />
          <SeatGrid
            seatMap={seatMap}
            selectedSeats={selectedSeats}
            seatHeldByUser={seatHeldByUser}
            seatReservationStatus={seatReservationStatus}
            onSeatClick={toggleSeat}
          />
          <SeatLegend />
          <TicketTypeList
            tickets={tickets}
            ticketCounts={ticketCounts}
            onTicketChange={updateTicketCount}
          />
        </div>
      </div>
      <BookingBar />
    </RequireSignIn>
  );
};

export default SeatBookingPage;

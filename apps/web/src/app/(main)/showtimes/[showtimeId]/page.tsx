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

const SeatBookingPage = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
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
    totalTickets,
    totalPrice,
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
    <div>
      {isSignedIn ? (
        <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40  w-full ">
          <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
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
      ) : (
        <div className="flex flex-col items-center justify-center">
          <BlurCircle top="-100px" left="-100px" />
          <BlurCircle bottom="0" right="0" />
          {/* Icon + Text */}
          <div className="flex flex-col items-center text-center z-10">
            <Film className="w-16 h-16 text-rose-600 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Bạn cần đăng nhập để tiếp tục
            </h1>
            <p className="text-gray-400 max-w-md mb-6">
              Hãy đăng nhập để đặt chỗ, xem lịch chiếu và lưu vé yêu thích của
              bạn.
            </p>

            {/* Login button */}
            <Button
              onClick={() =>
                openSignIn({
                  afterSignInUrl: window.location.href,
                  appearance: {
                    elements: {
                      modalCloseButton: { display: 'none' },
                    },
                  },
                })
              }
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition active:scale-95"
            >
              <LogIn className="w-5 h-5" />
              Đăng nhập ngay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBookingPage;

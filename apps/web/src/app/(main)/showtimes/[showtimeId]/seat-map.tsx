'use client';
import { useAuth } from "@clerk/nextjs";
import { BlurCircle } from "apps/web/src/components/blur-circle";
import { useGetSessionTTL, useGetShowtimeSeats } from "apps/web/src/hooks/showtime-hooks";
import { LayoutTypeEnum } from "apps/web/src/libs/types/showtime.type";
import { useBookingStore } from "apps/web/src/stores/booking-store";
import { useEffect } from "react";
import { CinemaScreen } from "./_components/cinema-screen";
import { SeatGrid } from "./_components/seat-grid";
import { SeatLegend } from "./_components/seat-legend";
import { TicketTypeList } from "./_components/ticket-list";

export const SeatMap = ({showtimeId} : {showtimeId: string}) => {
  const {userId} = useAuth()
   const { data } = useGetShowtimeSeats(showtimeId);
    const { data: ttlResponse } = useGetSessionTTL(showtimeId);
    console.log('TTL Response:', ttlResponse);
    const {
      hallName,
      seatMap,
      seatReservationStatus,
      seatHeldByUser,
      selectedSeats,
      ticketCounts,
      tickets,
      initBookingData,
      toggleSeat,
      updateHoldTimeSeconds,
      connectSocket,
      disconnectSocket,
    } = useBookingStore();
  
    useEffect(() => {
      if (data) initBookingData(data);
    }, [data, initBookingData]);
  
    useEffect(() => {
      if (!userId) return;
  
      connectSocket(showtimeId, userId);
  
      if (ttlResponse?.ttl && ttlResponse?.ttl > 0) {
        updateHoldTimeSeconds(ttlResponse.ttl);
      }
      return () => {
        disconnectSocket();
      };
    }, [data, connectSocket, disconnectSocket, showtimeId, ttlResponse, updateHoldTimeSeconds, userId]);
  return (
    <div className="relative flex-1 flex flex-col items-center max-md:mt-10 gap-4">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="0" right="0" />
      <h1 className="text-2xl font-bold text-white">{hallName}</h1>
      <CinemaScreen />
      <SeatGrid
        layoutType={LayoutTypeEnum.STANDARD}
        seatMap={seatMap}
        selectedSeats={selectedSeats}
        seatHeldByUser={seatHeldByUser}
        seatReservationStatus={seatReservationStatus}
        onSeatClick={toggleSeat}
      />
      <SeatLegend />
      <TicketTypeList tickets={tickets} />
    </div>
  );
}
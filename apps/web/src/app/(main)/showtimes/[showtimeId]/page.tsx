import { getShowtimeSeats } from 'apps/web/src/libs/actions/cinemas/showtime/showtime-action';
import { SeatBooking } from './seat-booking';
import { getQueryClient } from 'apps/web/src/libs/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { checkUserBookingAtShowtime, createBooking, getUserBookings } from 'apps/web/src/libs/actions/booking/booking-action';
import { BookingStatus } from 'apps/web/src/libs/types/booking.type';



export default async function SeatBookingPage({
  params,
}: {
  params: Promise<{ showtimeId: string }>;
}) {
  
  const { showtimeId } = await params;
  console.log('Showtime ID:', showtimeId);

  const queryClient = getQueryClient();

  const bookings =await queryClient.prefetchQuery({
    queryKey: ['my-booking'],
    queryFn: () => getUserBookings({
      status: BookingStatus.PENDING,
      pagination: {
        page: 1,
        limit: 1
      }
      }),
  });
  console.log('Bookings:', bookings);

  // let isExistingBooking;
  // try {
  //   const res = await checkUserBookingAtShowtime(
  //     showtimeId,
  //     'PENDING,CONFIRMED'
  //   );
  //   isExistingBooking = res.data;
  // } catch (err) {
  //   console.error('Error checking existing booking:', err);
  //   isExistingBooking = null; // fallback
  // }
  // if (!isExistingBooking) {
  //   await createBooking({
  //     showtimeId
  //   })
  // }

  await queryClient.prefetchQuery({
    queryKey: ['showtime-seats', showtimeId],
    queryFn: () => getShowtimeSeats(showtimeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SeatBooking showtimeId={showtimeId} />
    </HydrationBoundary>
  )
}

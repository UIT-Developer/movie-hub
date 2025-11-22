import { getShowtimeSeats } from 'apps/web/src/libs/actions/cinemas/showtime/showtime-action';
import { SeatBooking } from './seat-booking';
import { getQueryClient } from 'apps/web/src/libs/get-query-client';



export default async function SeatBookingPage({
  params,
}: {
  params: Promise<{ showtimeId: string }>;
}) {
  const queryClient = getQueryClient();
  const { showtimeId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['showtime-seats', showtimeId],
    queryFn: () => getShowtimeSeats(showtimeId),
  });

  return <SeatBooking showtimeId={showtimeId} />;
}

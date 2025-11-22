import { getShowtimeSeats } from 'apps/web/src/libs/actions/cinemas/showtime/showtime-action';
import SeatBookingPage from './seat-booking';


export default async function Page({
  params,
}: {
  params: Promise<{ showtimeId: string }>;
}) {
 

  return <SeatBookingPage  />;
}

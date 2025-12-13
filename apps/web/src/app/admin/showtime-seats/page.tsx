'use client';

import { useState } from 'react';
import { Clock, Film, Building2, DoorOpen, Ticket } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { useToast } from '../_libs/use-toast';
import { format } from 'date-fns';
import type {
  ShowtimeSeatDetail,
  SeatRow,
  ShowtimeInfo,
  TicketPrice,
  ShowtimeSeatsData,
  SeatStatus,
  SeatType,
  ReservationStatus,
} from '../_libs/types';

const mockShowtimes = [
  {
    id: 'st_001',
    movieTitle: 'The Conjuring',
    cinemaName: 'CGV Vincom Center',
    hallName: 'Hall 1',
    startTime: '2025-12-05T14:00:00Z',
    format: '2D',
  },
  {
    id: 'st_002',
    movieTitle: 'Oppenheimer',
    cinemaName: 'Lotte Cinema Diamond Plaza',
    hallName: 'IMAX Hall',
    startTime: '2025-12-05T18:30:00Z',
    format: 'IMAX',
  },
  {
    id: 'st_003',
    movieTitle: 'Spider-Man: No Way Home',
    cinemaName: 'Galaxy Cinema Nguyen Du',
    hallName: 'Hall 3',
    startTime: '2025-12-05T21:00:00Z',
    format: '3D',
  },
];

export default function ShowtimeSeatsPage() {
  const [showtimes] = useState(mockShowtimes);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState('');
  const [seatsData, setSeatsData] = useState<ShowtimeSeatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | 'ALL'>('ALL');
  const { toast } = useToast();

  const fetchShowtimeSeats = async (showtimeId: string) => {
    try {
      setLoading(true);

      const selectedShowtime = mockShowtimes.find(s => s.id === showtimeId);
      if (selectedShowtime) {
        const mockSeatMap: SeatRow[] = [];
        const rows = 8;
        const seatsPerRow = 12;
        
        for (let r = 0; r < rows; r++) {
          const rowLetter = String.fromCharCode(65 + r);
          const seats: ShowtimeSeatDetail[] = [];
          
          for (let s = 1; s <= seatsPerRow; s++) {
            const reservationStatuses: ReservationStatus[] = ['AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'HELD', 'CONFIRMED'];
            const seatStatuses: SeatStatus[] = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'BROKEN', 'MAINTENANCE'];
            
            let seatType: SeatType = 'STANDARD';
            if (r < 2) {
              seatType = 'VIP';
            } else if (r === 2) {
              seatType = 'PREMIUM';
            } else if (r === 3 && s >= 5 && s <= 8) {
              seatType = 'COUPLE';
            } else if (r === rows - 1 && (s === 1 || s === seatsPerRow)) {
              seatType = 'WHEELCHAIR';
            } else {
              seatType = 'STANDARD';
            }
            
            const seatStatus = seatStatuses[Math.floor(Math.random() * seatStatuses.length)];
            const reservationStatus = seatStatus !== 'ACTIVE' 
              ? 'CANCELLED' 
              : reservationStatuses[Math.floor(Math.random() * reservationStatuses.length)];
            
            seats.push({
              id: `${rowLetter}${s}`,
              number: s,
              seatType: seatType,
              seatStatus: seatStatus,
              reservationStatus: reservationStatus,
              isHeldByCurrentUser: null,
            });
          }
          
          mockSeatMap.push({ row: rowLetter, seats });
        }

        setSeatsData({
          showtime: {
            id: selectedShowtime.id,
            movieId: 'm_001',
            movieTitle: selectedShowtime.movieTitle,
            start_time: selectedShowtime.startTime,
            end_time: '2025-12-05T16:30:00Z',
            dateType: 'WEEKDAY',
            format: selectedShowtime.format,
            language: 'vi',
            subtitles: ['en'],
          },
          cinemaId: 'c_001',
          cinemaName: selectedShowtime.cinemaName,
          hallId: 'h_001',
          hallName: selectedShowtime.hallName,
          layoutType: 'STANDARD',
          seat_map: mockSeatMap,
          ticketPrices: [
            { seatType: 'STANDARD', price: 75000 },
            { seatType: 'VIP', price: 120000 },
            { seatType: 'COUPLE', price: 200000 },
            { seatType: 'PREMIUM', price: 150000 },
            { seatType: 'WHEELCHAIR', price: 75000 },
          ],
          rules: {
            max_selectable: 8,
            hold_time_seconds: 600,
          },
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch showtime seats',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowtimeChange = (showtimeId: string) => {
    setSelectedShowtimeId(showtimeId);
    fetchShowtimeSeats(showtimeId);
  };

  const getReservationStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500 hover:bg-emerald-600';
      case 'HELD':
        return 'bg-amber-400 cursor-not-allowed';
      case 'CONFIRMED':
        return 'bg-gray-400 cursor-not-allowed';
      case 'CANCELLED':
        return 'bg-red-400 cursor-not-allowed';
      default:
        return 'bg-gray-300';
    }
  };

  const getSeatTypeColor = (type: SeatType) => {
    switch (type) {
      case 'VIP':
        return 'border-purple-500';
      case 'COUPLE':
        return 'border-pink-500';
      case 'PREMIUM':
        return 'border-yellow-500';
      case 'WHEELCHAIR':
        return 'border-blue-500';
      default:
        return 'border-gray-400';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const filteredSeats = seatsData?.seat_map.map(row => ({
    ...row,
    seats: row.seats.filter(seat =>
      filterStatus === 'ALL' || seat.reservationStatus === filterStatus
    ),
  })).filter(row => row.seats.length > 0) || [];

  const statusCounts = seatsData ? {
    available: seatsData.seat_map.flatMap(r => r.seats).filter(s => s.reservationStatus === 'AVAILABLE' && s.seatStatus === 'ACTIVE').length,
    held: seatsData.seat_map.flatMap(r => r.seats).filter(s => s.reservationStatus === 'HELD').length,
    confirmed: seatsData.seat_map.flatMap(r => r.seats).filter(s => s.reservationStatus === 'CONFIRMED').length,
    unavailable: seatsData.seat_map.flatMap(r => r.seats).filter(s => s.seatStatus !== 'ACTIVE').length,
  } : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Ticket className="h-8 w-8 text-blue-600" />
            Showtime Seats Viewer
          </h1>
          <p className="text-gray-500 mt-1">Real-time seat availability and booking status</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Showtime</CardTitle>
          <CardDescription>Choose a showtime to view seat availability</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedShowtimeId} onValueChange={handleShowtimeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select showtime" />
            </SelectTrigger>
            <SelectContent>
              {showtimes.map((showtime) => (
                <SelectItem key={showtime.id} value={showtime.id}>
                  <div className="flex items-center gap-3">
                    <Film className="h-4 w-4" />
                    <span className="font-semibold">{showtime.movieTitle}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm">{showtime.cinemaName}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm">{format(new Date(showtime.startTime), 'MMM dd, HH:mm')}</span>
                    <Badge variant="outline">{showtime.format}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading seat information...</p>
        </div>
      ) : seatsData ? (
        <>
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white">
                    <Film className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Movie</p>
                    <p className="font-semibold text-gray-900">{seatsData.showtime.movieTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cinema</p>
                    <p className="font-semibold text-gray-900">{seatsData.cinemaName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white">
                    <DoorOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hall</p>
                    <p className="font-semibold text-gray-900">{seatsData.hallName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Showtime</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(seatsData.showtime.start_time), 'HH:mm, MMM dd')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {statusCounts && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-2 border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">{statusCounts.available}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">On Hold</p>
                    <p className="text-3xl font-bold text-amber-600 mt-2">{statusCounts.held}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Booked</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{statusCounts.confirmed}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 bg-gray-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Unavailable</p>
                    <p className="text-3xl font-bold text-gray-600 mt-2">{statusCounts.unavailable}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Seat Map</CardTitle>
                  <CardDescription>
                    Real-time seat availability • Hold time: {seatsData.rules.hold_time_seconds}s • Max: {seatsData.rules.max_selectable} seats
                  </CardDescription>
                </div>
                <Select value={filterStatus} onValueChange={(v: string) => setFilterStatus(v as typeof filterStatus)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Seats</SelectItem>
                    <SelectItem value="AVAILABLE">Available Only</SelectItem>
                    <SelectItem value="HELD">On Hold</SelectItem>
                    <SelectItem value="CONFIRMED">Booked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-10">
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mb-2"></div>
                  <div className="h-4 bg-gradient-to-b from-slate-600 to-transparent rounded-t-3xl"></div>
                </div>
                <p className="text-center text-sm text-gray-500 font-semibold tracking-wider mt-3">🎬 SCREEN</p>
              </div>

              <div className="space-y-2.5 max-w-5xl mx-auto">
                {filteredSeats.map(row => (
                  <div key={row.row} className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      <Badge variant="outline" className="font-mono font-bold text-base bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        {row.row}
                      </Badge>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex gap-2">
                        {row.seats.map(seat => {
                          const isUnavailable = seat.seatStatus !== 'ACTIVE' || 
                                              seat.reservationStatus === 'CONFIRMED' || 
                                              seat.reservationStatus === 'CANCELLED';
                          const isHeld = seat.reservationStatus === 'HELD';

                          return (
                            <div key={seat.id} className="group relative">
                              <button
                                disabled={isUnavailable || isHeld}
                                className={`
                                  w-12 h-12 rounded-xl transition-all duration-300
                                  flex items-center justify-center
                                  border-2 ${getSeatTypeColor(seat.seatType)}
                                  ${getReservationStatusColor(seat.reservationStatus)}
                                  ${!isUnavailable && !isHeld ? 'hover:scale-125 hover:shadow-2xl hover:z-10' : ''}
                                  relative font-bold text-white shadow-md
                                `}
                              >
                                <span className="text-sm drop-shadow-lg">{seat.number}</span>

                                {seat.seatStatus !== 'ACTIVE' && (
                                  <div className={`absolute inset-0 rounded-xl opacity-40 ${
                                    seat.seatStatus === 'BROKEN' ? 'bg-gradient-to-br from-red-500 to-red-700' :
                                    'bg-gradient-to-br from-amber-500 to-amber-700'
                                  }`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-2xl">
                                        {seat.seatStatus === 'BROKEN' ? '✕' : '🔧'}
                                      </span>
                                    </div>
                                  </div>
                                )}

                                {seat.seatType !== 'STANDARD' && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center text-[10px]">
                                    {seat.seatType === 'VIP' ? '👑' :
                                     seat.seatType === 'COUPLE' ? '💑' :
                                     seat.seatType === 'PREMIUM' ? '⭐' :
                                     seat.seatType === 'WHEELCHAIR' ? '♿' : ''}
                                  </div>
                                )}
                              </button>

                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-20 animate-in fade-in duration-200">
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl px-4 py-3 whitespace-nowrap shadow-2xl border border-gray-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <p className="font-bold text-lg">{row.row}{seat.number}</p>
                                    {seat.seatType !== 'STANDARD' && (
                                      <span className="text-lg">
                                        {seat.seatType === 'VIP' ? '👑' :
                                         seat.seatType === 'COUPLE' ? '💑' :
                                         seat.seatType === 'PREMIUM' ? '⭐' :
                                         seat.seatType === 'WHEELCHAIR' ? '♿' : ''}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-300 text-xs mb-2">{seat.seatType}</p>
                                  <div className="flex items-center gap-2 mb-2">
                                    {seat.seatStatus === 'ACTIVE' ? (
                                      <Badge className={`text-xs ${
                                        seat.reservationStatus === 'AVAILABLE' ? 'bg-emerald-600' :
                                        seat.reservationStatus === 'HELD' ? 'bg-amber-500' :
                                        seat.reservationStatus === 'CONFIRMED' ? 'bg-blue-600' :
                                        'bg-red-600'
                                      }`}>
                                        {seat.reservationStatus}
                                      </Badge>
                                    ) : (
                                      <Badge variant="destructive" className="text-xs">
                                        {seat.seatStatus}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="pt-2 border-t border-gray-700">
                                    <p className="text-emerald-400 font-bold text-base">
                                      {formatPrice(seatsData.ticketPrices.find(p => p.seatType === seat.seatType)?.price || 0)}
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                  <div className="w-3 h-3 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-12 text-center">
                      <Badge variant="outline" className="font-mono font-bold text-base bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        {row.row}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Seat Types</p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { seatType: 'STANDARD' as SeatType, emoji: '', price: 75000 },
                      { seatType: 'VIP' as SeatType, emoji: '👑', price: 120000 },
                      { seatType: 'COUPLE' as SeatType, emoji: '💑', price: 200000 },
                      { seatType: 'PREMIUM' as SeatType, emoji: '⭐', price: 150000 },
                      { seatType: 'WHEELCHAIR' as SeatType, emoji: '♿', price: 75000 },
                    ].map(item => (
                      <div key={item.seatType} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full border-2 ${getSeatTypeColor(item.seatType)} bg-gray-100 flex items-center justify-center text-lg shadow-sm`}>
                          {item.emoji}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.seatType}</p>
                          <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Reservation Status</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-emerald-500"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-amber-400"></div>
                      <span className="text-sm">On Hold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-400"></div>
                      <span className="text-sm">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-red-400"></div>
                      <span className="text-sm">Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a showtime to view seat availability</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
// @ts-expect-error - lucide-react lacks type definitions
import { Ticket } from 'lucide-react';
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
import { useToast } from '../_libs/use-toast';
import { format } from 'date-fns';
import { useShowtimes, useShowtimeSeats } from '@/libs/api';

export default function ShowtimeSeatsPage() {
  const [selectedShowtimeId, setSelectedShowtimeId] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'AVAILABLE' | 'BOOKED' | 'RESERVED'>('ALL');
  useToast();

  // API hooks
  const { data: showtimesData = [] } = useShowtimes();
  const showtimes = showtimesData || [];
  const { data: seatsData = [], isLoading: loading } = useShowtimeSeats(selectedShowtimeId);
  const seats = seatsData || [];

  const handleShowtimeChange = async (showtimeId: string) => {
    setSelectedShowtimeId(showtimeId);
  };

  const getReservationStatusColor = (isBooked: boolean, isReserved: boolean) => {
    if (isBooked) return 'bg-gray-400 cursor-not-allowed';
    if (isReserved) return 'bg-amber-400 cursor-not-allowed';
    return 'bg-emerald-500 hover:bg-emerald-600';
  };

  // Filter seats based on status
  const filteredSeats = seats.filter(seat => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'AVAILABLE') return !seat.isBooked && !seat.isReserved;
    if (filterStatus === 'BOOKED') return seat.isBooked;
    if (filterStatus === 'RESERVED') return seat.isReserved;
    return true;
  });

  // Group seats by row
  const groupedByRow = filteredSeats.reduce((acc, seat) => {
    if (!acc[seat.rowLabel]) {
      acc[seat.rowLabel] = [];
    }
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {} as Record<string, typeof filteredSeats>);

  const statusCounts = {
    available: seats.filter(s => !s.isBooked && !s.isReserved).length,
    reserved: seats.filter(s => s.isReserved).length,
    booked: seats.filter(s => s.isBooked).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
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
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {showtime.movie?.title || 'Unknown'}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm">
                      {format(new Date(showtime.startTime), 'MMM dd, HH:mm')}
                    </span>
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
      ) : seats.length > 0 ? (
        <>
          {statusCounts && (
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">{statusCounts.available}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Reserved</p>
                    <p className="text-3xl font-bold text-amber-600 mt-2">{statusCounts.reserved}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Booked</p>
                    <p className="text-3xl font-bold text-gray-600 mt-2">{statusCounts.booked}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Seat Layout</CardTitle>
                  <CardDescription>Click to view details</CardDescription>
                </div>
                <Select value={filterStatus} onValueChange={(v: string) => setFilterStatus(v as typeof filterStatus)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Seats</SelectItem>
                    <SelectItem value="AVAILABLE">Available Only</SelectItem>
                    <SelectItem value="RESERVED">Reserved</SelectItem>
                    <SelectItem value="BOOKED">Booked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(groupedByRow).map(([row, rowSeats]) => (
                  <div key={row} className="flex items-center gap-4">
                    <div className="w-12 font-semibold text-gray-700">Row {row}</div>
                    <div className="flex gap-2 flex-wrap">
                      {rowSeats.map(seat => (
                        <div
                          key={seat.id}
                          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-semibold text-white cursor-pointer transition-colors ${getReservationStatusColor(seat.isBooked, seat.isReserved)}`}
                          title={`${seat.rowLabel}${seat.seatNumber} - ${seat.type} - ₫${seat.price || 0}`}
                        >
                          {seat.seatNumber}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-400"></div>
                  <span className="text-sm">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-400"></div>
                  <span className="text-sm">Booked</span>
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

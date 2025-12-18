'use client';

import { useState } from 'react';
// @ts-expect-error - lucide-react lacks type definitions
import { Building2, DoorOpen, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import {  } from '@movie-hub/shacdn-ui/button';
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
import type { Hall, SeatStatus, SeatDetail, HallDetail } from '../_libs/types';
import { useCinemas, useHallsGroupedByCinema, useUpdateSeatStatus } from '@/libs/api';

export default function SeatStatusPage() {
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [selectedHallId, setSelectedHallId] = useState('');
  const [hallDetail, setHallDetail] = useState<HallDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<SeatStatus | 'ALL'>('ALL');
  const { toast } = useToast();

  // API hooks
  const { data: cinemas = [] } = useCinemas();
  const { data: hallsByCinema = {} } = useHallsGroupedByCinema();
  // @ts-expect-error - Hall type mismatch between API and admin types
  const halls: Hall[] = Object.values(hallsByCinema).flatMap((g) => g.halls || []);
  const updateSeatMutation = useUpdateSeatStatus();

  const handleHallChange = async (hallId: string) => {
    try {
      setSelectedHallId(hallId);
      setLoading(true);
      const hall = halls.find(h => h.id === hallId);
      if (hall) {
        // Note: In a real scenario, you'd fetch seats from API
        // For now, generate mock seat data based on hall info
        const mockSeats: SeatDetail[] = [];
        let seatId = 1;
        
        for (let row = 1; row <= hall.rows; row++) {
          const seatsPerRow = Math.ceil(hall.capacity / hall.rows);
          for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
            const statuses: SeatStatus[] = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'BROKEN', 'MAINTENANCE'];
            
            let seatType: 'STANDARD' | 'VIP' | 'COUPLE' | 'PREMIUM' | 'WHEELCHAIR' = 'STANDARD';
            if (row <= 2) {
              seatType = 'VIP';
            } else if (row === 3) {
              seatType = 'PREMIUM';
            } else if (row === 4 && seatNum >= 4 && seatNum <= 7) {
              seatType = 'COUPLE';
            } else if (row === hall.rows && (seatNum === 1 || seatNum === seatsPerRow)) {
              seatType = 'WHEELCHAIR';
            } else {
              seatType = 'STANDARD';
            }
            
            mockSeats.push({
              id: `seat_${seatId}`,
              row,
              seatNumber: seatNum,
              type: seatType,
              status: statuses[Math.floor(Math.random() * statuses.length)],
            });
            seatId++;
          }
        }

        setHallDetail({
          ...hall,
          seats: mockSeats,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch hall details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSeatStatus = async (seatId: string, newStatus: SeatStatus) => {
    try {
      await updateSeatMutation.mutateAsync({
        seatId,
        // @ts-expect-error - Admin SeatStatus differs from API SeatStatus
        data: { status: newStatus },
      });

      if (hallDetail) {
        setHallDetail({
          ...hallDetail,
          seats: hallDetail.seats.map(seat =>
            seat.id === seatId ? { ...seat, status: newStatus } : seat
          ),
        });
      }

      toast({
        title: 'Success',
        description: 'Seat status updated successfully',
      });
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const getStatusColor = (status: SeatStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'BROKEN':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'MAINTENANCE':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: SeatStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle2 className="h-3 w-3" />;
      case 'BROKEN':
        return <XCircle className="h-3 w-3" />;
      case 'MAINTENANCE':
        return <Wrench className="h-3 w-3" />;
    }
  };

  const getSeatTypeColor = (type: string) => {
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

  const getSeatStatusBgColor = (status: SeatStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500';
      case 'BROKEN':
        return 'bg-rose-600';
      case 'MAINTENANCE':
        return 'bg-amber-400';
      default:
        return 'bg-gray-400';
    }
  };

  const filteredSeats = hallDetail?.seats.filter(seat =>
    filterStatus === 'ALL' || seat.status === filterStatus
  ) || [];

  const statusCounts = {
    ACTIVE: hallDetail?.seats.filter(s => s.status === 'ACTIVE').length || 0,
    BROKEN: hallDetail?.seats.filter(s => s.status === 'BROKEN').length || 0,
    MAINTENANCE: hallDetail?.seats.filter(s => s.status === 'MAINTENANCE').length || 0,
  };

  const selectedCinema = cinemas.find(c => c.id === selectedCinemaId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Wrench className="h-8 w-8 text-orange-600" />
            Seat Status Management
          </h1>
          <p className="text-gray-500 mt-1">Monitor and manage seat conditions across all halls</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Hall</CardTitle>
          <CardDescription>Choose a cinema and hall to view seat status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cinema</label>
              <Select value={selectedCinemaId} onValueChange={setSelectedCinemaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cinema" />
                </SelectTrigger>
                <SelectContent>
                  {cinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {cinema.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Hall</label>
              <Select
                value={selectedHallId}
                onValueChange={handleHallChange}
                disabled={!selectedCinemaId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hall" />
                </SelectTrigger>
                <SelectContent>
                  {halls
                    .filter(h => h.cinemaId === selectedCinemaId)
                    .map((hall) => (
                      <SelectItem key={hall.id} value={hall.id}>
                        <div className="flex items-center gap-2">
                          <DoorOpen className="h-4 w-4" />
                          {hall.name} - {hall.capacity} seats
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading hall details...</p>
        </div>
      ) : hallDetail ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Seats</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{hallDetail.seats.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium text-gray-600">Active</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mt-2">{statusCounts.ACTIVE}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <p className="text-sm font-medium text-gray-600">Broken</p>
                  </div>
                  <p className="text-3xl font-bold text-red-600 mt-2">{statusCounts.BROKEN}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Wrench className="h-5 w-5 text-orange-600" />
                    <p className="text-sm font-medium text-gray-600">Maintenance</p>
                  </div>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{statusCounts.MAINTENANCE}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{hallDetail.name} - Seat Layout</CardTitle>
                  <CardDescription>
                    {selectedCinema?.name} • {hallDetail.type} • {hallDetail.capacity} seats
                  </CardDescription>
                </div>
                <Select value={filterStatus} onValueChange={(v: string) => setFilterStatus(v as typeof filterStatus)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Seats</SelectItem>
                    <SelectItem value="ACTIVE">Active Only</SelectItem>
                    <SelectItem value="BROKEN">Broken Only</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance Only</SelectItem>
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
                {Array.from(new Set(filteredSeats.map(s => s.row))).sort((a, b) => a - b).map(row => (
                  <div key={row} className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      <Badge variant="outline" className="font-mono font-bold text-base bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        {String.fromCharCode(64 + row)}
                      </Badge>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex gap-2">
                      {filteredSeats
                        .filter(s => s.row === row)
                        .sort((a, b) => a.seatNumber - b.seatNumber)
                        .map(seat => (
                          <div key={seat.id} className="group relative">
                            <button
                              onClick={() => {
                                const statuses: SeatStatus[] = ['ACTIVE', 'BROKEN', 'MAINTENANCE'];
                                const currentIndex = statuses.indexOf(seat.status);
                                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                                handleUpdateSeatStatus(seat.id, nextStatus);
                              }}
                              className={`
                                w-12 h-12 rounded-xl transition-all duration-300
                                flex items-center justify-center
                                border-2 ${getSeatTypeColor(seat.type)}
                                ${getSeatStatusBgColor(seat.status)}
                                ${seat.status === 'ACTIVE' ? 'hover:scale-125 hover:shadow-2xl hover:z-10' : 'opacity-70'}
                                relative font-bold text-white shadow-md
                              `}
                            >
                              <span className="text-sm drop-shadow-lg">{seat.seatNumber}</span>
                              {seat.status !== 'ACTIVE' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <span className="text-3xl opacity-40">{seat.status === 'BROKEN' ? '✕' : '🔧'}</span>
                                </div>
                              )}
                              {seat.type !== 'STANDARD' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center text-[10px]">
                                  {seat.type === 'VIP' ? '👑' :
                                   seat.type === 'COUPLE' ? '💑' :
                                   seat.type === 'PREMIUM' ? '⭐' :
                                   seat.type === 'WHEELCHAIR' ? '♿' : ''}
                                </div>
                              )}
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-20 animate-in fade-in duration-200">
                              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl px-4 py-3 whitespace-nowrap shadow-2xl border border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <p className="font-bold text-lg">{String.fromCharCode(64 + seat.row)}{seat.seatNumber}</p>
                                  {seat.type !== 'STANDARD' && (
                                    <span className="text-lg">
                                      {seat.type === 'VIP' ? '👑' :
                                       seat.type === 'COUPLE' ? '💑' :
                                       seat.type === 'PREMIUM' ? '⭐' :
                                       seat.type === 'WHEELCHAIR' ? '♿' : ''}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-300 text-xs mb-2">{seat.type}</p>
                                <Badge className={`${getStatusColor(seat.status)} text-xs mb-2`}>
                                  {getStatusIcon(seat.status)}
                                  <span className="ml-1">{seat.status}</span>
                                </Badge>
                                <div className="pt-2 border-t border-gray-700">
                                  <p className="text-amber-300 text-xs">👆 Click to cycle status</p>
                                </div>
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                <div className="w-3 h-3 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 text-center">
                      <Badge variant="outline" className="font-mono font-bold text-base bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        {String.fromCharCode(64 + row)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Seat Types (Border Indicator)</p>
                  <div className="flex flex-wrap gap-4">
                    {[{type: 'STANDARD', emoji: ''}, {type: 'VIP', emoji: '👑'}, {type: 'COUPLE', emoji: '💑'}, {type: 'PREMIUM', emoji: '⭐'}, {type: 'WHEELCHAIR', emoji: '♿'}].map(item => (
                      <div key={item.type} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full border-2 ${getSeatTypeColor(item.type)} bg-gray-100 flex items-center justify-center text-lg shadow-sm`}>
                          {item.emoji}
                        </div>
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Physical Status (Background Color)</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <span className="text-sm">Active (Working)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white text-2xl opacity-70 shadow-md">✕</div>
                      <span className="text-sm">Broken (Not Usable)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-white text-2xl opacity-70 shadow-md">🔧</div>
                      <span className="text-sm">Maintenance (Repairing)</span>
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
            <DoorOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a cinema and hall to view seat status</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

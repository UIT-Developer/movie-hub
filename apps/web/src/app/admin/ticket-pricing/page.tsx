'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Building2, DoorOpen, DollarSign, Calendar, Sparkles, Edit2, Check, X, AlertCircle } from 'lucide-react';
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
import { Alert, AlertDescription } from '@movie-hub/shacdn-ui/alert';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import { useToast } from '../_libs/use-toast';
import { useCinemas, useHallsByCinema, useTicketPricing, useUpdateTicketPricing } from '@/libs/api';
import type { SeatType, DayType } from '@/libs/api/types';
import { SeatTypeEnum, DayTypeEnum } from '@movie-hub/shared-types/cinema/enum';
import type { TicketPricingFiltersParams } from '@/libs/api';

interface TicketPricing {
  id: string;
  hallId: string;
  seatType: SeatType;
  dayType: DayType;
  price: number;
}

export default function TicketPricingPage() {
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [selectedHallId, setSelectedHallId] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const { toast } = useToast();

  // API hooks
  const { data: cinemasData = [], isLoading: cinemasLoading, isError: cinemasError } = useCinemas();
  const cinemas = cinemasData || [];
  const { data: hallsData = [], isLoading: hallsLoading, isError: hallsError } = useHallsByCinema(selectedCinemaId);
  const halls = hallsData || [];
  const { data: pricingsData = [], isLoading: loading, isError: pricingsError } = useTicketPricing(selectedHallId ? { hallId: selectedHallId } as TicketPricingFiltersParams & { hallId: string } : undefined);
  const pricings = pricingsData || [];
  const updatePricing = useUpdateTicketPricing();

  // Reset hall ID when cinema changes
  useEffect(() => {
    setSelectedHallId('');
  }, [selectedCinemaId]);

  const handleCinemaChange = (cinemaId: string) => {
    setSelectedCinemaId(cinemaId);
  };

  const handleHallChange = (hallId: string) => {
    setSelectedHallId(hallId);
    // Pricings will automatically fetch via React Query when selectedHallId changes
  };

  const startEdit = (pricing: TicketPricing) => {
    setEditingId(pricing.id);
    setEditPrice(pricing.price.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPrice('');
  };

  const saveEdit = async (pricingId: string) => {
    try {
      const newPrice = parseInt(editPrice);
      if (isNaN(newPrice) || newPrice <= 0) {
        toast({
          title: 'Invalid Price',
          description: 'Please enter a valid price greater than 0',
          variant: 'destructive',
        });
        return;
      }

      await updatePricing.mutateAsync({ id: pricingId, data: { price: newPrice } });

      toast({
        title: 'Success',
        description: `Ticket pricing updated to ${formatPrice(newPrice)}`,
      });

      cancelEdit();
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update ticket pricing. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getSeatTypeIcon = (type: SeatType) => {
    switch (type) {
      case SeatTypeEnum.VIP:
        return '👑';
      case SeatTypeEnum.COUPLE:
        return '💑';
      case SeatTypeEnum.PREMIUM:
        return '⭐';
      case SeatTypeEnum.WHEELCHAIR:
        return '♿';
      default:
        return '🪑';
    }
  };

  const getDayTypeColor = (type: DayType) => {
    switch (type) {
      case DayTypeEnum.WEEKDAY:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case DayTypeEnum.WEEKEND:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case DayTypeEnum.HOLIDAY:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getDayTypeIcon = (type: DayType) => {
    switch (type) {
      case DayTypeEnum.WEEKDAY:
        return '📅';
      case DayTypeEnum.WEEKEND:
        return '🎉';
      case DayTypeEnum.HOLIDAY:
        return '✨';
    }
  };

  const selectedCinema = cinemas.find(c => c.id === selectedCinemaId);
  const selectedHall = halls.find(h => h.id === selectedHallId);

  // Group pricings by seat type
  const groupedPricings = pricings.reduce((acc, pricing) => {
    if (!acc[pricing.seatType]) {
      acc[pricing.seatType] = [];
    }
    acc[pricing.seatType].push(pricing);
    return acc;
  }, {} as Record<SeatType, TicketPricing[]>);

  const seatTypeOrder: SeatType[] = [SeatTypeEnum.STANDARD, SeatTypeEnum.VIP, SeatTypeEnum.COUPLE, SeatTypeEnum.PREMIUM, SeatTypeEnum.WHEELCHAIR];
  const dayTypeOrder: DayType[] = [DayTypeEnum.WEEKDAY, DayTypeEnum.WEEKEND, DayTypeEnum.HOLIDAY];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-emerald-600" />
            Ticket Pricing Management
          </h1>
          <p className="text-gray-500 mt-1">Manage ticket prices by seat type and day type</p>
        </div>
      </div>

      {/* Selectors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Hall</CardTitle>
          <CardDescription>Choose a cinema and hall to manage ticket pricing</CardDescription>
        </CardHeader>
        <CardContent>
          {cinemasError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load cinemas. Please refresh the page.</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cinema Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cinema</label>
              <Select value={selectedCinemaId} onValueChange={handleCinemaChange}>
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

            {/* Hall Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Hall</label>
              <Select
                value={selectedHallId}
                onValueChange={handleHallChange}
                disabled={!selectedCinemaId || hallsLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={hallsLoading ? "Loading halls..." : "Select hall"} />
                </SelectTrigger>
                <SelectContent>
                  {halls.length === 0 && !hallsLoading && (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      No halls available for this cinema
                    </div>
                  )}
                  {halls.map((hall) => (
                    <SelectItem key={hall.id} value={hall.id}>
                      <div className="flex items-center gap-2">
                        <DoorOpen className="h-4 w-4" />
                        {hall.name} - {hall.capacity} seats
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hallsError && (
                <p className="text-sm text-red-500 mt-1">Failed to load halls for this cinema</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading pricing data...</p>
        </div>
      ) : pricingsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load ticket pricing data. Please try selecting another hall.</AlertDescription>
        </Alert>
      ) : selectedHallId && pricings.length > 0 ? (
        <>
          {/* Hall Info */}
          <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <DoorOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedHall?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedCinema?.name} • {selectedHall?.capacity} seats • {selectedHall?.type}
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  {pricings.length} Pricing Rules
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Grid */}
          <div className="space-y-4">
            {seatTypeOrder.map(seatType => {
              const seatPricings = groupedPricings[seatType];
              if (!seatPricings) return null;

              // Sort by day type
              const sortedPricings = [...seatPricings].sort((a, b) => 
                dayTypeOrder.indexOf(a.dayType) - dayTypeOrder.indexOf(b.dayType)
              );

              return (
                <Card key={seatType} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{getSeatTypeIcon(seatType)}</div>
                      <div>
                        <CardTitle className="text-lg">{seatType}</CardTitle>
                        <CardDescription>
                          Pricing for {seatType.toLowerCase()} seats
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sortedPricings.map(pricing => (
                        <Card key={pricing.id} className="border-2 hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={`${getDayTypeColor(pricing.dayType)} font-medium`}>
                                {getDayTypeIcon(pricing.dayType)} {pricing.dayType}
                              </Badge>
                            </div>

                            {editingId === pricing.id ? (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm text-gray-600 mb-1 block">Price (VND)</label>
                                  <Input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    placeholder="Enter price"
                                    className="text-lg font-bold"
                                    autoFocus
                                    min="1"
                                  />
                                  {editPrice && parseInt(editPrice) > 0 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      = {formatPrice(parseInt(editPrice))}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => saveEdit(pricing.id)}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                    disabled={updatePricing.isPending}
                                  >
                                    {updatePricing.isPending ? (
                                      <>
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-r-transparent mr-1"></div>
                                        Saving...
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Save
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEdit}
                                    className="flex-1"
                                    disabled={updatePricing.isPending}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-2xl font-bold text-emerald-600">
                                  {formatPrice(pricing.price)}
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startEdit(pricing)}
                                  className="w-full"
                                >
                                  <Edit2 className="h-3 w-3 mr-1" />
                                  Edit Price
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Day Type Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">📅 WEEKDAY</p>
                    <p className="text-sm text-blue-700">Monday - Friday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-900">🎉 WEEKEND</p>
                    <p className="text-sm text-purple-700">Saturday - Sunday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <Sparkles className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900">✨ HOLIDAY</p>
                    <p className="text-sm text-amber-700">Public holidays</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : selectedHallId && pricings.length === 0 && !loading ? (
        <Card>
          <CardContent className="py-16 text-center">
            <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No ticket pricing rules found for this hall</p>
            <p className="text-sm text-gray-400 mt-2">Contact support to set up pricing for this hall</p>
          </CardContent>
        </Card>
      ) : !selectedHallId ? (
        <Card>
          <CardContent className="py-16 text-center">
            <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a cinema and hall to manage ticket pricing</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

// src/app/(admin)/showtimes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Trash2, Pencil } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { Label } from '@movie-hub/shacdn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { useToast } from '../_libs/use-toast';
import { Calendar } from '@movie-hub/shacdn-ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@movie-hub/shacdn-ui/popover';
// import api from '@/lib/api';
import type { Showtime, Movie, Cinema, Hall } from '../_libs/types';
import { format } from 'date-fns';

import { mockShowtimes, mockMovies, mockCinemas, mockHalls } from '../_libs/mockData';
import ShowtimeDialog from '../_components/ShowtimeDialog'; 


export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCinemaId, setSelectedCinemaId] = useState('all');
  const [selectedMovieId, setSelectedMovieId] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedCinemaId, selectedMovieId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      /*
      // Build query params
      const params: Record<string, string> = { 
        date: format(selectedDate, 'yyyy-MM-dd') 
      };
      if (selectedCinemaId !== 'all') {
        params.cinemaId = selectedCinemaId;
      }
      if (selectedMovieId !== 'all') {
        params.movieId = selectedMovieId;
      }

      const [showtimesRes, moviesRes, cinemasRes] = await Promise.all([
        api.get('/showtimes', { params }),
        api.get('/movies'),
        api.get('/cinemas', { params: { lat: 10.762622, lng: 106.660172 } }),
      ]);
      setShowtimes(showtimesRes.data);
      setMovies(moviesRes.data);
      setCinemas(cinemasRes.data);
      */

      // ⭐️ THAY THẾ API CALLS BẰNG MOCK DATA VÀ DELAY
       await new Promise(resolve => setTimeout(resolve, 600)); 

      // Lọc dữ liệu showtime theo ngày, rạp, phim
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      let filteredShowtimes = mockShowtimes.filter(st => 
        format(new Date(st.startTime), 'yyyy-MM-dd') === selectedDateStr
      );

      // Filter by cinema if selected
      if (selectedCinemaId !== 'all') {
        filteredShowtimes = filteredShowtimes.filter(st => st.cinemaId === selectedCinemaId);
      }

      // Filter by movie if selected
      if (selectedMovieId !== 'all') {
        filteredShowtimes = filteredShowtimes.filter(st => st.movieId === selectedMovieId);
      }

      setShowtimes(filteredShowtimes);
      setMovies(mockMovies);
      setCinemas(mockCinemas);
      setHalls(mockHalls); // Load all halls
     // ⭐️ KẾT THÚC PHẦN THAY THẾ

     
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // fetchHalls not needed with mock data - filtering happens in render
  /*
  const fetchHalls = async (cinemaId: string) => {
    try {
      const response = await api.get('/auditoriums', {
        params: { cinemaId }
      });
      setHalls(response.data);
    } catch {
      console.error('Failed to fetch halls');
    }
  };
  */

  const handleEdit = (showtime: Showtime) => {
    setEditingShowtime(showtime);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // await api.delete(`/showtimes/showtime/${id}`);
      toast({ title: 'Success', description: 'Showtime deleted successfully' });
      fetchData();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete showtime',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SELLING':
        return 'bg-green-100 text-green-700';
      case 'STOPPED':
        return 'bg-orange-100 text-orange-700';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const movieId = showtime.movieId;
    if (!acc[movieId]) {
      acc[movieId] = [];
    }
    acc[movieId].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Showtimes</h1>
          <p className="text-gray-500 mt-1">Manage movie showtimes and schedules</p>
        </div>
        <Button
          onClick={() => {
            setEditingShowtime(null);
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Showtime
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:max-w-4xl">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {format(selectedDate, 'PPP')}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Cinema Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cinema</Label>
                <Select value={selectedCinemaId} onValueChange={setSelectedCinemaId}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cinemas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cinemas</SelectItem>
                    {cinemas.map((cinema) => (
                      <SelectItem key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Movie Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Movie</Label>
                <Select value={selectedMovieId} onValueChange={setSelectedMovieId}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Movies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Movies</SelectItem>
                    {movies.map((movie) => (
                      <SelectItem key={movie.id} value={movie.id}>
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {showtimes.length} showtimes scheduled
              </div>
              {(selectedCinemaId !== 'all' || selectedMovieId !== 'all') && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCinemaId('all');
                    setSelectedMovieId('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">Loading...</CardContent>
          </Card>
        ) : Object.keys(groupedShowtimes).length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              No showtimes scheduled for this date
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedShowtimes).map(([movieId, movieShowtimes]) => {
            const movie = movies.find((m) => m.id === movieId);
            return (
              <Card key={movieId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{movie?.title || 'Unknown Movie'}</span>
                    <Badge variant="secondary">
                      {movieShowtimes.length} sessions
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {movie?.runtime} mins · {movie?.ageRating}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movieShowtimes.map((showtime) => {
                      const cinema = cinemas.find((c) => c.id === showtime.cinemaId);
                      return (
                        <Card key={showtime.id} className="relative">
                          <CardContent className="pt-6">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-semibold text-lg">
                                    {format(new Date(showtime.startTime), 'HH:mm')}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {cinema?.name}
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(showtime)}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(showtime.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                {format(new Date(showtime.startTime), 'HH:mm')} -{' '}
                                {format(new Date(showtime.endTime), 'HH:mm')}
                              </div>

                              <div className="flex items-center justify-between">
                                <Badge className={getStatusColor(showtime.status)}>
                                  {showtime.status}
                                </Badge>
                                <Badge variant="outline">{showtime.dayType}</Badge>
                              </div>

                              <div className="text-sm text-gray-500">
                                {showtime.availableSeats}/{showtime.totalSeats} seats available
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{showtime.format}</Badge>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  🎬 {{
                                    vi: 'Tiếng Việt',
                                    en: 'English',
                                    ko: 'Korean',
                                    zh: 'Chinese',
                                    ja: 'Japanese',
                                    th: 'Thai'
                                  }[showtime.language] || showtime.language}
                                </Badge>
                                {showtime.subtitles.length > 0 && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    📝 {showtime.subtitles.map(s => ({
                                      vi: 'Phụ đề Việt',
                                      en: 'Phụ đề Anh',
                                      ko: 'Phụ đề Hàn',
                                      zh: 'Phụ đề Trung',
                                      ja: 'Phụ đề Nhật',
                                      th: 'Phụ đề Thái'
                                    }[s] || s)).join(', ')}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add/Edit Showtime Dialog */}
      <ShowtimeDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingShowtime(null);
          }
        }}
        movies={movies}
        cinemas={cinemas}
        halls={halls}
        editingShowtime={editingShowtime}
        onSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}

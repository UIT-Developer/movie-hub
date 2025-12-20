'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, Film, Building2, Zap, History, ExternalLink } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Input } from '@movie-hub/shacdn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { Checkbox } from '@movie-hub/shacdn-ui/checkbox';
import { useToast } from '../_libs/use-toast';
import type { Movie, Cinema, Hall, MovieRelease, BatchCreateShowtimesInput, BatchCreateResponse } from '../_libs/types';
import { mockMovies, mockCinemas, mockHalls, mockReleases } from '../_libs/mockData';

const WEEKDAYS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
  '23:00',
];

export default function BatchShowtimesPage() {
  const searchParams = useSearchParams();
  const preSelectedMovieId = searchParams.get('movieId');
  const preSelectedReleaseId = searchParams.get('releaseId');
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [releases, setReleases] = useState<MovieRelease[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BatchCreateResponse | null>(null);
  const [history, setHistory] = useState<Array<{
    id: string;
    timestamp: string;
    movie: string;
    cinema: string;
    hall: string;
    period: string;
    result: BatchCreateResponse;
  }>>([
    {
      id: '1',
      timestamp: '2025-12-02T14:30:00Z',
      movie: 'The Conjuring',
      cinema: 'CGV Vincom Center',
      hall: 'Hall 1',
      period: '2025-12-05 → 2025-12-20',
      result: {
        createdCount: 48,
        skippedCount: 2,
        created: [
          { id: 'st_001', startTime: '2025-12-05T14:00:00Z' },
          { id: 'st_002', startTime: '2025-12-05T18:00:00Z' },
        ],
        skipped: [
          { start: '2025-12-10T14:00:00Z', reason: 'TIME_CONFLICT' },
          { start: '2025-12-15T21:00:00Z', reason: 'HALL_MAINTENANCE' },
        ],
      },
    },
    {
      id: '2',
      timestamp: '2025-12-02T10:15:00Z',
      movie: 'Oppenheimer',
      cinema: 'Lotte Cinema Diamond Plaza',
      hall: 'IMAX Hall',
      period: '2025-12-01 → 2025-12-31',
      result: {
        createdCount: 90,
        skippedCount: 0,
        created: [
          { id: 'st_101', startTime: '2025-12-01T10:00:00Z' },
          { id: 'st_102', startTime: '2025-12-01T14:30:00Z' },
        ],
        skipped: [],
      },
    },
    {
      id: '3',
      timestamp: '2025-12-01T16:45:00Z',
      movie: 'Spider-Man: No Way Home',
      cinema: 'Galaxy Cinema Nguyen Du',
      hall: 'Hall 3',
      period: '2025-12-03 → 2025-12-10',
      result: {
        createdCount: 24,
        skippedCount: 5,
        created: [
          { id: 'st_201', startTime: '2025-12-03T09:00:00Z' },
        ],
        skipped: [
          { start: '2025-12-05T20:00:00Z', reason: 'TIME_CONFLICT' },
          { start: '2025-12-06T20:00:00Z', reason: 'TIME_CONFLICT' },
          { start: '2025-12-07T14:00:00Z', reason: 'HOLIDAY_PRICING_REQUIRED' },
          { start: '2025-12-08T21:00:00Z', reason: 'HALL_UNAVAILABLE' },
          { start: '2025-12-09T18:00:00Z', reason: 'TIME_CONFLICT' },
        ],
      },
    },
  ]);
  
  const [formData, setFormData] = useState<BatchCreateShowtimesInput>({
    movieId: '',
    movieReleaseId: '',
    cinemaId: '',
    hallId: '',
    startDate: '',
    endDate: '',
    timeSlots: [],
    repeatType: 'DAILY',
    weekdays: [],
    format: '2D',
    language: 'vi',
    subtitles: [],
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (preSelectedMovieId && preSelectedReleaseId) {
      setFormData(prev => ({
        ...prev,
        movieId: preSelectedMovieId,
        movieReleaseId: preSelectedReleaseId,
      }));
      fetchReleases(preSelectedMovieId);
    }
  }, [preSelectedMovieId, preSelectedReleaseId]);

  const fetchData = async () => {
    try {
      setMovies(mockMovies);
      setCinemas(mockCinemas);
      setHalls(mockHalls);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive',
      });
    }
  };

  const fetchReleases = async (movieId: string) => {
    try {
      const filtered = mockReleases.filter(r => 
        r.movieId === movieId && 
        (r.status === 'ACTIVE' || r.status === 'UPCOMING')
      );
      setReleases(filtered);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch movie releases',
        variant: 'destructive',
      });
    }
  };

  const handleMovieChange = (movieId: string) => {
    setFormData({ ...formData, movieId, movieReleaseId: '' });
    fetchReleases(movieId);
  };

  const handleTimeSlotToggle = (time: string) => {
    const updated = formData.timeSlots.includes(time)
      ? formData.timeSlots.filter(t => t !== time)
      : [...formData.timeSlots, time];
    setFormData({ ...formData, timeSlots: updated.sort() });
  };

  const handleWeekdayToggle = (day: number) => {
    const updated = formData.weekdays?.includes(day)
      ? formData.weekdays.filter(d => d !== day)
      : [...(formData.weekdays || []), day];
    setFormData({ ...formData, weekdays: updated.sort() });
  };

  const handleSubmit = async () => {
    if (!formData.movieId || !formData.movieReleaseId || !formData.cinemaId || 
        !formData.hallId || !formData.startDate || !formData.endDate || 
        formData.timeSlots.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.repeatType === 'CUSTOM_WEEKDAYS' && (!formData.weekdays || formData.weekdays.length === 0)) {
      toast({
        title: 'Error',
        description: 'Please select at least one weekday',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      // Mock batch create - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse: BatchCreateResponse = {
        createdCount: formData.timeSlots.length * 7,
        skippedCount: Math.floor(Math.random() * 3),
        created: formData.timeSlots.map((time, idx) => ({
          id: `st_${Date.now()}_${idx}`,
          startTime: `${formData.startDate}T${time}:00Z`,
        })),
        skipped: [],
      };
      setResult(mockResponse);
      
      setHistory(prev => [{
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        movie: selectedMovie?.title || 'Unknown',
        cinema: selectedCinema?.name || 'Unknown',
        hall: selectedHall?.name || 'Unknown',
        period: `${formData.startDate} → ${formData.endDate}`,
        result: mockResponse,
      }, ...prev].slice(0, 10));
      
      toast({
        title: 'Success',
        description: `Created ${mockResponse.createdCount} showtimes successfully`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create showtimes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedMovie = movies.find(m => m.id === formData.movieId);
  const selectedCinema = cinemas.find(c => c.id === formData.cinemaId);
  const selectedHall = halls.find(h => h.id === formData.hallId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-500" />
            Batch Create Showtimes
          </h1>
          <p className="text-gray-500 mt-1">Create multiple showtimes at once with smart scheduling</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5 text-purple-600" />
                Movie & Release
              </CardTitle>
              <CardDescription>Select the movie and its release period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="movieId">Movie *</Label>
                {preSelectedMovieId ? (
                  <Input
                    value={movies.find(m => m.id === formData.movieId)?.title || ''}
                    disabled
                    className="bg-gray-50"
                  />
                ) : (
                  <Select value={formData.movieId} onValueChange={handleMovieChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id}>
                          {movie.title} ({movie.runtime} mins)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="movieReleaseId">Release Period *</Label>
                {preSelectedReleaseId ? (
                  <Input
                    value={
                      releases.find(r => r.id === formData.movieReleaseId)
                        ? `${releases.find(r => r.id === formData.movieReleaseId)?.startDate} → ${releases.find(r => r.id === formData.movieReleaseId)?.endDate}`
                        : 'Loading...'
                    }
                    disabled
                    className="bg-gray-50"
                  />
                ) : (
                  <Select
                    value={formData.movieReleaseId}
                    onValueChange={(value) => setFormData({ ...formData, movieReleaseId: value })}
                    disabled={!formData.movieId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select release period" />
                    </SelectTrigger>
                    <SelectContent>
                      {releases.map((release) => (
                        <SelectItem key={release.id} value={release.id}>
                          {release.startDate} → {release.endDate} ({release.note})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Cinema & Hall
              </CardTitle>
              <CardDescription>Choose where the movies will be shown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cinemaId">Cinema *</Label>
                <Select
                  value={formData.cinemaId}
                  onValueChange={(value) => setFormData({ ...formData, cinemaId: value, hallId: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cinema" />
                  </SelectTrigger>
                  <SelectContent>
                    {cinemas.map((cinema) => (
                      <SelectItem key={cinema.id} value={cinema.id}>
                        {cinema.name} - {cinema.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hallId">Hall *</Label>
                <Select
                  value={formData.hallId}
                  onValueChange={(value) => setFormData({ ...formData, hallId: value })}
                  disabled={!formData.cinemaId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.cinemaId ? "Select hall" : "Select cinema first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {halls
                      .filter(hall => hall.cinemaId === formData.cinemaId)
                      .map((hall) => (
                        <SelectItem key={hall.id} value={hall.id}>
                          {hall.name} ({hall.capacity} seats)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-green-600" />
                Schedule Period
              </CardTitle>
              <CardDescription>Define the date range and repeat pattern</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="pl-3 pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="pl-3 pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repeatType">Repeat Pattern *</Label>
                <Select
                  value={formData.repeatType}
                  onValueChange={(value: 'DAILY' | 'WEEKLY' | 'CUSTOM_WEEKDAYS') => setFormData({ ...formData, repeatType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAILY">🌞 Daily - Every single day</SelectItem>
                    <SelectItem value="WEEKLY">📅 Weekly - Once per week (same weekday)</SelectItem>
                    <SelectItem value="CUSTOM_WEEKDAYS">🎯 Custom - Specific weekdays only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.repeatType === 'CUSTOM_WEEKDAYS' && (
                <div className="space-y-3">
                  <Label>Select Weekdays *</Label>
                  <div className="flex flex-wrap gap-2">
                    {WEEKDAYS.map((day) => (
                      <div key={day.value} className="flex items-center">
                        <Button
                          type="button"
                          variant={formData.weekdays?.includes(day.value) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleWeekdayToggle(day.value)}
                          className={formData.weekdays?.includes(day.value) ? 'bg-purple-600' : ''}
                        >
                          {day.label}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Time Slots
              </CardTitle>
              <CardDescription>Select showtime hours (multiple selection allowed)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={formData.timeSlots.includes(time) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTimeSlotToggle(time)}
                    className={formData.timeSlots.includes(time) ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {formData.timeSlots.length > 0 && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">
                    Selected: {formData.timeSlots.join(', ')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Format & Language</CardTitle>
              <CardDescription>Configure showtime format and audio settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Format *</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) => setFormData({ ...formData, format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2D">2D</SelectItem>
                      <SelectItem value="3D">3D</SelectItem>
                      <SelectItem value="IMAX">IMAX</SelectItem>
                      <SelectItem value="4DX">4DX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Vietnamese</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="th">Thai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subtitles</Label>
                <div className="flex flex-wrap gap-2">
                  {['vi', 'en', 'ko', 'zh', 'ja', 'th'].map((sub) => (
                    <div key={sub} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sub-${sub}`}
                        checked={formData.subtitles.includes(sub)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, subtitles: [...formData.subtitles, sub] });
                          } else {
                            setFormData({ ...formData, subtitles: formData.subtitles.filter(s => s !== sub) });
                          }
                        }}
                      />
                      <Label htmlFor={`sub-${sub}`} className="cursor-pointer">
                        {sub.toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-white border-r-transparent mr-2" />
                Creating Showtimes...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Create Showtimes
              </>
            )}
          </Button>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">📋 Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedMovie && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Movie</p>
                  <p className="font-semibold text-sm">{selectedMovie.title}</p>
                </div>
              )}

              {selectedCinema && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Cinema</p>
                  <p className="font-semibold text-sm">{selectedCinema.name}</p>
                </div>
              )}

              {selectedHall && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Hall</p>
                  <p className="font-semibold text-sm">{selectedHall.name}</p>
                </div>
              )}

              {formData.startDate && formData.endDate && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Period</p>
                  <p className="font-semibold text-sm">
                    {formData.startDate} → {formData.endDate}
                  </p>
                </div>
              )}

              {formData.timeSlots.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Time Slots</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.timeSlots.map(time => (
                      <Badge key={time} variant="secondary" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 mb-2">Format & Audio</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">Format:</span>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      🎬 {formData.format}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">Language:</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      🎙️ {formData.language.toUpperCase()}
                    </Badge>
                  </div>

                  {formData.subtitles.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-medium text-gray-600 mt-1">Subtitles:</span>
                      <div className="flex flex-wrap gap-1">
                        {formData.subtitles.map(sub => (
                          <Badge key={sub} className="bg-green-100 text-green-700 border-green-200 text-xs">
                            📝 {sub.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">✅ Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-2xl font-bold text-green-600">{result.createdCount}</span>
                </div>
                
                {result.skippedCount > 0 && (
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium">Skipped</span>
                    <span className="text-2xl font-bold text-orange-600">{result.skippedCount}</span>
                  </div>
                )}

                {result.skipped && result.skipped.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium text-gray-700">Skipped Items:</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {result.skipped.map((item, idx) => (
                        <div key={idx} className="text-xs p-2 bg-white rounded">
                          <p className="font-medium">{item.start}</p>
                          <p className="text-gray-600">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-purple-600" />
              Batch Creation History
            </CardTitle>
            <CardDescription>Recent batch operations in this session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 border rounded-lg hover:border-purple-200 hover:bg-purple-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.movie}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p>🎭 {item.cinema} - {item.hall}</p>
                        <p>📅 {item.period}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">
                            ✅ {item.result.createdCount} created
                          </Badge>
                          {item.result.skippedCount > 0 && (
                            <Badge className="bg-orange-100 text-orange-700">
                              ⚠️ {item.result.skippedCount} skipped
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1" suppressHydrationWarning>
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {item.result.created && item.result.created.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">
                          {item.result.created.length} showtimes created
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                          onClick={() => window.location.href = '/admin/showtimes'}
                        >
                          View in Showtimes
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

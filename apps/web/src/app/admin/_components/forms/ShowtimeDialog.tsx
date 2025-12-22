'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@movie-hub/shacdn-ui/dialog';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Input } from '@movie-hub/shacdn-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useToast } from '../../_libs/use-toast';
import { useCreateShowtime, useUpdateShowtime, useMovieReleases } from '@/libs/api';
import type { Showtime, Movie, Cinema, Hall, CreateShowtimeRequest } from '@/libs/api/types';
import { FormatEnum } from '@movie-hub/shared-types/cinema/enum';

interface ShowtimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movies: Movie[];
  cinemas: Cinema[];
  halls: Hall[];
  editingShowtime?: Showtime | null;
  preSelectedMovieId?: string;
  preSelectedReleaseId?: string;
  onSuccess?: () => void;
}

export default function ShowtimeDialog({
  open,
  onOpenChange,
  movies,
  cinemas,
  halls,
  editingShowtime,
  preSelectedMovieId,
  preSelectedReleaseId,
  onSuccess,
}: ShowtimeDialogProps) {
  const createShowtime = useCreateShowtime();  const { data: movieReleasesData = [] } = useMovieReleases();
  const movieReleases = movieReleasesData || [];  const updateShowtime = useUpdateShowtime();
  const [formData, setFormData] = useState<CreateShowtimeRequest>({
    movieId: '',
    movieReleaseId: '',
    cinemaId: '',
    hallId: '',
    startTime: '',
    format: FormatEnum.TWO_D,
    language: 'vi',
    subtitles: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editingShowtime) {
      setFormData({
        movieId: editingShowtime.movieId,
        movieReleaseId: editingShowtime.movieReleaseId,
        cinemaId: editingShowtime.cinemaId,
        hallId: editingShowtime.hallId,
        startTime: editingShowtime.startTime.slice(0, 16),
        format: editingShowtime.format,
        language: editingShowtime.language,
        subtitles: editingShowtime.subtitles || [],
      });
    } else if (preSelectedMovieId && preSelectedReleaseId) {
      // Pre-fill when opening from Movie Releases page
      setFormData({
        movieId: preSelectedMovieId,
        movieReleaseId: preSelectedReleaseId,
        cinemaId: '',
        hallId: '',
        startTime: '',
        format: FormatEnum.TWO_D,
        language: 'vi',
        subtitles: [],
      });
    } else {
      setFormData({
        movieId: '',
        movieReleaseId: '',
        cinemaId: '',
        hallId: '',
        startTime: '',
        format: FormatEnum.TWO_D,
        language: 'vi',
        subtitles: [],
      });
    }
  }, [editingShowtime, preSelectedMovieId, preSelectedReleaseId, open]);

  const handleSubmit = async () => {
    if (!formData.movieId || !formData.movieReleaseId || !formData.cinemaId || 
        !formData.hallId || !formData.startTime) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Convert datetime-local format (yyyy-MM-ddTHH:mm) to backend format (yyyy-MM-dd HH:mm:ss)
      const startTimeFormatted = formData.startTime.replace('T', ' ') + ':00';
      const payload = {
        ...formData,
        startTime: startTimeFormatted,
      };

      if (editingShowtime) {
        await updateShowtime.mutateAsync({ id: editingShowtime.id, data: payload });
      } else {
        await createShowtime.mutateAsync(payload);
      }

      onOpenChange(false);
      onSuccess?.();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const selectedMovie = movies.find(m => m.id === formData.movieId);
  const selectedRelease = movieReleases.find(r => r.id === formData.movieReleaseId);
  const isMovieDisabled = !!preSelectedMovieId;
  const isReleaseDisabled = !!preSelectedReleaseId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingShowtime ? 'Edit Showtime' : 'Add New Showtime'}</DialogTitle>
          <DialogDescription>
            {editingShowtime ? 'Update showtime details' : 'Schedule a new movie showtime'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Movie */}
          <div className="space-y-2">
            <Label htmlFor="movie">Movie *</Label>
            {isMovieDisabled ? (
              <Input
                id="movie"
                value={selectedMovie?.title || ''}
                disabled
                className="bg-gray-50"
              />
            ) : (
              <Select
                value={formData.movieId}
                onValueChange={(value) => {
                  setFormData({ 
                    ...formData, 
                    movieId: value,
                    movieReleaseId: '', // Reset release when movie changes
                  });
                }}
              >
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

          {/* Movie Release ID */}
          <div className="space-y-2">
            <Label htmlFor="movieReleaseId">Movie Release ID *</Label>
            {isReleaseDisabled ? (
              <Input
                id="movieReleaseId"
                value={selectedRelease ? `${selectedRelease.startDate} → ${selectedRelease.endDate}` : ''}
                disabled
                className="bg-gray-50"
              />
            ) : (
              <Select
                value={formData.movieReleaseId}
                onValueChange={(value) =>
                  setFormData({ ...formData, movieReleaseId: value })
                }
                disabled={!formData.movieId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select movie release" />
                </SelectTrigger>
                <SelectContent>
                  {formData.movieId && (() => {
                    // Lấy các releases ACTIVE hoặc UPCOMING của movie này
                    const releases = movieReleases.filter(r => 
                      r.movieId === formData.movieId && 
                      (r.status === 'ACTIVE' || r.status === 'UPCOMING')
                    );
                    return releases.map((release) => (
                      <SelectItem key={release.id} value={release.id}>
                        {new Date(release.startDate).toLocaleDateString()} → {new Date(release.endDate).toLocaleDateString()} ({release.status === 'ACTIVE' ? 'Now Showing' : 'Coming Soon'})
                      </SelectItem>
                    ));
                  })()}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Cinema */}
          <div className="space-y-2">
            <Label htmlFor="cinema">Cinema *</Label>
            <Select
              value={formData.cinemaId}
              onValueChange={(value) => {
                setFormData({ ...formData, cinemaId: value, hallId: '' });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cinema" />
              </SelectTrigger>
              <SelectContent>
                {cinemas.map((cinema) => (
                  <SelectItem key={cinema.id} value={cinema.id}>
                    {cinema.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hall */}
          <div className="space-y-2">
            <Label htmlFor="hall">Hall *</Label>
            <Select
              value={formData.hallId}
              onValueChange={(value) =>
                setFormData({ ...formData, hallId: value })
              }
              disabled={!formData.cinemaId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hall" />
              </SelectTrigger>
              <SelectContent>
                {halls
                  .filter(hall => hall.cinemaId === formData.cinemaId)
                  .map((hall) => (
                    <SelectItem key={hall.id} value={hall.id}>
                      {hall.name} ({hall.type}) - {hall.capacity} seats
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time *</Label>
            <Input
              id="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  startTime: e.target.value,
                });
              }}
            />
          </div>

          {/* Format & Language */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select
                value={formData.format}
                onValueChange={(value) =>
                  setFormData({ ...formData, format: value as FormatEnum })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={FormatEnum.TWO_D}>2D</SelectItem>
                  <SelectItem value={FormatEnum.THREE_D}>3D</SelectItem>
                  <SelectItem value={FormatEnum.IMAX}>IMAX</SelectItem>
                  <SelectItem value={FormatEnum.FOUR_DX}>4DX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) =>
                  setFormData({ ...formData, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
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

          {/* Subtitles */}
          <div className="space-y-2">
            <Label htmlFor="subtitles">Subtitles (Phụ đề)</Label>
            <Input
              id="subtitles"
              value={(formData.subtitles || []).join(', ')}
              onChange={(e) => {
                const subtitlesArray = e.target.value
                  .split(',')
                  .map(s => s.trim())
                  .filter(s => s.length > 0);
                setFormData({ ...formData, subtitles: subtitlesArray });
              }}
              placeholder="en"
            />
            <p className="text-xs text-gray-500">
              Nhập các ngôn ngữ phụ đề, phân cách bằng dấu phẩy. Ví dụ: Vietnamese, English, Chinese
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            {editingShowtime ? 'Update Showtime' : 'Create Showtime'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

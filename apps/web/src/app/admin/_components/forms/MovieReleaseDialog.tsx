'use client';

import { useState, useEffect, startTransition } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
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
import { Textarea } from '@movie-hub/shacdn-ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useToast } from '../../_libs/use-toast';
import { useCreateMovieRelease, useUpdateMovieRelease, useMovieRelease } from '@/libs/api';
import type { Movie, MovieRelease } from '@/libs/api/types';

// Helper to validate UUID format
const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

interface MovieReleaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movies: Movie[];
  editingRelease?: MovieRelease | null;
  preSelectedMovieId?: string; // Pre-select movie and disable dropdown
  onSuccess?: () => void;
}

export default function MovieReleaseDialog({
  open,
  onOpenChange,
  movies,
  editingRelease,
  preSelectedMovieId,
  onSuccess,
}: MovieReleaseDialogProps) {
  const createMovieRelease = useCreateMovieRelease();
  const updateMovieRelease = useUpdateMovieRelease();
  const { data: fetchedReleaseDetail } = useMovieRelease(editingRelease?.id || null);
  const fullReleaseDetail = fetchedReleaseDetail || editingRelease;
  const [formData, setFormData] = useState({
    movieId: '',
    startDate: '',
    endDate: '',
    note: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (fullReleaseDetail) {
      // Helper to format date - handle both string and Date objects
      const formatDate = (date: string | Date | undefined): string => {
        if (!date) return '';
        if (typeof date === 'string') {
          // If it's already in YYYY-MM-DD format, return as-is
          if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return date;
          }
          // If it's ISO format with time, extract date part
          return date.split('T')[0];
        }
        // If it's a Date object, convert to YYYY-MM-DD
        return date.toISOString().split('T')[0];
      };

      setFormData({
        // Fall back to fullReleaseDetail.movie?.id when movieId missing from BE
        movieId: fullReleaseDetail.movieId || fullReleaseDetail.movie?.id || '',
        startDate: formatDate(fullReleaseDetail.startDate),
        endDate: formatDate(fullReleaseDetail.endDate),
        note: fullReleaseDetail.note || '',
      });
    } else if (preSelectedMovieId) {
      // Pre-fill movieId when opening from Movies page
      setFormData({
        movieId: preSelectedMovieId,
        startDate: '',
        endDate: '',
        note: '',
      });
    } else {
      setFormData({
        movieId: '',
        startDate: '',
        endDate: '',
        note: '',
      });
    }
  }, [fullReleaseDetail, preSelectedMovieId, open]);

  const resetForm = () => {
    setFormData({
      movieId: preSelectedMovieId || '',
      startDate: '',
      endDate: '',
      note: '',
    });
  };

  const handleSubmit = async () => {
    if (!formData.movieId || !formData.startDate || !formData.endDate) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Validate movieId is a proper UUID format
    if (!isValidUUID(formData.movieId)) {
      toast({
        title: 'Validation Error',
        description: 'Invalid movie ID format. Please select a valid movie from the dropdown.',
        variant: 'destructive',
      });
      console.warn('[MovieReleaseDialog] Invalid movieId format:', formData.movieId);
      return;
    }

    try {
      // Build payloads: create requires movieId, update should not change relation
      const basePayload: Record<string, string | undefined> = {
        // Send ISO timestamps to avoid backend parsing ambiguity
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      // Only add note if it has value (BE schema is strict, rejects undefined)
      if (formData.note && formData.note.trim()) {
        basePayload.note = formData.note;
      }

      const createPayload = { movieId: formData.movieId, ...basePayload };

      // Detailed debug log: inspect payload before submit
      console.log('[MovieReleaseDialog] Form data:', formData);
      console.log('[MovieReleaseDialog] Parsed dates:');
      console.log('  startDate input:', formData.startDate);
      console.log('  startDate ISO:', basePayload.startDate);
      console.log('  endDate input:', formData.endDate);
      console.log('  endDate ISO:', basePayload.endDate);
      console.log('[MovieReleaseDialog] Note field:', formData.note, '-> will include:', !!basePayload.note);
      console.log('[MovieReleaseDialog] Final payload (create):', JSON.stringify(createPayload, null, 2));
      console.log('[MovieReleaseDialog] Final payload (update):', JSON.stringify(basePayload, null, 2));

      if (fullReleaseDetail) {
        // For update, omit movieId to avoid backend validation rejecting relation changes
        await updateMovieRelease.mutateAsync({ id: fullReleaseDetail.id, data: basePayload });
      } else {
        console.log('[MovieReleaseDialog] Sending CREATE request with:', createPayload);
        await createMovieRelease.mutateAsync(createPayload);
      }

      onOpenChange(false);
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error('[MovieReleaseDialog] Catch block error:', error);
      // Error toast already shown by mutation hooks
    }
  };

  const selectedId = formData.movieId || fullReleaseDetail?.movieId || '';
  const selectedMovie = movies.find((m) => m.id === selectedId) || fullReleaseDetail?.movie;
  const selectedLabel = selectedMovie
    ? `${selectedMovie.title} (${selectedMovie.runtime} mins)`
    : (selectedId ? `Movie (${selectedId})` : undefined);
  const isMovieDisabled = !!preSelectedMovieId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{fullReleaseDetail ? 'Edit Release' : 'Add New Release'}</DialogTitle>
          <DialogDescription>
            {fullReleaseDetail ? 'Update release schedule details' : 'Create a new movie release schedule'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="movieId">Movie *</Label>
            {movies.length === 0 ? (
              <div className="text-sm text-red-600 p-2 border border-red-300 rounded bg-red-50">
                No movies available. Please add movies first before creating releases.
              </div>
            ) : (
            <Select
              value={selectedId}
              onValueChange={(value) => {
                // Use startTransition to schedule a low-priority state update
                // which avoids synchronous unmounts of portal children
                startTransition(() => {
                  setFormData((prev) => ({ ...prev, movieId: value }));
                });
              }}
              disabled={isMovieDisabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select movie">
                  {selectedLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {fullReleaseDetail && !movies.find(m => m.id === fullReleaseDetail.movieId) && (
                  <SelectItem key={`injected-${fullReleaseDetail.movieId}`} value={fullReleaseDetail.movieId}>
                    {fullReleaseDetail.movie ? `${fullReleaseDetail.movie.title} (${fullReleaseDetail.movie.runtime} mins) - Current` : `Movie (${fullReleaseDetail.movieId}) - Current`}
                  </SelectItem>
                )}
                {movies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id}>
                    {movie.title} ({movie.runtime} mins)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="e.g., Phát hành dịp Tết Nguyên Đán 2025"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.movieId || !formData.startDate || !formData.endDate || (movies.length === 0 && !fullReleaseDetail)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingRelease ? 'Update Release' : 'Create Release'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

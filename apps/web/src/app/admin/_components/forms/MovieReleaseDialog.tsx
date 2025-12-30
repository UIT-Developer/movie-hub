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
import { useCreateMovieRelease, useUpdateMovieRelease } from '@/libs/api';
import type { Movie, MovieRelease } from '@/libs/api/types';

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
  const [formData, setFormData] = useState({
    movieId: '',
    startDate: '',
    endDate: '',
    note: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editingRelease) {
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
        // Fall back to editingRelease.movie?.id when movieId missing from BE
        movieId: editingRelease.movieId || editingRelease.movie?.id || '',
        startDate: formatDate(editingRelease.startDate),
        endDate: formatDate(editingRelease.endDate),
        note: editingRelease.note || '',
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
  }, [editingRelease, preSelectedMovieId, open]);

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

    try {
      // Build payloads: create requires movieId, update should not change relation
      const basePayload = {
        // Send ISO timestamps to avoid backend parsing ambiguity
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        note: formData.note || undefined, // note is optional in backend
      };

      const createPayload = { movieId: formData.movieId, ...basePayload };

      // Temporary debug log: inspect payload before submit
      console.log('[MovieReleaseDialog] submit payload (create):', createPayload);
      console.log('[MovieReleaseDialog] submit payload (update):', basePayload);

      if (editingRelease) {
        // For update, omit movieId to avoid backend validation rejecting relation changes
        await updateMovieRelease.mutateAsync({ id: editingRelease.id, data: basePayload });
      } else {
        await createMovieRelease.mutateAsync(createPayload);
      }

      onOpenChange(false);
      resetForm();
      onSuccess?.();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const selectedId = formData.movieId || editingRelease?.movieId || '';
  const selectedMovie = movies.find((m) => m.id === selectedId) || editingRelease?.movie;
  const selectedLabel = selectedMovie
    ? `${selectedMovie.title} (${selectedMovie.runtime} mins)`
    : (selectedId ? `Movie (${selectedId})` : undefined);
  const isMovieDisabled = !!preSelectedMovieId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingRelease ? 'Edit Release' : 'Add New Release'}</DialogTitle>
          <DialogDescription>
            {editingRelease ? 'Update release schedule details' : 'Create a new movie release schedule'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="movieId">Movie *</Label>
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
                {editingRelease && !movies.find(m => m.id === editingRelease.movieId) && (
                  <SelectItem key={`injected-${editingRelease.movieId}`} value={editingRelease.movieId}>
                    {editingRelease.movie ? `${editingRelease.movie.title} (${editingRelease.movie.runtime} mins) - Current` : `Movie (${editingRelease.movieId}) - Current`}
                  </SelectItem>
                )}
                {movies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id}>
                    {movie.title} ({movie.runtime} mins)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            {editingRelease ? 'Update Release' : 'Create Release'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

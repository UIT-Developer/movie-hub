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
      setFormData({
        movieId: editingRelease.movieId,
        startDate: typeof editingRelease.startDate === 'string' ? editingRelease.startDate : editingRelease.startDate.toISOString().split('T')[0],
        endDate: typeof editingRelease.endDate === 'string' ? editingRelease.endDate : editingRelease.endDate.toISOString().split('T')[0],
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
      const payload = {
        movieId: formData.movieId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        note: formData.note || undefined, // note is optional in backend
      };

      if (editingRelease) {
        await updateMovieRelease.mutateAsync({ id: editingRelease.id, data: payload });
      } else {
        await createMovieRelease.mutateAsync(payload);
      }

      onOpenChange(false);
      resetForm();
      onSuccess?.();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const selectedMovie = movies.find(m => m.id === formData.movieId);
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
            {isMovieDisabled ? (
              <Input
                id="movieId"
                value={selectedMovie?.title || ''}
                disabled
                className="bg-gray-50"
              />
            ) : (
              <Select
                value={formData.movieId}
                onValueChange={(value) =>
                  setFormData({ ...formData, movieId: value })
                }
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
            <Label htmlFor="note">Note *</Label>
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

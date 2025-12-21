'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
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
import { useToast } from '../_libs/use-toast';
// import api from '@/lib/api';
import type { Genre } from '../_libs/types';

const mockGenres: Genre[] = [
  { id: 'g_001', name: 'Action' },
  { id: 'g_002', name: 'Horror' },
  { id: 'g_003', name: 'Drama' },
  { id: 'g_004', name: 'Comedy' },
  { id: 'g_005', name: 'Sci-Fi' },
  { id: 'g_006', name: 'Romance' },
  { id: 'g_007', name: 'Thriller' },
  { id: 'g_008', name: 'Animation' },
];

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [formData, setFormData] = useState({
    name: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      // const response = await api.get('/genres');
      // setGenres(response.data);
      
      // Mock data with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenres(mockGenres);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch genres',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Genre name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingGenre) {
        // Update existing genre
        // await api.put(`/genres/${editingGenre.id}`, formData);
        toast({ title: 'Success', description: 'Genre updated successfully' });
      } else {
        // Create new genre
        // await api.post('/genres', formData);
        toast({ title: 'Success', description: 'Genre created successfully' });
      }
      setDialogOpen(false);
      fetchGenres();
      resetForm();
    } catch {
      toast({
        title: 'Error',
        description: editingGenre ? 'Failed to update genre' : 'Failed to create genre',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    setFormData({
      name: genre.name,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this genre?')) {
      return;
    }

    try {
      // await api.delete(`/genres/${id}`);
      toast({ title: 'Success', description: 'Genre deleted successfully' });
      fetchGenres();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete genre',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingGenre(null);
    setFormData({
      name: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Genres</h1>
          <p className="text-gray-500 mt-1">Manage movie genres and categories</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Genre
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All Genres</CardTitle>
            <CardDescription>
              {genres.length} genre{genres.length !== 1 ? 's' : ''} in total
            </CardDescription>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading genres...</p>
          </div>
        ) : genres.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No genres found. Add your first genre to get started.</p>
              <Button
                onClick={() => {
                  resetForm();
                  setDialogOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Genre
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <Card 
                key={genre.id} 
                className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-purple-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Tag className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(genre)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(genre.id)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                      {genre.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Genre Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGenre ? 'Edit Genre' : 'Add New Genre'}</DialogTitle>
            <DialogDescription>
              {editingGenre ? 'Update genre details' : 'Create a new movie genre'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Genre Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Action, Horror, Comedy"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {editingGenre ? 'Update Genre' : 'Create Genre'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

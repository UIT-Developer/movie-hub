// src/app/(admin)/movies/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Film as FilmIcon, Calendar } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
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
import { Textarea } from '@movie-hub/shacdn-ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@movie-hub/shacdn-ui/dropdown-menu';
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie, useGenres } from '@/libs/api';
import type { Movie, CreateMovieRequest, AgeRating, LanguageType, MovieCast } from '@/libs/api/types';
import { AgeRatingEnum, LanguageOptionEnum } from '@movie-hub/shared-types/movie/enum';
import Image from 'next/image';
import MovieReleaseDialog from '../_components/forms/MovieReleaseDialog';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addReleaseDialogOpen, setAddReleaseDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedMovieIdForRelease, setSelectedMovieIdForRelease] = useState<string>('');
  const [formData, setFormData] = useState<Partial<CreateMovieRequest>>({
    title: '',
    overview: '',
    originalTitle: '',
    posterUrl: '',
    trailerUrl: '',
    backdropUrl: '',
    runtime: 0,
    releaseDate: '',
    ageRating: AgeRatingEnum.P as AgeRating,
    originalLanguage: 'en',
    spokenLanguages: ['en'],
    languageType: LanguageOptionEnum.SUBTITLE as LanguageType,
    productionCountry: 'US',
    director: '',
    cast: [] as MovieCast[],
    genreIds: [] as string[],
  });

  // API hooks
  const { data: moviesData = [] } = useMovies();
  const movies = moviesData || [];
  const { data: genresData = [] } = useGenres();
  const genres = genresData || [];
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovie = useDeleteMovie();

  const loading = createMovie.isPending || updateMovie.isPending || deleteMovie.isPending;

  const ageRatingOptions: AgeRating[] = [AgeRatingEnum.P, AgeRatingEnum.K, AgeRatingEnum.T13, AgeRatingEnum.T16, AgeRatingEnum.T18, AgeRatingEnum.C];
  const languageTypeOptions: LanguageType[] = [LanguageOptionEnum.ORIGINAL, LanguageOptionEnum.SUBTITLE, LanguageOptionEnum.DUBBED];

  const handleSubmit = async () => {
    try {
      const apiData = {
        ...formData,
        cast: formData.cast || [],
      };
      if (selectedMovie) {
        await updateMovie.mutateAsync({ id: selectedMovie.id, data: apiData });
      } else {
        await createMovie.mutateAsync(apiData as CreateMovieRequest);
      }
      setDialogOpen(false);
      resetForm();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const handleDelete = async () => {
    if (!selectedMovie) return;
    try {
      await deleteMovie.mutateAsync(selectedMovie.id);
      setDeleteDialogOpen(false);
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      overview: '',
      originalTitle: '',
      posterUrl: '',
      trailerUrl: '',
      backdropUrl: '',
      runtime: 0,
      releaseDate: '',
      ageRating: AgeRatingEnum.P,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      languageType: LanguageOptionEnum.SUBTITLE,
      productionCountry: 'US',
      director: '',
      cast: [],
      genreIds: [],
    });
    setSelectedMovie(null);
  };

  const openEditDialog = (movie: Movie) => {
    setSelectedMovie(movie);
    const releaseDateStr = typeof movie.releaseDate === 'string' 
      ? movie.releaseDate 
      : new Date(movie.releaseDate).toISOString().split('T')[0];
    setFormData({
      title: movie.title,
      overview: movie.overview,
      originalTitle: movie.originalTitle || '',
      posterUrl: movie.posterUrl,
      trailerUrl: movie.trailerUrl || '',
      backdropUrl: movie.backdropUrl || '',
      runtime: movie.runtime,
      releaseDate: releaseDateStr,
      ageRating: movie.ageRating,
      originalLanguage: movie.originalLanguage,
      spokenLanguages: movie.spokenLanguages,
      languageType: movie.languageType,
      productionCountry: movie.productionCountry,
      director: movie.director || '',
      cast: movie.cast,
      genreIds: movie.genres ? movie.genres.map(g => g.id) : [],
    });
    setDialogOpen(true);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOW_SHOWING':
        return 'bg-green-100 text-green-700';
      case 'COMING_SOON':
        return 'bg-blue-100 text-blue-700';
      case 'ENDED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-gray-500 mt-1">Manage your movie catalog</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Movie
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">Loading...</div>
        ) : filteredMovies.length === 0 ? (
          <div className="col-span-full text-center py-12">No movies found</div>
        ) : (
          filteredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-96 bg-gray-100">
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FilmIcon className="h-16 w-16 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(movie)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMovieIdForRelease(movie.id);
                          setAddReleaseDialogOpen(true);
                        }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add Release
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMovie(movie);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {movie.overview || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{movie.runtime} mins</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <span className="font-medium">{movie.ageRating}</span>
                  </div>
                  {movie.cast && movie.cast.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-500">Cast: </span>
                      <span className="font-medium">
                        {movie.cast.slice(0, 2).map(c => c.name).join(', ')}
                        {movie.cast.length > 2 && '...'}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(movie.genres || []).slice(0, 3).map((g) => (
                      <Badge key={g.id} variant="secondary" className="text-xs">
                        {g.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Badge className={getStatusColor(movie.status || 'COMING_SOON')}>
                      {(movie.status || 'COMING_SOON').replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedMovie ? 'Edit Movie' : 'Add New Movie'}
            </DialogTitle>
            <DialogDescription>
              Fill in the movie details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Avatar: The Way of Water"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalTitle">Original Title</Label>
              <Input
                id="originalTitle"
                value={formData.originalTitle}
                onChange={(e) =>
                  setFormData({ ...formData, originalTitle: e.target.value })
                }
                placeholder="Original title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Overview *</Label>
              <Textarea
                id="overview"
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                placeholder="Enter movie overview..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="posterUrl">Poster URL *</Label>
                <Input
                  id="posterUrl"
                  value={formData.posterUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, posterUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backdropUrl">Backdrop URL</Label>
                <Input
                  id="backdropUrl"
                  value={formData.backdropUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, backdropUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerUrl">Trailer URL</Label>
                <Input
                  id="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, trailerUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="runtime">Runtime (mins) *</Label>
                <Input
                  id="runtime"
                  type="number"
                  value={formData.runtime}
                  onChange={(e) =>
                    setFormData({ ...formData, runtime: parseInt(e.target.value) || 0 })
                  }
                  placeholder="120"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageRating">Age Rating *</Label>
                <Select
                  value={formData.ageRating}
                  onValueChange={(value) =>
                    setFormData({ ...formData, ageRating: value as AgeRating })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRatingOptions.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Release Date *</Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={typeof formData.releaseDate === 'string' ? formData.releaseDate : (formData.releaseDate instanceof Date ? formData.releaseDate.toISOString().split('T')[0] : '')}
                  onChange={(e) =>
                    setFormData({ ...formData, releaseDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="originalLanguage">Original Language *</Label>
                <Input
                  id="originalLanguage"
                  value={formData.originalLanguage}
                  onChange={(e) =>
                    setFormData({ ...formData, originalLanguage: e.target.value })
                  }
                  placeholder="en"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languageType">Language Type *</Label>
                <Select
                  value={formData.languageType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, languageType: value as LanguageType })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productionCountry">Production Country *</Label>
                <Input
                  id="productionCountry"
                  value={formData.productionCountry}
                  onChange={(e) =>
                    setFormData({ ...formData, productionCountry: e.target.value })
                  }
                  placeholder="US"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="director">Director *</Label>
                <Input
                  id="director"
                  value={formData.director}
                  onChange={(e) =>
                    setFormData({ ...formData, director: e.target.value })
                  }
                  placeholder="Christopher Nolan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spokenLanguages">Spoken Languages * (comma-separated)</Label>
                <Input
                  id="spokenLanguages"
                  value={formData.spokenLanguages?.join(', ') || 'en'}
                  onChange={(e) =>
                    setFormData({ 
                      ...formData, 
                      spokenLanguages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    })
                  }
                  placeholder="en, vi, zh"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cast (Diễn viên) *</Label>
              <div className="space-y-2">
                {(formData.cast || []).map((actor, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={actor.name}
                      onChange={(e) => {
                        const newCast = [...(formData.cast || [])];
                        newCast[index] = { ...newCast[index], name: e.target.value };
                        setFormData({ ...formData, cast: newCast });
                      }}
                      placeholder="Actor name"
                      className="flex-1"
                    />
                    <Input
                      value={actor.character || ''}
                      onChange={(e) => {
                        const newCast = [...(formData.cast || [])];
                        newCast[index] = { ...newCast[index], character: e.target.value };
                        setFormData({ ...formData, cast: newCast });
                      }}
                      placeholder="Character name (optional)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newCast = (formData.cast || []).filter((_, i) => i !== index);
                        setFormData({ ...formData, cast: newCast });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      cast: [...(formData.cast || []), { name: '', character: '' }],
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Cast Member
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Genres *</Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    type="button"
                    variant={formData.genreIds?.includes(genre.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        genreIds: formData.genreIds?.includes(genre.id)
                          ? formData.genreIds.filter((id) => id !== genre.id)
                          : [...(formData.genreIds || []), genre.id],
                      });
                    }}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
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
              {selectedMovie ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Movie</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedMovie?.title}&quot;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Release Dialog */}
      <MovieReleaseDialog
        open={addReleaseDialogOpen}
        onOpenChange={(open) => {
          setAddReleaseDialogOpen(open);
          if (!open) {
            setSelectedMovieIdForRelease('');
          }
        }}
        movies={movies}
        preSelectedMovieId={selectedMovieIdForRelease}
        onSuccess={() => {
          // Optionally refresh data or show success message
        }}
      />
    </div>
  );
}

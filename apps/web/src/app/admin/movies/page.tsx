// src/app/(admin)/movies/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Film as FilmIcon, Calendar } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import {
  Card,
  CardContent,
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
// Badge removed (not used in overlay) — kept import commented for future use
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@movie-hub/shacdn-ui/dropdown-menu';
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie, useGenres, moviesApi, movieReleasesApi } from '@/libs/api';
import type { Movie, CreateMovieRequest, AgeRating, LanguageType, MovieCast } from '@/libs/api/types';
import { AgeRatingEnum, LanguageOptionEnum } from '@movie-hub/shared-types/movie/enum';
import Image from 'next/image';
import MovieReleaseDialog from '../_components/forms/MovieReleaseDialog';

// Type for enriched movie with status
interface EnrichedMovie extends Movie {
  displayOverview?: string;
  displayDirector?: string;
  calculatedStatus?: string;
}

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [validationErrorOpen, setValidationErrorOpen] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const [addReleaseDialogOpen, setAddReleaseDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedMovieIdForRelease, setSelectedMovieIdForRelease] = useState<string>('');
  const [enrichedMovies, setEnrichedMovies] = useState<Map<string, EnrichedMovie>>(new Map());
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
  const movies = useMemo(() => moviesData || [], [moviesData]);
  const { data: genresData = [] } = useGenres();
  const genres = useMemo(() => genresData || [], [genresData]);
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovie = useDeleteMovie();

  const loading = createMovie.isPending || updateMovie.isPending || deleteMovie.isPending;

  const ageRatingOptions: AgeRating[] = [AgeRatingEnum.P, AgeRatingEnum.K, AgeRatingEnum.T13, AgeRatingEnum.T16, AgeRatingEnum.T18, AgeRatingEnum.C];
  const languageTypeOptions: LanguageType[] = [LanguageOptionEnum.ORIGINAL, LanguageOptionEnum.SUBTITLE, LanguageOptionEnum.DUBBED];

  // Function to calculate movie status based on releases
  const calculateMovieStatus = (releaseDate?: string | Date | null, releases?: Array<{startDate: string; endDate?: string | null}>): string => {
    // Priority 1: Use movieRelease dates if available
    if (releases && releases.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const release of releases) {
        const startDate = new Date(release.startDate);
        const endDate = release.endDate ? new Date(release.endDate) : null;
        
        startDate.setHours(0, 0, 0, 0);
        if (endDate) endDate.setHours(0, 0, 0, 0);

        // If movie is currently showing in any cinema
        if (startDate <= today && (!endDate || endDate >= today)) {
          return 'NOW_SHOWING';
        }
      }

      // If no active releases, check if any are upcoming
      for (const release of releases) {
        const startDate = new Date(release.startDate);
        startDate.setHours(0, 0, 0, 0);
        if (startDate > today) {
          return 'COMING_SOON';
        }
      }
      return 'ENDED';
    }

    // Priority 2: Use releaseDate if no releases
    if (releaseDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const release = new Date(releaseDate);
      release.setHours(0, 0, 0, 0);
      
      if (release > today) {
        return 'COMING_SOON';
      } else {
        return 'NOW_SHOWING';
      }
    }

    return 'COMING_SOON';
  };

  // Fetch full movie details and releases to enrich the list
  useEffect(() => {
    const enrichMoviesData = async () => {
      const enrichedMap = new Map<string, EnrichedMovie>();

      for (const movie of movies) {
        try {
          // Fetch full movie details to get overview and director
          const detailResponse = await moviesApi.getById(movie.id);
          const fullMovie = typeof detailResponse === 'object' && 'data' in detailResponse 
            ? (detailResponse as { data: Movie }).data 
            : (detailResponse as Movie);

          // Fetch movie releases for status calculation
          let releases: Array<{ startDate: string; endDate?: string | null }> = [];
          try {
            const releasesResponse = await movieReleasesApi.getAll({ movieId: movie.id });
            releases = Array.isArray(releasesResponse)
              ? (releasesResponse as Array<{ startDate: string; endDate?: string | null }> )
              : ((releasesResponse as { data?: Array<{ startDate: string; endDate?: string | null }> })?.data ?? []);
          } catch {
            // If releases fetch fails, continue with empty array
            releases = [];
          }

          const enrichedMovie: EnrichedMovie = {
            ...movie,
            displayOverview: fullMovie.overview && fullMovie.overview.trim() ? fullMovie.overview : undefined,
            displayDirector: fullMovie.director && fullMovie.director.trim() ? fullMovie.director : undefined,
            calculatedStatus: calculateMovieStatus(movie.releaseDate, releases),
            // include full detail fields so overlay can read cast/genre/etc
            cast: fullMovie.cast || movie.cast || [],
            genre: fullMovie.genre || movie.genre || [],
            spokenLanguages: fullMovie.spokenLanguages || movie.spokenLanguages || [],
            productionCountry: fullMovie.productionCountry || movie.productionCountry,
          };

          // update progressively so UI shows enriched data per movie as soon as available
          setEnrichedMovies(prev => {
            const m = new Map(prev);
            m.set(movie.id, enrichedMovie);
            return m;
          });
          enrichedMap.set(movie.id, enrichedMovie);
        } catch {
          // If detail fetch fails, use list data with calculated status based on releaseDate only
          const enrichedMovie: EnrichedMovie = {
            ...movie,
            displayOverview: movie.overview && movie.overview.trim() ? movie.overview : undefined,
            displayDirector: movie.director && movie.director.trim() ? movie.director : undefined,
            calculatedStatus: calculateMovieStatus(movie.releaseDate),
          };
          setEnrichedMovies(prev => {
            const m = new Map(prev);
            m.set(movie.id, enrichedMovie);
            return m;
          });
          enrichedMap.set(movie.id, enrichedMovie);
        }
      }

      // final snapshot (no-op if same)
      setEnrichedMovies(enrichedMap);
    };

    if (movies.length > 0) {
      enrichMoviesData();
    }
  }, [movies]);

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title?.trim()) {
      setValidationErrorMessage('Title is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.overview?.trim()) {
      setValidationErrorMessage('Overview is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.posterUrl?.trim()) {
      setValidationErrorMessage('Poster URL is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.releaseDate) {
      setValidationErrorMessage('Release Date is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.runtime || formData.runtime <= 0) {
      setValidationErrorMessage('Runtime must be greater than 0');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.originalLanguage?.trim()) {
      setValidationErrorMessage('Original Language is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.director?.trim()) {
      setValidationErrorMessage('Director is required');
      setValidationErrorOpen(true);
      return;
    }
    if (!formData.spokenLanguages || formData.spokenLanguages.length === 0) {
      setValidationErrorMessage('At least one spoken language is required');
      setValidationErrorOpen(true);
      return;
    }

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

  const openEditDialog = async (movie: Movie) => {
    setSelectedMovie(movie);
    try {
      // Fetch full movie detail to ensure all fields are populated
      const fullMovieDetail = await moviesApi.getById(movie.id);
      
      // Parse releaseDate safely - handle ISO string, Date object, or malformed input
      let releaseDateStr = '';
      if (typeof fullMovieDetail.releaseDate === 'string') {
        // If already a string, check if it's YYYY-MM-DD format or ISO datetime
        if (fullMovieDetail.releaseDate.includes('T')) {
          releaseDateStr = fullMovieDetail.releaseDate.split('T')[0];
        } else {
          releaseDateStr = fullMovieDetail.releaseDate;
        }
      } else if (fullMovieDetail.releaseDate instanceof Date) {
        releaseDateStr = fullMovieDetail.releaseDate.toISOString().split('T')[0];
      } else {
        try {
          // Last resort: try to parse as Date
          const date = new Date(fullMovieDetail.releaseDate);
          if (!isNaN(date.getTime())) {
            releaseDateStr = date.toISOString().split('T')[0];
          }
        } catch {
          releaseDateStr = '';
        }
      }
      
      setFormData({
        title: fullMovieDetail.title,
        overview: fullMovieDetail.overview,
        originalTitle: fullMovieDetail.originalTitle || '',
        posterUrl: fullMovieDetail.posterUrl,
        trailerUrl: fullMovieDetail.trailerUrl || '',
        backdropUrl: fullMovieDetail.backdropUrl || '',
        runtime: fullMovieDetail.runtime,
        releaseDate: releaseDateStr,
        ageRating: fullMovieDetail.ageRating,
        originalLanguage: fullMovieDetail.originalLanguage,
        spokenLanguages: fullMovieDetail.spokenLanguages || [],
        languageType: fullMovieDetail.languageType,
        productionCountry: fullMovieDetail.productionCountry,
        director: fullMovieDetail.director || '',
        cast: fullMovieDetail.cast || [],
        genreIds: fullMovieDetail.genre ? fullMovieDetail.genre.map(g => g.id) : [],
      });
      setDialogOpen(true);
    } catch (error) {
      console.error('Failed to fetch movie detail:', error);
      // Fallback to summary data if detail fetch fails
      setFormData({
        title: movie.title,
        overview: movie.overview || '',
        originalTitle: movie.originalTitle || '',
        posterUrl: movie.posterUrl,
        trailerUrl: movie.trailerUrl || '',
        backdropUrl: movie.backdropUrl || '',
        runtime: movie.runtime,
        releaseDate: '',
        ageRating: movie.ageRating,
        originalLanguage: movie.originalLanguage,
        spokenLanguages: movie.spokenLanguages || [],
        languageType: movie.languageType,
        productionCountry: movie.productionCountry,
        director: movie.director || '',
        cast: movie.cast || [],
        genreIds: movie.genre ? movie.genre.map(g => g.id) : [],
      });
      setDialogOpen(true);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get enriched version of filtered movies
  const displayedMovies = useMemo(() => {
    return filteredMovies.map(movie => enrichedMovies.get(movie.id) || (movie as EnrichedMovie));
  }, [filteredMovies, enrichedMovies]);

  // Utility: normalize possible singular or array API shapes into arrays
  const ensureArray = <T,>(val?: T | T[] | null): T[] => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  // status color helper removed — not used in current overlay

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
        ) : displayedMovies.length === 0 ? (
          <div className="col-span-full text-center py-12">No movies found</div>
        ) : (
          displayedMovies.map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white group flex flex-col h-full"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2/3' }}>
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-900">
                    <FilmIcon className="h-20 w-20 text-gray-400" />
                  </div>
                )}

                <div className="absolute top-3 right-3 z-30">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 bg-white/90 hover:bg-white shadow-lg backdrop-blur"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => openEditDialog(movie)} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Edit Movie
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSelectedMovieIdForRelease(movie.id); setAddReleaseDialogOpen(true); }} className="cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" /> Schedule Release
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSelectedMovie(movie); setDeleteDialogOpen(true); }} className="text-red-600 cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Movie
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                  <div className="relative h-full w-full flex items-center justify-center pointer-events-auto">
                    <div className="w-full max-w-xl bg-black/60 rounded-lg p-4 text-center text-white shadow-2xl mx-4 overflow-y-auto" style={{ maxHeight: '70%' }}>
                      {ensureArray(movie.cast).length > 0 && (
                        <div className="mb-2">
                            <p className="text-xs text-yellow-300 font-semibold mb-1 uppercase tracking-wider">Cast</p>
                          <p className="text-sm">{ensureArray(movie.cast).slice(0,6).map(a => typeof a === 'object' && a && 'name' in a ? (a as { name?: string }).name : String(a)).filter(Boolean).join(', ')}</p>
                        </div>
                      )}
                      {ensureArray(movie.genre).length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-yellow-300 font-semibold mb-1 uppercase tracking-wider">Genres</p>
                          <p className="text-sm">{ensureArray(movie.genre).map(g => typeof g === 'object' && g && 'name' in g ? (g as { name?: string }).name : String(g)).filter(Boolean).join(', ')}</p>
                        </div>
                      )}
                      {ensureArray(movie.spokenLanguages).length > 0 && (
                        <div>
                          <p className="text-xs text-yellow-300 font-semibold mb-1 uppercase tracking-wider">Languages</p>
                          <p className="text-sm">{ensureArray(movie.spokenLanguages).join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-base line-clamp-2 mb-2 text-gray-900">{movie.title}</h3>
                {movie.displayDirector && (
                  <div className="mb-3 pb-2 border-b border-gray-200">
                    <p className="text-sm text-gray-700"><span className="font-semibold">🎬 {movie.displayDirector}</span></p>
                  </div>
                )}
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{movie.displayOverview ? movie.displayOverview : 'No description available'}</p>
                <div className="flex items-center justify-between text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200 mt-auto">
                  <div className="flex items-center gap-1.5"><span className="text-base">⏱</span><span className="font-semibold text-gray-800">{movie.runtime} min</span></div>
                  <div className="w-px h-5 bg-gray-300" />
                  <div className="flex items-center gap-1.5"><span className="text-base">📊</span><span className="font-semibold text-gray-800">{movie.ageRating}</span></div>
                </div>
              </div>
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
              <Label htmlFor="originalTitle">Original Title *</Label>
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
                <Label htmlFor="backdropUrl">Backdrop URL *</Label>
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
                <Label htmlFor="trailerUrl">Trailer URL *</Label>
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
                  value={
                    typeof formData.releaseDate === 'string'
                      ? formData.releaseDate
                      : formData.releaseDate instanceof Date
                      ? formData.releaseDate.toISOString().split('T')[0]
                      : ''
                  }
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

      {/* Validation Error Dialog */}
      <Dialog open={validationErrorOpen} onOpenChange={setValidationErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validation Error</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">{validationErrorMessage}</p>
          <DialogFooter>
            <Button onClick={() => setValidationErrorOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

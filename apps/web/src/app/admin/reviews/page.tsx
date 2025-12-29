'use client';

export const dynamic = 'force-dynamic';

import { useState, useMemo } from 'react';
import { Eye, Filter, Trash2, Star } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@movie-hub/shacdn-ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Input } from '@movie-hub/shacdn-ui/input';
import { useReviews, useDeleteReview, useMovies } from '@/libs/api';

export default function ReviewsPage() {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string>('');
  
  // Filters
  const [filterMovieId, setFilterMovieId] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);

  // API hooks
  const { data: moviesData = [] } = useMovies();
  const movies = useMemo(() => Array.isArray(moviesData) ? moviesData : [], [moviesData]);

  const { data: reviewsData = [], isLoading: loading } = useReviews({
    movieId: filterMovieId === 'all' ? undefined : filterMovieId,
    rating: filterRating === 'all' ? undefined : parseInt(filterRating),
    startDate: filterStartDate || undefined,
    endDate: filterEndDate || undefined,
    search: searchQuery || undefined,
    page,
  });
  const reviews = useMemo(() => Array.isArray(reviewsData) ? reviewsData : [], [reviewsData]);

  // Create movie map for enrichment
  const movieMap = useMemo(() => {
    const map = new Map<string, string>();
    movies.forEach((movie) => {
      if (movie?.id) {
        map.set(movie.id, movie.title || 'Unknown Movie');
      }
    });
    return map;
  }, [movies]);

  // Enrich reviews with movie titles
  const enrichedReviews = useMemo(() => {
    return reviews.map((review) => {
      const movieTitle = movieMap.get(review.movieId) || 'Unknown Movie';
      
      return {
        ...review,
        movieTitle,
        // userName/userEmail not available from BE, would need user-service integration
        userName: 'User', // Placeholder - BE doesn't return user info
        userEmail: '',
      };
    });
  }, [reviews, movieMap]);

  const selectedReview = enrichedReviews.find(r => r.id === selectedReviewId);
  const deleteReview = useDeleteReview();

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: enrichedReviews.length,
      avgRating: enrichedReviews.length > 0 
        ? (enrichedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / enrichedReviews.length).toFixed(1)
        : 0,
      fiveStars: enrichedReviews.filter(r => r.rating === 5).length,
      fourStars: enrichedReviews.filter(r => r.rating === 4).length,
      threeStars: enrichedReviews.filter(r => r.rating === 3).length,
      twoStars: enrichedReviews.filter(r => r.rating === 2).length,
      oneStars: enrichedReviews.filter(r => r.rating === 1).length,
    };
  }, [enrichedReviews]);

  const handleViewDetail = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setDetailDialogOpen(true);
  };

  const handleDeleteReview = async () => {
    if (!selectedReviewId) return;

    try {
      await deleteReview.mutateAsync(selectedReviewId);
      setDeleteDialogOpen(false);
      setDetailDialogOpen(false);
      setSelectedReviewId('');
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const handleClearFilters = () => {
    setFilterMovieId('all');
    setFilterRating('all');
    setFilterStartDate('');
    setFilterEndDate('');
    setSearchQuery('');
    setPage(1);
  };

  const hasActiveFilters = filterMovieId !== 'all' || filterRating !== 'all' || filterStartDate || filterEndDate || searchQuery;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-gray-500 mt-1">Manage movie reviews and ratings</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              Avg: {stats.avgRating} / 5 stars
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">5 Stars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.fiveStars}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? ((stats.fiveStars / stats.total) * 100).toFixed(0) : 0}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">4 Stars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.fourStars}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? ((stats.fourStars / stats.total) * 100).toFixed(0) : 0}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Ratings (1-2 ⭐)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.oneStars + stats.twoStars}</div>
            <p className="text-xs text-gray-500 mt-1">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search-query">Search</Label>
              <Input
                id="search-query"
                placeholder="Search by title, name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <Label htmlFor="filter-movie">Movie</Label>
              <Select value={filterMovieId} onValueChange={(value) => {
                setFilterMovieId(value);
                setPage(1);
              }}>
                <SelectTrigger id="filter-movie">
                  <SelectValue placeholder="All Movies" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-rating">Rating</Label>
              <Select value={filterRating} onValueChange={(value) => {
                setFilterRating(value);
                setPage(1);
              }}>
                <SelectTrigger id="filter-rating">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-start-date">Start Date</Label>
              <Input
                id="filter-start-date"
                type="date"
                value={filterStartDate}
                onChange={(e) => {
                  setFilterStartDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <Label htmlFor="filter-end-date">End Date</Label>
              <Input
                id="filter-end-date"
                type="date"
                value={filterEndDate}
                onChange={(e) => {
                  setFilterEndDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            {hasActiveFilters && (
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            {enrichedReviews.length} review{enrichedReviews.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-500">Loading reviews...</p>
            </div>
          ) : enrichedReviews.length === 0 ? (
            <div className="text-center py-16">
              <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found with current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rating</TableHead>
                    <TableHead>Movie</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrichedReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating || 0)}
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{review.movieTitle}</TableCell>
                      <TableCell>{review.userName || review.userEmail || 'Unknown'}</TableCell>
                      <TableCell className="max-w-lg truncate text-gray-600">{review.content}</TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(review.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetail(review.id)}
                            className="h-8 w-8 p-0"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedReviewId(review.id);
                              setDeleteDialogOpen(true);
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            title="Delete review"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>View complete review information</DialogDescription>
          </DialogHeader>

          {selectedReview ? (
            <div className="space-y-4">
              {/* Rating */}
              <div>
                <Label className="text-sm text-gray-500">Rating</Label>
                <div className="flex items-center gap-3 mt-1">
                  {renderStars(selectedReview.rating || 0)}
                  <span className="font-bold text-lg">{selectedReview.rating}/5</span>
                </div>
              </div>

              {/* Movie & Title */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Movie</Label>
                  <p className="font-medium">{selectedReview.movieTitle}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Title</Label>
                  <p className="font-medium">{selectedReview.title}</p>
                </div>
              </div>

              {/* Reviewer Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Reviewer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Name</Label>
                    <p>{selectedReview.userName || 'Anonymous'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Email</Label>
                    <p>{selectedReview.userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Review</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedReview.content}</p>
              </div>

              {/* Helpful Count */}
              {selectedReview.helpfulCount !== undefined && (
                <div className="border-t pt-4">
                  <Label className="text-sm text-gray-500">Helpful Votes</Label>
                  <p className="font-medium">{selectedReview.helpfulCount}</p>
                </div>
              )}

              {/* Timestamps */}
              <div className="border-t pt-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDate(selectedReview.createdAt)}</span>
                </div>
                {selectedReview.updatedAt && (
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span>{formatDate(selectedReview.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setDetailDialogOpen(false);
                setDeleteDialogOpen(true);
              }}
            >
              Delete Review
            </Button>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteReview}
              disabled={deleteReview.isPending}
            >
              {deleteReview.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Trash2, MessageSquare, Star, Filter } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { useToast } from '../_libs/use-toast';
import { useReviews, useDeleteReview, useMovies } from '@/libs/api';
import type { Review } from '@/libs/api/types';

export default function ReviewsPage() {
  const [filterMovieId, setFilterMovieId] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  
  const { toast } = useToast();

  // API hooks
  const { data: moviesData = [] } = useMovies();
  const movies = moviesData || [];

  const { data: reviewsData = [], isLoading: loading, error } = useReviews({
    movieId: filterMovieId !== 'all' ? filterMovieId : undefined,
    rating: filterRating !== 'all' ? parseInt(filterRating) : undefined,
  });
  const reviews = reviewsData || [];

  const deleteReview = useDeleteReview();

  // Show error toast if query fails
  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch reviews',
      variant: 'destructive',
    });
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await deleteReview.mutateAsync(id);
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };

  // Calculate statistics
  const stats = {
    total: reviews.length,
    avgRating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0,
    fiveStar: reviews.filter((r) => r.rating === 5).length,
    fourStar: reviews.filter((r) => r.rating === 4).length,
    threeStar: reviews.filter((r) => r.rating === 3).length,
    twoStar: reviews.filter((r) => r.rating === 2).length,
    oneStar: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-gray-500 mt-1">View and manage movie reviews</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              Avg: {stats.avgRating.toFixed(1)} ⭐
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">5-Star Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.fiveStar}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? ((stats.fiveStar / stats.total) * 100).toFixed(0) : 0}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">4-Star Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.fourStar}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? ((stats.fourStar / stats.total) * 100).toFixed(0) : 0}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">3-Star Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.threeStar}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? ((stats.threeStar / stats.total) * 100).toFixed(0) : 0}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Ratings (1-2★)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.oneStar + stats.twoStar}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.total > 0 ? (((stats.oneStar + stats.twoStar) / stats.total) * 100).toFixed(0) : 0}% of reviews
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filter-movie">Movie</Label>
              <Select value={filterMovieId} onValueChange={setFilterMovieId}>
                <SelectTrigger id="filter-movie">
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
            <div>
              <Label htmlFor="filter-rating">Rating</Label>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger id="filter-rating">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            {reviews.length} review{reviews.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-500">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found with current filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="border-l-4 border-l-purple-600">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-4">
                          {renderStars(review.rating)}
                          <Badge className={getRatingBadgeColor(review.rating)}>
                            {review.rating} Stars
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span>Review ID: {review.id.substring(0, 8)}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
                    <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                      <div className="flex gap-4">
                        <span>User ID: {review.userId.substring(0, 8)}</span>
                        <span>•</span>
                        <span>Movie ID: {review.movieId.substring(0, 8)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">About Review Management</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <p>
            This page allows you to view and delete movie reviews submitted by users. 
            Review creation and approval features are managed through the user-facing application.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>View all reviews with filtering options</li>
            <li>Delete inappropriate or spam reviews</li>
            <li>Monitor review quality and ratings distribution</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

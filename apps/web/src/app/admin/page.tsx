'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Film, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Ticket,
  Star,
  MessageSquare,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  mockDashboardStats,
  mockRevenue,
  mockBookings,
  mockReviews,
  getTopMoviesByBookings,
  getTopCinemasByRevenue,
} from './_libs/dashboardMockData';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = mockDashboardStats;
  const revenueData = mockRevenue;
  const recentBookings = mockBookings.slice(0, 5);
  const recentReviews = mockReviews.slice(0, 5);
  const topMovies = getTopMoviesByBookings();
  const topCinemas = getTopCinemasByRevenue();

  // Prepare chart data
  const revenueChartData = revenueData.map(day => ({
    date: new Date(day.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
    revenue: day.revenue / 1000000, // Convert to millions
    bookings: day.bookings,
  }));

  const movieChartData = topMovies.map(movie => ({
    name: movie.title.length > 15 ? movie.title.substring(0, 15) + '...' : movie.title,
    value: movie.totalBookings,
  }));

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  const statCards = [
    { 
      title: 'Total Movies', 
      value: stats.totalMovies, 
      icon: Film, 
      change: '+12.5%', 
      changeType: 'positive' as const,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/movies'
    },
    { 
      title: 'Total Cinemas', 
      value: stats.totalCinemas, 
      icon: Building2, 
      change: '+8.2%', 
      changeType: 'positive' as const,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/cinemas'
    },
    { 
      title: "Today's Showtimes", 
      value: stats.todayShowtimes, 
      icon: Calendar, 
      change: 'Active today', 
      changeType: 'neutral' as const,
      color: 'from-emerald-500 to-emerald-600',
      href: '/admin/showtimes'
    },
    { 
      title: 'Week Revenue', 
      value: `₫${(stats.weekRevenue / 1000000).toFixed(1)}M`, 
      icon: DollarSign, 
      change: '+18.7%', 
      changeType: 'positive' as const,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/reports'
    },
    { 
      title: 'Total Bookings', 
      value: stats.totalBookings, 
      icon: Ticket, 
      change: '+24.3%', 
      changeType: 'positive' as const,
      color: 'from-amber-500 to-amber-600',
      href: '/admin/reservations'
    },
    { 
      title: 'Average Rating', 
      value: stats.averageRating.toFixed(1), 
      icon: Star, 
      change: 'Excellent', 
      changeType: 'positive' as const,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/reviews'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-purple-100 text-lg">
            Here&apos;s an overview of your cinema business today - {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === 'positive';
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="flex items-center gap-1">
                    {stat.changeType !== 'neutral' && (
                      isPositive ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )
                    )}
                    <p className={`text-sm font-medium ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600' 
                        : stat.changeType === 'neutral'
                        ? 'text-gray-600'
                        : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Revenue Overview (Last 7 Days)
            </CardTitle>
            <CardDescription>Daily revenue and booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [`₫${value.toFixed(1)}M`, 'Revenue'];
                    return [value, 'Bookings'];
                  }}
                />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Movies Pie Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5 text-pink-600" />
              Top 5 Movies
            </CardTitle>
            <CardDescription>By total bookings today</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={movieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {movieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                  formatter={(value: number) => [`${value} seats`, 'Bookings']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Movies List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Top Movies
              </span>
              <Link href="/admin/movies">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription>Highest performing movies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMovies.map((movie, index) => (
                <div key={movie.movieId} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{movie.title}</p>
                      <p className="text-xs text-gray-500">{movie.totalBookings} bookings</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">₫{(movie.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Cinemas List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                Top Cinemas
              </span>
              <Link href="/admin/cinemas">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription>Best performing locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCinemas.map((cinema, index) => (
                <div key={cinema.cinemaId} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{cinema.name}</p>
                      <p className="text-xs text-gray-500">{cinema.location}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">₫{(cinema.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                Recent Reviews
              </span>
              <Link href="/admin/reviews">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription>Latest customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{review.customerName}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">{review.movieTitle}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-purple-600" />
              Recent Bookings
            </span>
            <Link href="/admin/reservations">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardTitle>
          <CardDescription>Latest ticket reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{booking.movieTitle}</p>
                    <Badge variant={
                      booking.status === 'CONFIRMED' ? 'default' :
                      booking.status === 'PENDING' ? 'secondary' :
                      'destructive'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{booking.cinemaName} • {booking.customerName}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(booking.bookingTime).toLocaleString('vi-VN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-emerald-600">₫{booking.totalPrice.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{booking.seats} seats</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/movies">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-300 transition-all">
                <Plus className="h-6 w-6" />
                <span>Add Movie</span>
              </Button>
            </Link>
            <Link href="/admin/showtimes">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all">
                <Plus className="h-6 w-6" />
                <span>Add Showtime</span>
              </Button>
            </Link>
            <Link href="/admin/cinemas">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                <Plus className="h-6 w-6" />
                <span>Add Cinema</span>
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:bg-pink-50 hover:border-pink-300 transition-all">
                <TrendingUp className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Users,
  Film,
  Calendar as CalendarIcon,
  Building2,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
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
import { Calendar } from '@movie-hub/shacdn-ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@movie-hub/shacdn-ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@movie-hub/shacdn-ui/tabs';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import type { Cinema, Movie } from '@/libs/api/types';
import { mockCinemas, mockMovies } from '../_libs/mockData';

// Mock data for reports
const revenueData = [
  { date: '01/12', revenue: 125000000, tickets: 1250, avgPrice: 100000 },
  { date: '02/12', revenue: 145000000, tickets: 1420, avgPrice: 102113 },
  { date: '03/12', revenue: 138000000, tickets: 1380, avgPrice: 100000 },
  { date: '04/12', revenue: 165000000, tickets: 1650, avgPrice: 100000 },
  { date: '05/12', revenue: 198000000, tickets: 1980, avgPrice: 100000 },
  { date: '06/12', revenue: 210000000, tickets: 2100, avgPrice: 100000 },
  { date: '07/12', revenue: 185000000, tickets: 1850, avgPrice: 100000 },
];

const revenueBySource = [
  { name: 'Website', value: 45, color: '#8b5cf6' },
  { name: 'Ứng Dụng Mobil', value: 35, color: '#06b6d4' },
  { name: 'Quầy Bán', value: 15, color: '#f59e0b' },
  { name: 'Đối Tác', value: 5, color: '#10b981' },
];

const moviePerformance = [
  { name: 'Oppenheimer', revenue: 450000000, tickets: 4500, rating: 4.8 },
  { name: 'Barbie', revenue: 380000000, tickets: 4200, rating: 4.5 },
  { name: 'The Conjuring', revenue: 320000000, tickets: 3800, rating: 4.2 },
  { name: 'Mission Impossible', revenue: 290000000, tickets: 2900, rating: 4.6 },
  { name: 'Spider-Man', revenue: 260000000, tickets: 3100, rating: 4.7 },
];

const genreBreakdown = [
  { genre: 'Hành Động', revenue: 520000000, percentage: 28 },
  { genre: 'Kinh Dị', revenue: 380000000, percentage: 20 },
  { genre: 'Chính Kịch', revenue: 340000000, percentage: 18 },
  { genre: 'Hài Kịch', revenue: 290000000, percentage: 15 },
  { genre: 'Khoa Học Viễn Tưởng', revenue: 220000000, percentage: 12 },
  { genre: 'Lãng Mạn', revenue: 130000000, percentage: 7 },
];

const cinemaPerformance = [
  { name: 'CGV Vincom', revenue: 580000000, occupancy: 78, shows: 245 },
  { name: 'Lotte Diamond', revenue: 420000000, occupancy: 72, shows: 198 },
  { name: 'Galaxy Nguyen Du', revenue: 380000000, occupancy: 68, shows: 187 },
  { name: 'BHD Star', revenue: 310000000, occupancy: 65, shows: 156 },
];

const hourlyDistribution = [
  { hour: '09:00', bookings: 45 },
  { hour: '10:00', bookings: 78 },
  { hour: '11:00', bookings: 95 },
  { hour: '12:00', bookings: 120 },
  { hour: '13:00', bookings: 145 },
  { hour: '14:00', bookings: 180 },
  { hour: '15:00', bookings: 165 },
  { hour: '16:00', bookings: 190 },
  { hour: '17:00', bookings: 220 },
  { hour: '18:00', bookings: 280 },
  { hour: '19:00', bookings: 320 },
  { hour: '20:00', bookings: 290 },
  { hour: '21:00', bookings: 210 },
  { hour: '22:00', bookings: 140 },
];

const customerSegments = [
  { segment: 'Khách Hàng Mới', count: 2450, percentage: 35 },
  { segment: 'Thường Xuyên', count: 2100, percentage: 30 },
  { segment: 'Hội Viên VIP', count: 1750, percentage: 25 },
  { segment: 'Không Hoạt Động (Quay Lại)', count: 700, percentage: 10 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#ec4899'];

export default function ReportsPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 11, 1),
    to: new Date(2024, 11, 7),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCinemas(mockCinemas);
    setMovies(mockMovies);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalTickets = revenueData.reduce((sum, d) => sum + d.tickets, 0);
  const avgOccupancy = 72;
  const revenueGrowth = 12.5;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            Báo Cáo & Phân Tích
          </h1>
          <p className="text-gray-500 mt-1">
            Thông tin chi tiết về hoạt động của rạp chiếu phim
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm Mới
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Tải Xuống
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn rạp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất Cả Rạp</SelectItem>
                  {cinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-64 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from && dateRange.to ? (
                      <>
                        {format(dateRange.from, 'dd/MM/yyyy')} -{' '}
                        {format(dateRange.to, 'dd/MM/yyyy')}
                      </>
                    ) : (
                      <span>Chọn khoảng thời gian</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +{revenueGrowth}% từ tuần trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vé Đã Bán</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalTickets)}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +8.2% từ tuần trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượng Lấp Đầy Trung Bình</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              -2.3% từ tuần trước
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phim Đang Chiếu</CardTitle>
            <Film className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movies.length}</div>
            <div className="flex items-center text-xs text-gray-500">
              Đang chiếu hiện tại
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Reports Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Doanh Thu</TabsTrigger>
          <TabsTrigger value="movies">Phim</TabsTrigger>
          <TabsTrigger value="cinemas">Rạp</TabsTrigger>
          <TabsTrigger value="customers">Khách Hàng</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Xu Hướng Doanh Thu</CardTitle>
                <CardDescription>Doanh thu hàng ngày trong khoảng thời gian đã chọn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Ngày: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doanh Thu Theo Nguồn</CardTitle>
                <CardDescription>Phân chia theo kênh đặt vé</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueBySource}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {revenueBySource.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hiệu Suất Thể Loại</CardTitle>
              <CardDescription>Phân chia doanh thu theo thể loại phim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genreBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <YAxis dataKey="genre" type="category" width={80} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Movies Tab */}
        <TabsContent value="movies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phim Có Hiệu Suất Tốt Nhất</CardTitle>
              <CardDescription>Xếp hạng theo doanh thu trong khoảng thời gian đã chọn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moviePerformance.map((movie, index) => (
                  <div
                    key={movie.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                            ? 'bg-gray-400'
                            : index === 2
                            ? 'bg-amber-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{movie.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatNumber(movie.tickets)} vé đã bán
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(movie.revenue)}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Badge variant="outline">⭐ {movie.rating}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cinemas Tab */}
        <TabsContent value="cinemas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu Suất Rạp</CardTitle>
                <CardDescription>Doanh thu và lượng lấp đầy theo vị trí</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cinemaPerformance.map((cinema) => (
                    <div
                      key={cinema.name}
                      className="p-4 rounded-lg border hover:border-purple-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{cinema.name}</h4>
                        <Badge className="bg-green-100 text-green-700">
                          {cinema.occupancy}% lấp đầy
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Doanh thu:</span>{' '}
                          <span className="font-medium">{formatCurrency(cinema.revenue)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Suất chiếu:</span>{' '}
                          <span className="font-medium">{cinema.shows}</span>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${cinema.occupancy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân Phối Đặt Vé Theo Giờ</CardTitle>
                <CardDescription>Phân tích giờ đặt vé cao điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phân Khúc Khách Hàng</CardTitle>
                <CardDescription>Phân chia theo loại khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="count"
                        label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                      >
                        {customerSegments.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chỉ Số Khách Hàng</CardTitle>
                <CardDescription>Số liệu thống kê khách hàng chính</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div
                      key={segment.segment}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{segment.segment}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatNumber(segment.count)}</div>
                        <div className="text-sm text-gray-500">{segment.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

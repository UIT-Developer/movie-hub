// Dashboard Mock Data - Comprehensive and Consistent Data Structure
// All entities are properly linked with foreign keys for realistic relationships

export interface DashboardCinema {
  id: string;
  name: string;
  location: string;
  totalHalls: number;
}

export interface DashboardHall {
  id: string;
  cinemaId: string;
  name: string;
  capacity: number;
}

export interface DashboardMovie {
  id: string;
  title: string;
  genre: string;
  releaseDate: string;
  posterUrl: string;
  rating: number;
}

export interface DashboardShowtime {
  id: string;
  movieId: string;
  hallId: string;
  cinemaId: string;
  date: string;
  time: string;
  bookedSeats: number;
  totalSeats: number;
}

export interface DashboardBooking {
  id: string;
  showtimeId: string;
  movieTitle: string;
  cinemaName: string;
  customerName: string;
  seats: number;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  bookingTime: string;
}

export interface DashboardReview {
  id: string;
  movieId: string;
  movieTitle: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DashboardRevenue {
  date: string;
  revenue: number;
  bookings: number;
}

export interface DashboardStats {
  totalMovies: number;
  totalCinemas: number;
  todayShowtimes: number;
  weekRevenue: number;
  monthRevenue: number;
  totalBookings: number;
  averageRating: number;
}

// ========== CINEMAS ==========
export const mockCinemas: DashboardCinema[] = [
  { id: 'cinema-1', name: 'CGV Vincom Center', location: 'Hà Nội', totalHalls: 8 },
  { id: 'cinema-2', name: 'Lotte Cinema Đống Đa', location: 'Hà Nội', totalHalls: 6 },
  { id: 'cinema-3', name: 'Galaxy Nguyễn Du', location: 'Hà Nội', totalHalls: 7 },
  { id: 'cinema-4', name: 'BHD Star Bitexco', location: 'TP.HCM', totalHalls: 9 },
  { id: 'cinema-5', name: 'CGV Crescent Mall', location: 'TP.HCM', totalHalls: 10 },
  { id: 'cinema-6', name: 'Lotte Cinema Cộng Hòa', location: 'TP.HCM', totalHalls: 7 },
  { id: 'cinema-7', name: 'Galaxy Nguyễn Trãi', location: 'TP.HCM', totalHalls: 8 },
  { id: 'cinema-8', name: 'CGV Vincom Mega Mall', location: 'Đà Nẵng', totalHalls: 6 },
  { id: 'cinema-9', name: 'Lotte Cinema Vincom', location: 'Đà Nẵng', totalHalls: 5 },
  { id: 'cinema-10', name: 'Galaxy Premium Hải Phòng', location: 'Hải Phòng', totalHalls: 6 },
  { id: 'cinema-11', name: 'CGV Aeon Mall Cần Thơ', location: 'Cần Thơ', totalHalls: 7 },
  { id: 'cinema-12', name: 'BHD Star Nha Trang', location: 'Nha Trang', totalHalls: 5 },
];

// ========== HALLS ==========
export const mockHalls: DashboardHall[] = [
  // CGV Vincom Center (8 halls)
  { id: 'hall-1', cinemaId: 'cinema-1', name: 'Hall 1', capacity: 120 },
  { id: 'hall-2', cinemaId: 'cinema-1', name: 'Hall 2', capacity: 150 },
  { id: 'hall-3', cinemaId: 'cinema-1', name: 'Hall 3 IMAX', capacity: 200 },
  { id: 'hall-4', cinemaId: 'cinema-1', name: 'Hall 4', capacity: 100 },
  { id: 'hall-5', cinemaId: 'cinema-1', name: 'Hall 5', capacity: 130 },
  { id: 'hall-6', cinemaId: 'cinema-1', name: 'Hall 6 VIP', capacity: 80 },
  { id: 'hall-7', cinemaId: 'cinema-1', name: 'Hall 7', capacity: 110 },
  { id: 'hall-8', cinemaId: 'cinema-1', name: 'Hall 8', capacity: 140 },
  
  // Lotte Cinema Đống Đa (6 halls)
  { id: 'hall-9', cinemaId: 'cinema-2', name: 'Hall 1', capacity: 160 },
  { id: 'hall-10', cinemaId: 'cinema-2', name: 'Hall 2', capacity: 120 },
  { id: 'hall-11', cinemaId: 'cinema-2', name: 'Hall 3', capacity: 140 },
  { id: 'hall-12', cinemaId: 'cinema-2', name: 'Hall 4 4DX', capacity: 90 },
  { id: 'hall-13', cinemaId: 'cinema-2', name: 'Hall 5', capacity: 130 },
  { id: 'hall-14', cinemaId: 'cinema-2', name: 'Hall 6', capacity: 110 },
  
  // Galaxy Nguyễn Du (7 halls)
  { id: 'hall-15', cinemaId: 'cinema-3', name: 'Hall 1', capacity: 180 },
  { id: 'hall-16', cinemaId: 'cinema-3', name: 'Hall 2', capacity: 150 },
  { id: 'hall-17', cinemaId: 'cinema-3', name: 'Hall 3', capacity: 120 },
  { id: 'hall-18', cinemaId: 'cinema-3', name: 'Hall 4 VIP', capacity: 70 },
  { id: 'hall-19', cinemaId: 'cinema-3', name: 'Hall 5', capacity: 140 },
  { id: 'hall-20', cinemaId: 'cinema-3', name: 'Hall 6', capacity: 130 },
  { id: 'hall-21', cinemaId: 'cinema-3', name: 'Hall 7', capacity: 100 },
  
  // BHD Star Bitexco (9 halls)
  { id: 'hall-22', cinemaId: 'cinema-4', name: 'Hall 1', capacity: 200 },
  { id: 'hall-23', cinemaId: 'cinema-4', name: 'Hall 2', capacity: 180 },
  { id: 'hall-24', cinemaId: 'cinema-4', name: 'Hall 3', capacity: 160 },
  { id: 'hall-25', cinemaId: 'cinema-4', name: 'Hall 4 Gold Class', capacity: 50 },
  { id: 'hall-26', cinemaId: 'cinema-4', name: 'Hall 5', capacity: 140 },
  { id: 'hall-27', cinemaId: 'cinema-4', name: 'Hall 6', capacity: 150 },
  { id: 'hall-28', cinemaId: 'cinema-4', name: 'Hall 7', capacity: 130 },
  { id: 'hall-29', cinemaId: 'cinema-4', name: 'Hall 8', capacity: 120 },
  { id: 'hall-30', cinemaId: 'cinema-4', name: 'Hall 9 IMAX', capacity: 250 },
  
  // CGV Crescent Mall (10 halls)
  { id: 'hall-31', cinemaId: 'cinema-5', name: 'Hall 1', capacity: 170 },
  { id: 'hall-32', cinemaId: 'cinema-5', name: 'Hall 2', capacity: 160 },
  { id: 'hall-33', cinemaId: 'cinema-5', name: 'Hall 3', capacity: 150 },
  { id: 'hall-34', cinemaId: 'cinema-5', name: 'Hall 4', capacity: 140 },
  { id: 'hall-35', cinemaId: 'cinema-5', name: 'Hall 5 VIP', capacity: 80 },
  { id: 'hall-36', cinemaId: 'cinema-5', name: 'Hall 6', capacity: 130 },
  { id: 'hall-37', cinemaId: 'cinema-5', name: 'Hall 7', capacity: 120 },
  { id: 'hall-38', cinemaId: 'cinema-5', name: 'Hall 8 IMAX', capacity: 220 },
  { id: 'hall-39', cinemaId: 'cinema-5', name: 'Hall 9', capacity: 110 },
  { id: 'hall-40', cinemaId: 'cinema-5', name: 'Hall 10', capacity: 100 },
  
  // Other cinemas (simplified - 5-8 halls each)
  { id: 'hall-41', cinemaId: 'cinema-6', name: 'Hall 1', capacity: 150 },
  { id: 'hall-42', cinemaId: 'cinema-6', name: 'Hall 2', capacity: 140 },
  { id: 'hall-43', cinemaId: 'cinema-6', name: 'Hall 3', capacity: 130 },
  { id: 'hall-44', cinemaId: 'cinema-6', name: 'Hall 4', capacity: 120 },
  { id: 'hall-45', cinemaId: 'cinema-6', name: 'Hall 5', capacity: 110 },
  { id: 'hall-46', cinemaId: 'cinema-6', name: 'Hall 6', capacity: 160 },
  { id: 'hall-47', cinemaId: 'cinema-6', name: 'Hall 7 VIP', capacity: 70 },
  
  { id: 'hall-48', cinemaId: 'cinema-7', name: 'Hall 1', capacity: 180 },
  { id: 'hall-49', cinemaId: 'cinema-7', name: 'Hall 2', capacity: 150 },
  { id: 'hall-50', cinemaId: 'cinema-7', name: 'Hall 3', capacity: 140 },
  { id: 'hall-51', cinemaId: 'cinema-7', name: 'Hall 4', capacity: 130 },
  { id: 'hall-52', cinemaId: 'cinema-7', name: 'Hall 5', capacity: 120 },
  { id: 'hall-53', cinemaId: 'cinema-7', name: 'Hall 6', capacity: 100 },
  { id: 'hall-54', cinemaId: 'cinema-7', name: 'Hall 7 IMAX', capacity: 200 },
  { id: 'hall-55', cinemaId: 'cinema-7', name: 'Hall 8', capacity: 110 },
];

// ========== MOVIES ==========
export const mockMovies: DashboardMovie[] = [
  { id: 'movie-1', title: 'Oppenheimer', genre: 'Biography', releaseDate: '2024-11-15', posterUrl: '/movies/oppenheimer.jpg', rating: 4.8 },
  { id: 'movie-2', title: 'Barbie', genre: 'Comedy', releaseDate: '2024-11-20', posterUrl: '/movies/barbie.jpg', rating: 4.5 },
  { id: 'movie-3', title: 'Dune: Part Two', genre: 'Sci-Fi', releaseDate: '2024-12-01', posterUrl: '/movies/dune2.jpg', rating: 4.7 },
  { id: 'movie-4', title: 'Killers of the Flower Moon', genre: 'Crime', releaseDate: '2024-10-25', posterUrl: '/movies/killers.jpg', rating: 4.6 },
  { id: 'movie-5', title: 'The Marvels', genre: 'Action', releaseDate: '2024-11-10', posterUrl: '/movies/marvels.jpg', rating: 4.2 },
  { id: 'movie-6', title: 'Napoleon', genre: 'Historical', releaseDate: '2024-11-22', posterUrl: '/movies/napoleon.jpg', rating: 4.3 },
  { id: 'movie-7', title: 'Wonka', genre: 'Fantasy', releaseDate: '2024-12-15', posterUrl: '/movies/wonka.jpg', rating: 4.4 },
  { id: 'movie-8', title: 'Aquaman 2', genre: 'Action', releaseDate: '2024-12-20', posterUrl: '/movies/aquaman2.jpg', rating: 4.1 },
  { id: 'movie-9', title: 'The Hunger Games: Ballad', genre: 'Adventure', releaseDate: '2024-11-17', posterUrl: '/movies/hungergames.jpg', rating: 4.3 },
  { id: 'movie-10', title: 'Poor Things', genre: 'Drama', releaseDate: '2024-12-08', posterUrl: '/movies/poorthings.jpg', rating: 4.5 },
  { id: 'movie-11', title: 'Maestro', genre: 'Biography', releaseDate: '2024-12-20', posterUrl: '/movies/maestro.jpg', rating: 4.4 },
  { id: 'movie-12', title: 'Next Goal Wins', genre: 'Sports', releaseDate: '2024-12-22', posterUrl: '/movies/nextgoal.jpg', rating: 4.0 },
  { id: 'movie-13', title: 'Rebel Moon', genre: 'Sci-Fi', releaseDate: '2024-12-22', posterUrl: '/movies/rebelmoon.jpg', rating: 4.2 },
  { id: 'movie-14', title: 'The Boys in the Boat', genre: 'Drama', releaseDate: '2024-12-25', posterUrl: '/movies/boys.jpg', rating: 4.3 },
  { id: 'movie-15', title: 'Migration', genre: 'Animation', releaseDate: '2024-12-22', posterUrl: '/movies/migration.jpg', rating: 4.5 },
];

// ========== SHOWTIMES (Today: Dec 2, 2025) ==========
const today = '2025-12-02';
export const mockShowtimes: DashboardShowtime[] = [
  // Oppenheimer (movie-1) - 10 showtimes across cinemas
  { id: 'show-1', movieId: 'movie-1', hallId: 'hall-1', cinemaId: 'cinema-1', date: today, time: '10:00', bookedSeats: 95, totalSeats: 120 },
  { id: 'show-2', movieId: 'movie-1', hallId: 'hall-2', cinemaId: 'cinema-1', date: today, time: '14:30', bookedSeats: 120, totalSeats: 150 },
  { id: 'show-3', movieId: 'movie-1', hallId: 'hall-3', cinemaId: 'cinema-1', date: today, time: '19:00', bookedSeats: 180, totalSeats: 200 },
  { id: 'show-4', movieId: 'movie-1', hallId: 'hall-9', cinemaId: 'cinema-2', date: today, time: '11:00', bookedSeats: 140, totalSeats: 160 },
  { id: 'show-5', movieId: 'movie-1', hallId: 'hall-15', cinemaId: 'cinema-3', date: today, time: '15:30', bookedSeats: 150, totalSeats: 180 },
  { id: 'show-6', movieId: 'movie-1', hallId: 'hall-22', cinemaId: 'cinema-4', date: today, time: '20:00', bookedSeats: 190, totalSeats: 200 },
  { id: 'show-7', movieId: 'movie-1', hallId: 'hall-31', cinemaId: 'cinema-5', date: today, time: '12:00', bookedSeats: 130, totalSeats: 170 },
  { id: 'show-8', movieId: 'movie-1', hallId: 'hall-41', cinemaId: 'cinema-6', date: today, time: '16:00', bookedSeats: 110, totalSeats: 150 },
  { id: 'show-9', movieId: 'movie-1', hallId: 'hall-48', cinemaId: 'cinema-7', date: today, time: '18:30', bookedSeats: 160, totalSeats: 180 },
  { id: 'show-10', movieId: 'movie-1', hallId: 'hall-3', cinemaId: 'cinema-1', date: today, time: '22:00', bookedSeats: 150, totalSeats: 200 },
  
  // Barbie (movie-2) - 8 showtimes
  { id: 'show-11', movieId: 'movie-2', hallId: 'hall-4', cinemaId: 'cinema-1', date: today, time: '10:30', bookedSeats: 80, totalSeats: 100 },
  { id: 'show-12', movieId: 'movie-2', hallId: 'hall-5', cinemaId: 'cinema-1', date: today, time: '13:00', bookedSeats: 100, totalSeats: 130 },
  { id: 'show-13', movieId: 'movie-2', hallId: 'hall-10', cinemaId: 'cinema-2', date: today, time: '15:00', bookedSeats: 90, totalSeats: 120 },
  { id: 'show-14', movieId: 'movie-2', hallId: 'hall-16', cinemaId: 'cinema-3', date: today, time: '17:30', bookedSeats: 130, totalSeats: 150 },
  { id: 'show-15', movieId: 'movie-2', hallId: 'hall-23', cinemaId: 'cinema-4', date: today, time: '19:30', bookedSeats: 170, totalSeats: 180 },
  { id: 'show-16', movieId: 'movie-2', hallId: 'hall-32', cinemaId: 'cinema-5', date: today, time: '14:00', bookedSeats: 140, totalSeats: 160 },
  { id: 'show-17', movieId: 'movie-2', hallId: 'hall-42', cinemaId: 'cinema-6', date: today, time: '20:30', bookedSeats: 120, totalSeats: 140 },
  { id: 'show-18', movieId: 'movie-2', hallId: 'hall-49', cinemaId: 'cinema-7', date: today, time: '21:00', bookedSeats: 130, totalSeats: 150 },
  
  // Dune: Part Two (movie-3) - 7 showtimes
  { id: 'show-19', movieId: 'movie-3', hallId: 'hall-7', cinemaId: 'cinema-1', date: today, time: '11:30', bookedSeats: 90, totalSeats: 110 },
  { id: 'show-20', movieId: 'movie-3', hallId: 'hall-8', cinemaId: 'cinema-1', date: today, time: '16:00', bookedSeats: 120, totalSeats: 140 },
  { id: 'show-21', movieId: 'movie-3', hallId: 'hall-11', cinemaId: 'cinema-2', date: today, time: '18:00', bookedSeats: 130, totalSeats: 140 },
  { id: 'show-22', movieId: 'movie-3', hallId: 'hall-17', cinemaId: 'cinema-3', date: today, time: '20:00', bookedSeats: 110, totalSeats: 120 },
  { id: 'show-23', movieId: 'movie-3', hallId: 'hall-24', cinemaId: 'cinema-4', date: today, time: '21:30', bookedSeats: 150, totalSeats: 160 },
  { id: 'show-24', movieId: 'movie-3', hallId: 'hall-33', cinemaId: 'cinema-5', date: today, time: '17:00', bookedSeats: 140, totalSeats: 150 },
  { id: 'show-25', movieId: 'movie-3', hallId: 'hall-50', cinemaId: 'cinema-7', date: today, time: '19:30', bookedSeats: 130, totalSeats: 140 },
  
  // The Marvels (movie-5) - 6 showtimes
  { id: 'show-26', movieId: 'movie-5', hallId: 'hall-12', cinemaId: 'cinema-2', date: today, time: '12:30', bookedSeats: 70, totalSeats: 90 },
  { id: 'show-27', movieId: 'movie-5', hallId: 'hall-18', cinemaId: 'cinema-3', date: today, time: '14:30', bookedSeats: 60, totalSeats: 70 },
  { id: 'show-28', movieId: 'movie-5', hallId: 'hall-25', cinemaId: 'cinema-4', date: today, time: '16:30', bookedSeats: 45, totalSeats: 50 },
  { id: 'show-29', movieId: 'movie-5', hallId: 'hall-34', cinemaId: 'cinema-5', date: today, time: '18:00', bookedSeats: 120, totalSeats: 140 },
  { id: 'show-30', movieId: 'movie-5', hallId: 'hall-43', cinemaId: 'cinema-6', date: today, time: '20:00', bookedSeats: 110, totalSeats: 130 },
  { id: 'show-31', movieId: 'movie-5', hallId: 'hall-51', cinemaId: 'cinema-7', date: today, time: '22:00', bookedSeats: 100, totalSeats: 130 },
  
  // Napoleon (movie-6) - 5 showtimes
  { id: 'show-32', movieId: 'movie-6', hallId: 'hall-13', cinemaId: 'cinema-2', date: today, time: '10:00', bookedSeats: 100, totalSeats: 130 },
  { id: 'show-33', movieId: 'movie-6', hallId: 'hall-19', cinemaId: 'cinema-3', date: today, time: '13:30', bookedSeats: 120, totalSeats: 140 },
  { id: 'show-34', movieId: 'movie-6', hallId: 'hall-26', cinemaId: 'cinema-4', date: today, time: '15:00', bookedSeats: 130, totalSeats: 140 },
  { id: 'show-35', movieId: 'movie-6', hallId: 'hall-35', cinemaId: 'cinema-5', date: today, time: '19:00', bookedSeats: 70, totalSeats: 80 },
  { id: 'show-36', movieId: 'movie-6', hallId: 'hall-44', cinemaId: 'cinema-6', date: today, time: '21:30', bookedSeats: 100, totalSeats: 120 },
  
  // Wonka (movie-7) - 4 showtimes
  { id: 'show-37', movieId: 'movie-7', hallId: 'hall-14', cinemaId: 'cinema-2', date: today, time: '11:00', bookedSeats: 90, totalSeats: 110 },
  { id: 'show-38', movieId: 'movie-7', hallId: 'hall-20', cinemaId: 'cinema-3', date: today, time: '16:30', bookedSeats: 110, totalSeats: 130 },
  { id: 'show-39', movieId: 'movie-7', hallId: 'hall-36', cinemaId: 'cinema-5', date: today, time: '20:00', bookedSeats: 100, totalSeats: 130 },
  { id: 'show-40', movieId: 'movie-7', hallId: 'hall-52', cinemaId: 'cinema-7', date: today, time: '22:30', bookedSeats: 90, totalSeats: 120 },
  
  // The Hunger Games (movie-9) - 4 showtimes
  { id: 'show-41', movieId: 'movie-9', hallId: 'hall-21', cinemaId: 'cinema-3', date: today, time: '12:00', bookedSeats: 80, totalSeats: 100 },
  { id: 'show-42', movieId: 'movie-9', hallId: 'hall-27', cinemaId: 'cinema-4', date: today, time: '17:00', bookedSeats: 110, totalSeats: 130 },
  { id: 'show-43', movieId: 'movie-9', hallId: 'hall-37', cinemaId: 'cinema-5', date: today, time: '21:00', bookedSeats: 100, totalSeats: 120 },
  { id: 'show-44', movieId: 'movie-9', hallId: 'hall-45', cinemaId: 'cinema-6', date: today, time: '19:00', bookedSeats: 90, totalSeats: 110 },
  
  // Poor Things (movie-10) - 3 showtimes
  { id: 'show-45', movieId: 'movie-10', hallId: 'hall-28', cinemaId: 'cinema-4', date: today, time: '14:00', bookedSeats: 100, totalSeats: 120 },
  { id: 'show-46', movieId: 'movie-10', hallId: 'hall-38', cinemaId: 'cinema-5', date: today, time: '22:00', bookedSeats: 200, totalSeats: 220 },
  { id: 'show-47', movieId: 'movie-10', hallId: 'hall-53', cinemaId: 'cinema-7', date: today, time: '15:30', bookedSeats: 180, totalSeats: 200 },
  
  // Migration (movie-15) - 2 showtimes
  { id: 'show-48', movieId: 'movie-15', hallId: 'hall-39', cinemaId: 'cinema-5', date: today, time: '10:00', bookedSeats: 90, totalSeats: 110 },
];

// ========== BOOKINGS (Recent 30 days) ==========
export const mockBookings: DashboardBooking[] = [
  // Today's bookings
  { id: 'book-1', showtimeId: 'show-1', movieTitle: 'Oppenheimer', cinemaName: 'CGV Vincom Center', customerName: 'Nguyễn Văn A', seats: 2, totalPrice: 240000, status: 'CONFIRMED', bookingTime: '2025-12-02T08:30:00' },
  { id: 'book-2', showtimeId: 'show-2', movieTitle: 'Oppenheimer', cinemaName: 'CGV Vincom Center', customerName: 'Trần Thị B', seats: 4, totalPrice: 480000, status: 'CONFIRMED', bookingTime: '2025-12-02T09:15:00' },
  { id: 'book-3', showtimeId: 'show-11', movieTitle: 'Barbie', cinemaName: 'CGV Vincom Center', customerName: 'Lê Hoàng C', seats: 2, totalPrice: 200000, status: 'CONFIRMED', bookingTime: '2025-12-02T10:00:00' },
  { id: 'book-4', showtimeId: 'show-15', movieTitle: 'Barbie', cinemaName: 'BHD Star Bitexco', customerName: 'Phạm Minh D', seats: 3, totalPrice: 360000, status: 'PENDING', bookingTime: '2025-12-02T11:30:00' },
  { id: 'book-5', showtimeId: 'show-3', movieTitle: 'Oppenheimer', cinemaName: 'CGV Vincom Center', customerName: 'Vũ Thị E', seats: 2, totalPrice: 300000, status: 'CONFIRMED', bookingTime: '2025-12-02T12:00:00' },
  
  // Yesterday (Dec 1)
  { id: 'book-6', showtimeId: 'show-4', movieTitle: 'Oppenheimer', cinemaName: 'Lotte Cinema Đống Đa', customerName: 'Hoàng Văn F', seats: 5, totalPrice: 600000, status: 'CONFIRMED', bookingTime: '2025-12-01T14:20:00' },
  { id: 'book-7', showtimeId: 'show-12', movieTitle: 'Barbie', cinemaName: 'CGV Vincom Center', customerName: 'Đặng Thị G', seats: 2, totalPrice: 200000, status: 'CONFIRMED', bookingTime: '2025-12-01T15:45:00' },
  { id: 'book-8', showtimeId: 'show-19', movieTitle: 'Dune: Part Two', cinemaName: 'CGV Vincom Center', customerName: 'Bùi Minh H', seats: 3, totalPrice: 390000, status: 'CANCELLED', bookingTime: '2025-12-01T16:30:00' },
  
  // Nov 30
  { id: 'book-9', showtimeId: 'show-6', movieTitle: 'Oppenheimer', cinemaName: 'BHD Star Bitexco', customerName: 'Ngô Thị I', seats: 4, totalPrice: 520000, status: 'CONFIRMED', bookingTime: '2025-11-30T10:00:00' },
  { id: 'book-10', showtimeId: 'show-20', movieTitle: 'Dune: Part Two', cinemaName: 'CGV Vincom Center', customerName: 'Lý Văn K', seats: 2, totalPrice: 260000, status: 'CONFIRMED', bookingTime: '2025-11-30T13:30:00' },
  
  // Nov 29
  { id: 'book-11', showtimeId: 'show-13', movieTitle: 'Barbie', cinemaName: 'Lotte Cinema Đống Đa', customerName: 'Đinh Thị L', seats: 3, totalPrice: 300000, status: 'CONFIRMED', bookingTime: '2025-11-29T11:00:00' },
  { id: 'book-12', showtimeId: 'show-26', movieTitle: 'The Marvels', cinemaName: 'Lotte Cinema Đống Đa', customerName: 'Trịnh Minh M', seats: 2, totalPrice: 220000, status: 'CONFIRMED', bookingTime: '2025-11-29T14:20:00' },
  
  // Nov 28
  { id: 'book-13', showtimeId: 'show-32', movieTitle: 'Napoleon', cinemaName: 'Lotte Cinema Đống Đa', customerName: 'Mai Văn N', seats: 4, totalPrice: 480000, status: 'CONFIRMED', bookingTime: '2025-11-28T09:30:00' },
  { id: 'book-14', showtimeId: 'show-37', movieTitle: 'Wonka', cinemaName: 'Lotte Cinema Đống Đa', customerName: 'Dương Thị O', seats: 2, totalPrice: 220000, status: 'CONFIRMED', bookingTime: '2025-11-28T12:00:00' },
  
  // Nov 27
  { id: 'book-15', showtimeId: 'show-7', movieTitle: 'Oppenheimer', cinemaName: 'CGV Crescent Mall', customerName: 'Phan Minh P', seats: 6, totalPrice: 780000, status: 'CONFIRMED', bookingTime: '2025-11-27T15:40:00' },
];

// ========== REVIEWS (Recent 20) ==========
export const mockReviews: DashboardReview[] = [
  { id: 'review-1', movieId: 'movie-1', movieTitle: 'Oppenheimer', customerName: 'Nguyễn Văn A', rating: 5, comment: 'Phim hay tuyệt vời! Diễn xuất xuất sắc, kịch bản chặt chẽ.', createdAt: '2025-12-02T10:30:00' },
  { id: 'review-2', movieId: 'movie-2', movieTitle: 'Barbie', customerName: 'Trần Thị B', rating: 4, comment: 'Phim vui, màu sắc đẹp. Phù hợp cả gia đình.', createdAt: '2025-12-02T11:15:00' },
  { id: 'review-3', movieId: 'movie-3', movieTitle: 'Dune: Part Two', customerName: 'Lê Hoàng C', rating: 5, comment: 'Hình ảnh hoành tráng, âm thanh sống động. Must watch!', createdAt: '2025-12-01T14:20:00' },
  { id: 'review-4', movieId: 'movie-1', movieTitle: 'Oppenheimer', customerName: 'Phạm Minh D', rating: 5, comment: 'Masterpiece! Nolan đỉnh như mọi khi.', createdAt: '2025-12-01T16:45:00' },
  { id: 'review-5', movieId: 'movie-5', movieTitle: 'The Marvels', customerName: 'Vũ Thị E', rating: 4, comment: 'Hành động mãn nhãn, CGI đẹp.', createdAt: '2025-11-30T12:00:00' },
  { id: 'review-6', movieId: 'movie-6', movieTitle: 'Napoleon', customerName: 'Hoàng Văn F', rating: 4, comment: 'Phim hay, tái hiện lịch sử chính xác.', createdAt: '2025-11-30T15:30:00' },
  { id: 'review-7', movieId: 'movie-7', movieTitle: 'Wonka', customerName: 'Đặng Thị G', rating: 5, comment: 'Phim gia đình lý tưởng, nhạc hay, diễn xuất tốt.', createdAt: '2025-11-29T10:00:00' },
  { id: 'review-8', movieId: 'movie-2', movieTitle: 'Barbie', customerName: 'Bùi Minh H', rating: 4, comment: 'Thông điệp hay, phù hợp mọi lứa tuổi.', createdAt: '2025-11-29T13:20:00' },
  { id: 'review-9', movieId: 'movie-9', movieTitle: 'The Hunger Games: Ballad', customerName: 'Ngô Thị I', rating: 4, comment: 'Kịch bản hấp dẫn, diễn viên mới tài năng.', createdAt: '2025-11-28T11:45:00' },
  { id: 'review-10', movieId: 'movie-10', movieTitle: 'Poor Things', customerName: 'Lý Văn K', rating: 5, comment: 'Phim nghệ thuật đỉnh cao, đạo diễn tài ba.', createdAt: '2025-11-28T14:00:00' },
  { id: 'review-11', movieId: 'movie-3', movieTitle: 'Dune: Part Two', customerName: 'Đinh Thị L', rating: 5, comment: 'Phần 2 hay hơn phần 1, cảnh sa mạc tuyệt đẹp.', createdAt: '2025-11-27T16:30:00' },
  { id: 'review-12', movieId: 'movie-1', movieTitle: 'Oppenheimer', customerName: 'Trịnh Minh M', rating: 5, comment: 'Cillian Murphy diễn xuất thần sầu!', createdAt: '2025-11-27T18:00:00' },
  { id: 'review-13', movieId: 'movie-15', movieTitle: 'Migration', customerName: 'Mai Văn N', rating: 4, comment: 'Phim hoạt hình vui nhộn, con trẻ rất thích.', createdAt: '2025-11-26T10:15:00' },
  { id: 'review-14', movieId: 'movie-6', movieTitle: 'Napoleon', customerName: 'Dương Thị O', rating: 4, comment: 'Joaquin Phoenix diễn rất hay!', createdAt: '2025-11-26T12:30:00' },
  { id: 'review-15', movieId: 'movie-5', movieTitle: 'The Marvels', customerName: 'Phan Minh P', rating: 3, comment: 'Phim ổn nhưng chưa đột phá lắm.', createdAt: '2025-11-25T14:45:00' },
  { id: 'review-16', movieId: 'movie-7', movieTitle: 'Wonka', customerName: 'Võ Thị Q', rating: 5, comment: 'Timothée Chalamet quá xuất sắc trong vai Willy Wonka!', createdAt: '2025-11-25T16:00:00' },
  { id: 'review-17', movieId: 'movie-2', movieTitle: 'Barbie', customerName: 'Đỗ Văn R', rating: 5, comment: 'Margot Robbie và Ryan Gosling chemistry tuyệt vời.', createdAt: '2025-11-24T11:20:00' },
  { id: 'review-18', movieId: 'movie-9', movieTitle: 'The Hunger Games: Ballad', customerName: 'Lưu Thị S', rating: 4, comment: 'Prequel hay, giải thích nguồn gốc President Snow.', createdAt: '2025-11-24T13:40:00' },
  { id: 'review-19', movieId: 'movie-10', movieTitle: 'Poor Things', customerName: 'Hồ Minh T', rating: 5, comment: 'Emma Stone xứng đáng Oscar cho vai này!', createdAt: '2025-11-23T15:30:00' },
  { id: 'review-20', movieId: 'movie-3', movieTitle: 'Dune: Part Two', customerName: 'Cao Văn U', rating: 5, comment: 'Phim epic nhất năm, IMAX experience tuyệt vời!', createdAt: '2025-11-23T17:50:00' },
];

// ========== REVENUE (Last 7 days) ==========
export const mockRevenue: DashboardRevenue[] = [
  { date: '2025-11-26', revenue: 15800000, bookings: 142 },
  { date: '2025-11-27', revenue: 18200000, bookings: 168 },
  { date: '2025-11-28', revenue: 16500000, bookings: 155 },
  { date: '2025-11-29', revenue: 19800000, bookings: 180 },
  { date: '2025-11-30', revenue: 22400000, bookings: 205 }, // Weekend
  { date: '2025-12-01', revenue: 24600000, bookings: 228 }, // Weekend
  { date: '2025-12-02', revenue: 17200000, bookings: 162 }, // Today
];

// ========== DASHBOARD STATS ==========
export const mockDashboardStats: DashboardStats = {
  totalMovies: mockMovies.length,
  totalCinemas: mockCinemas.length,
  todayShowtimes: mockShowtimes.length,
  weekRevenue: mockRevenue.reduce((sum, day) => sum + day.revenue, 0),
  monthRevenue: 485000000, // Approximate for 30 days
  totalBookings: mockBookings.filter(b => b.status !== 'CANCELLED').length,
  averageRating: mockMovies.reduce((sum, movie) => sum + movie.rating, 0) / mockMovies.length,
};

// ========== TOP MOVIES BY BOOKINGS (TODAY ONLY) ==========
export const getTopMoviesByBookings = () => {
  const today = '2025-12-02';
  const todayShowtimes = mockShowtimes.filter(s => s.date === today);
  
  const movieBookings = todayShowtimes.reduce((acc, showtime) => {
    const movie = mockMovies.find(m => m.id === showtime.movieId);
    if (!movie) return acc;
    
    if (!acc[movie.id]) {
      acc[movie.id] = {
        movieId: movie.id,
        title: movie.title,
        totalBookings: 0,
        totalRevenue: 0,
        posterUrl: movie.posterUrl,
      };
    }
    
    acc[movie.id].totalBookings += showtime.bookedSeats;
    acc[movie.id].totalRevenue += showtime.bookedSeats * 120000; // Average ticket price
    
    return acc;
  }, {} as Record<string, { movieId: string; title: string; totalBookings: number; totalRevenue: number; posterUrl: string }>);
  
  return Object.values(movieBookings)
    .sort((a, b) => b.totalBookings - a.totalBookings)
    .slice(0, 5);
};

// ========== TOP CINEMAS BY REVENUE (TODAY ONLY) ==========
export const getTopCinemasByRevenue = () => {
  const today = '2025-12-02';
  const todayShowtimes = mockShowtimes.filter(s => s.date === today);
  
  const cinemaRevenue = todayShowtimes.reduce((acc, showtime) => {
    const cinema = mockCinemas.find(c => c.id === showtime.cinemaId);
    if (!cinema) return acc;
    
    if (!acc[cinema.id]) {
      acc[cinema.id] = {
        cinemaId: cinema.id,
        name: cinema.name,
        location: cinema.location,
        totalBookings: 0,
        totalRevenue: 0,
      };
    }
    
    acc[cinema.id].totalBookings += showtime.bookedSeats;
    acc[cinema.id].totalRevenue += showtime.bookedSeats * 120000; // Average ticket price
    
    return acc;
  }, {} as Record<string, { cinemaId: string; name: string; location: string; totalBookings: number; totalRevenue: number }>);
  
  return Object.values(cinemaRevenue)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);
};

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto, BookingStatus, PaymentStatus } from '@movie-hub/shared-types';
import { of, throwError } from 'rxjs';

describe('BookingService', () => {
  let service: BookingService;
  let prismaService: PrismaService;
  let cinemaClient: { send: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: PrismaService,
          useValue: {
            bookings: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: 'CINEMA_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    prismaService = module.get<PrismaService>(PrismaService);
    cinemaClient = module.get('CINEMA_SERVICE');
  });

  describe('getSeatsHeldByUser', () => {
    it('should return list of seats held by user', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';
      const heldSeats = ['A1', 'A2', 'A3'];

      // Mock cinema service response
      cinemaClient.send.mockReturnValue(of(heldSeats));

      const result = await service['getSeatsHeldByUser'](showtimeId, userId);

      expect(result).toEqual(heldSeats);
      expect(cinemaClient.send).toHaveBeenCalledWith(
        'showtime.get_seats_held_by_user',
        { showtimeId, userId }
      );
    });

    it('should throw BadRequestException when cinema service fails', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';

      cinemaClient.send.mockReturnValue(
        throwError(new Error('Cinema service error'))
      );

      await expect(
        service['getSeatsHeldByUser'](showtimeId, userId)
      ).rejects.toThrow(BadRequestException);

      await expect(
        service['getSeatsHeldByUser'](showtimeId, userId)
      ).rejects.toThrow('Failed to get held seats from cinema service');
    });
  });

  describe('createBooking', () => {
    it('should create booking with held seats from cinema service', async () => {
      const userId = 'user-1';
      const dto: CreateBookingDto = {
        showtimeId: 'showtime-1',
        seats: [], // Seats from DTO are ignored now
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '0123456789',
        },
      };

      const heldSeats = ['A1', 'A2']; // Seats returned from cinema service
      const mockBooking = {
        id: 'booking-1',
        booking_code: 'BK123456',
        user_id: userId,
        showtime_id: dto.showtimeId,
        customer_name: dto.customerInfo.name,
        customer_email: dto.customerInfo.email,
        customer_phone: dto.customerInfo.phone,
        subtotal: 200000,
        discount: 0,
        points_used: 0,
        points_discount: 0,
        final_amount: 200000,
        promotion_code: null,
        status: BookingStatus.PENDING,
        payment_status: PaymentStatus.PENDING,
        expires_at: new Date(),
        tickets: [
          { id: 'ticket-1', seat_id: 'A1', ticket_code: 'TK123', ticket_type: 'STANDARD', price: 100000 },
          { id: 'ticket-2', seat_id: 'A2', ticket_code: 'TK124', ticket_type: 'STANDARD', price: 100000 },
        ],
        booking_concessions: [],
        created_at: new Date(),
        updated_at: new Date(),
        cancelled_at: null,
        cancellation_reason: null,
      };

      // Mock cinema service response
      cinemaClient.send.mockReturnValue(of(heldSeats));

      // Mock prisma booking creation
      (prismaService.bookings.create as jest.Mock).mockResolvedValue(mockBooking);

      const result = await service.createBooking(userId, dto);

      expect(result).toBeDefined();
      expect(result.bookingCode).toBe('BK123456');
      expect(result.status).toBe(BookingStatus.PENDING);
      expect(result.seats).toHaveLength(2);
      expect(result.seats[0].seatId).toBe('A1');
      expect(result.seats[1].seatId).toBe('A2');

      // Verify cinema service was called to get held seats
      expect(cinemaClient.send).toHaveBeenCalledWith(
        'showtime.get_seats_held_by_user',
        { showtimeId: dto.showtimeId, userId }
      );
    });

    it('should throw error when no seats are held by user', async () => {
      const userId = 'user-1';
      const dto: CreateBookingDto = {
        showtimeId: 'showtime-1',
        seats: [],
      };

      // Mock cinema service response with no held seats
      cinemaClient.send.mockReturnValue(of([]));

      await expect(service.createBooking(userId, dto)).rejects.toThrow(
        BadRequestException
      );

      await expect(service.createBooking(userId, dto)).rejects.toThrow(
        'No seats are currently held by this user'
      );

      // Verify prisma.bookings.create was NOT called
      expect(prismaService.bookings.create).not.toHaveBeenCalled();
    });

    it('should throw error when cinema service fails', async () => {
      const userId = 'user-1';
      const dto: CreateBookingDto = {
        showtimeId: 'showtime-1',
        seats: [],
      };

      // Mock cinema service failure
      cinemaClient.send.mockReturnValue(
        throwError(new Error('Cinema service error'))
      );

      await expect(service.createBooking(userId, dto)).rejects.toThrow(
        BadRequestException
      );

      await expect(service.createBooking(userId, dto)).rejects.toThrow(
        'Failed to get held seats from cinema service'
      );

      // Verify prisma.bookings.create was NOT called
      expect(prismaService.bookings.create).not.toHaveBeenCalled();
    });
  });
});

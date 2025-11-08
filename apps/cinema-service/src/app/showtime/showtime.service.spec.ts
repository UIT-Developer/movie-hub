import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { PrismaService } from '../prisma.service';
import { RealtimeService } from '../realtime/realtime.service';
import { ShowtimeMapper } from './showtime.mapper';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';

describe('ShowtimeService - getSeatsHeldByUser', () => {
  let service: ShowtimeService;
  let realtimeService: RealtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowtimeService,
        {
          provide: PrismaService,
          useValue: {
            showtimes: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            seats: {
              findMany: jest.fn(),
            },
            ticketPricing: {
              findMany: jest.fn(),
            },
            seatReservations: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: RealtimeService,
          useValue: {
            getOrSetCache: jest.fn(),
            getUserHeldSeats: jest.fn(),
            getAllHeldSeats: jest.fn(),
            deleteCacheByPrefix: jest.fn(),
          },
        },
        {
          provide: ShowtimeMapper,
          useValue: {
            toShowtimeSummaryList: jest.fn(),
          },
        },
        {
          provide: ShowtimeSeatMapper,
          useValue: {
            toShowtimeSeatResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ShowtimeService>(ShowtimeService);
    realtimeService = module.get<RealtimeService>(RealtimeService);
  });

  describe('getSeatsHeldByUser', () => {
    it('should return list of seats held by user', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';
      const heldSeats = ['A1', 'A2', 'A3'];

      (realtimeService.getUserHeldSeats as jest.Mock).mockResolvedValue(heldSeats);

      const result = await service.getSeatsHeldByUser(showtimeId, userId);

      expect(result).toEqual(heldSeats);
      expect(realtimeService.getUserHeldSeats).toHaveBeenCalledWith(showtimeId, userId);
    });

    it('should return empty array when user has no held seats', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';

      (realtimeService.getUserHeldSeats as jest.Mock).mockResolvedValue([]);

      const result = await service.getSeatsHeldByUser(showtimeId, userId);

      expect(result).toEqual([]);
      expect(realtimeService.getUserHeldSeats).toHaveBeenCalledWith(showtimeId, userId);
    });

    it('should return seats from redis cache', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';
      const heldSeats = ['B5', 'B6'];

      (realtimeService.getUserHeldSeats as jest.Mock).mockResolvedValue(heldSeats);

      const result = await service.getSeatsHeldByUser(showtimeId, userId);

      expect(result).toEqual(heldSeats);
    });

    it('should handle different seat formats', async () => {
      const showtimeId = 'showtime-1';
      const userId = 'user-1';
      const heldSeats = ['A1', 'B2', 'C3', 'D4'];

      (realtimeService.getUserHeldSeats as jest.Mock).mockResolvedValue(heldSeats);

      const result = await service.getSeatsHeldByUser(showtimeId, userId);

      expect(result).toEqual(heldSeats);
      expect(result).toHaveLength(4);
      expect(result).toContain('A1');
      expect(result).toContain('D4');
    });
  });
});

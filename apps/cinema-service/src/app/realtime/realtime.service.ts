import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import { RedisPubSubService } from '@movie-hub/shared-redis';
import { SeatEvent } from '@movie-hub/shared-types';

@Injectable()
export class RealtimeService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RealtimeService.name);
  private readonly HOLD_LIMIT = 8;
  private readonly HOLD_TTL = 600; // 10 phút

  constructor(
    @Inject('REDIS_CINEMA') private readonly redis: RedisPubSubService
  ) {}

  async onModuleInit() {
    this.logger.log('✅ RealtimeService initialized');
    await this.subscribeToGatewayChannels();
  }

  private async subscribeToGatewayChannels() {
    await this.redis.subscribe('gateway.hold_seat', (msg) =>
      this.handleGatewayMessage('gateway.hold_seat', msg)
    );
    await this.redis.subscribe('gateway.release_seat', (msg) =>
      this.handleGatewayMessage('gateway.release_seat', msg)
    );
  }

  private async handleGatewayMessage(channel: string, message: string) {
    const data = JSON.parse(message) as SeatEvent;
    if (channel === 'gateway.hold_seat') await this.handleHoldSeat(data);
    else if (channel === 'gateway.release_seat')
      await this.handleReleaseSeat(data);
  }

  // ---------------------------------------
  // 🚀 GIỮ GHẾ – không còn session key
  // ---------------------------------------
  private async handleHoldSeat(event: SeatEvent) {
    const { showtimeId, seatId, userId } = event;
    const userKey = `hold:user:${userId}:showtime:${showtimeId}`;
    const seatKey = `hold:showtime:${showtimeId}:${seatId}`;

    // Nếu user đổi showtime → xoá ghế cũ
    await this.clearOldShowtimeSession(userId, showtimeId);

    // Check limit
    const currentSeats = await this.redis.smembers(userKey);
    if (currentSeats.length >= this.HOLD_LIMIT) {
      await this.redis.publish(
        'cinema.seat_limit_reached',
        JSON.stringify({ userId, showtimeId, limit: this.HOLD_LIMIT })
      );
      return;
    }

    // Check ghế đã bị giữ chưa
    const exists = await this.redis.exists(seatKey);
    if (exists) return;

    // Giữ ghế
    await Promise.all([
      this.redis.set(seatKey, userId, this.HOLD_TTL),
      this.redis.sadd(userKey, seatId),
      this.redis.expire(userKey, this.HOLD_TTL),
    ]);

    await this.redis.publish(
      'cinema.seat_held',
      JSON.stringify({ showtimeId, seatId, userId })
    );

    this.logger.log(
      `Seat ${seatId} held by ${userId} in showtime ${showtimeId}`
    );
  }

  // ---------------------------------------
  // ❌ BỎ GIỮ GHẾ (không ảnh hưởng session)
  // ---------------------------------------
  private async handleReleaseSeat({ showtimeId, seatId, userId }: SeatEvent) {
    const userKey = `hold:user:${userId}:showtime:${showtimeId}`;
    const seatKey = `hold:showtime:${showtimeId}:${seatId}`;

    await Promise.all([
      this.redis.del(seatKey),
      this.redis.srem(userKey, seatId),
    ]);

    await this.redis.publish(
      'cinema.seat_released',
      JSON.stringify({ showtimeId, seatId, userId })
    );

    const remaining = await this.redis.scard(userKey);
    if (remaining === 0) {
      this.logger.log(
        `No held seats left for ${userId} in showtime ${showtimeId}`
      );

      // Xoá key luôn nếu rỗng
      await this.redis.del(userKey);
    }
  }

  // ---------------------------------------
  // 🧹 Xử lý đổi showtime → clear ghế cũ
  // ---------------------------------------
  private async clearOldShowtimeSession(userId: string, newShowtimeId: string) {
    const userKeys = await this.redis.keys(`hold:user:${userId}:showtime:*`);

    // Không có ghế cũ
    if (userKeys.length === 0) return;

    const oldUserKey = userKeys[0];
    const oldShowtimeId = oldUserKey.split(':')[4];

    // Cùng showtime → không xoá
    if (oldShowtimeId === newShowtimeId) return;

    // Ghế cũ
    const oldSeatIds = await this.redis.smembers(oldUserKey);

    if (oldSeatIds.length > 0) {
      const seatKeys = oldSeatIds.map(
        (seatId) => `hold:showtime:${oldShowtimeId}:${seatId}`
      );
      await this.redis.del(...seatKeys);

      await this.redis.publish(
        'cinema.seat_released',
        JSON.stringify({
          showtimeId: oldShowtimeId,
          seatIds: oldSeatIds,
          userId,
        })
      );
    }

    await this.redis.del(oldUserKey);

    this.logger.warn(
      `User ${userId} switched showtime from ${oldShowtimeId} → ${newShowtimeId}. Old seats cleared.`
    );
  }

  // ---------------------------------------
  // 🔎 Utility
  // ---------------------------------------
  async getAllHeldSeats(showtimeId: string): Promise<Record<string, string>> {
    const keys = await this.redis.keys(`hold:showtime:${showtimeId}:*`);
    if (keys.length === 0) return {};

    const pipeline = this.redis.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();

    const heldSeats: Record<string, string> = {};
    results.forEach(([err, holder], i) => {
      if (!err && typeof holder === 'string') {
        const seatId = keys[i].split(':')[3];
        heldSeats[seatId] = holder;
      }
    });

    return heldSeats;
  }

  async getUserHeldSeats(
    showtimeId: string,
    userId: string
  ): Promise<string[]> {
    return this.redis.smembers(`hold:user:${userId}:showtime:${showtimeId}`);
  }

  async getUserTTL(showtimeId: string, userId: string): Promise<number> {
    return this.redis.ttl(`hold:user:${userId}:showtime:${showtimeId}`);
  }

  async getOrSetCache<T>(
    key: string,
    ttlSeconds: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = await this.redis.get<T>(key);
    if (cached) return cached;
    const data = await fetchFn();
    await this.redis.set(key, data, ttlSeconds);
    return data;
  }

  async deleteCacheByPrefix(prefix: string) {
    await this.redis.flushByPrefix(prefix);
  }

  async onModuleDestroy() {
    await this.redis.quitAll();
  }
}

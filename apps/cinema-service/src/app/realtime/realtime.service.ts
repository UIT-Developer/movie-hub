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
    await this.redis.enableKeyspaceEvents();
    await this.subscribeToGatewayChannels();
    await this.subscribeToKeyExpiration();
  }

  private async subscribeToGatewayChannels() {
    await this.redis.subscribe('gateway.hold_seat', (msg) =>
      this.handleGatewayMessage('gateway.hold_seat', msg)
    );
    await this.redis.subscribe('gateway.release_seat', (msg) =>
      this.handleGatewayMessage('gateway.release_seat', msg)
    );
  }

  private async subscribeToKeyExpiration() {
    await this.redis.psubscribe('__keyevent@0__:expired', async (_, __, key) =>
      this.handleKeyExpiration(key)
    );
  }

  private async handleGatewayMessage(channel: string, message: string) {
    const data = JSON.parse(message) as SeatEvent;
    if (channel === 'gateway.hold_seat') await this.handleHoldSeat(data);
    else if (channel === 'gateway.release_seat')
      await this.handleReleaseSeat(data);
  }

  // 🔑 Khi session hết hạn -> clear toàn bộ ghế user đó giữ
  private async handleKeyExpiration(key: string) {
    if (!key.startsWith('hold:session:')) return;

    const userId = key.split(':')[2];
    this.logger.log(`Session expired for ${userId}`);

    const userShowtimeKeys = await this.redis.keys(
      `hold:user:${userId}:showtime:*`
    );

    for (const userShowtimeKey of userShowtimeKeys) {
      const showtimeId = userShowtimeKey.split(':')[4];
      const seatIds = await this.redis.smembers(userShowtimeKey);

      if (seatIds.length === 0) continue;

      const seatKeys = seatIds.map(
        (seatId) => `hold:showtime:${showtimeId}:${seatId}`
      );
      await this.redis.del(...seatKeys);
      await this.redis.del(userShowtimeKey);

      await this.redis.publish(
        'cinema.seat_expired',
        JSON.stringify({ showtimeId, seatIds, userId })
      );

      this.logger.log(
        `Released ${seatIds.length} seat(s) for showtime ${showtimeId}`
      );
    }

    this.logger.log(`Cleared all held seats for ${userId}`);
  }

  // ✅ Giữ 1 ghế
  private async handleHoldSeat(event: SeatEvent) {
    const { showtimeId, seatId, userId } = event;
    console.log('Hold seat: ', event);
    const userKey = `hold:user:${userId}:showtime:${showtimeId}`;
    const sessionKey = `hold:session:${userId}`;
    const seatKey = `hold:showtime:${showtimeId}:${seatId}`;

    // Clear old session nếu đổi showtime
    await this.clearOldShowtimeSession(userId, showtimeId);

    // Check limit
    const currentSeats = await this.redis.smembers(userKey);
    if (currentSeats.length >= this.HOLD_LIMIT) {
      this.logger.warn(
        `User ${userId} reached seat hold limit (${this.HOLD_LIMIT})`
      );
      await this.redis.publish(
        'cinema.seat_limit_reached',
        JSON.stringify({ userId, showtimeId, limit: this.HOLD_LIMIT })
      );
      return;
    }

    // Tạo session nếu chưa có
    const sessionExists = await this.redis.exists(sessionKey);
    if (!sessionExists) {
      await this.redis.set(sessionKey, 'active', this.HOLD_TTL);
      this.logger.log(`New session created for ${userId}`);
    }

    const exists = await this.redis.exists(seatKey);
    if (exists) return; // ghế đã bị giữ rồi

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

  // ✅ Bỏ giữ 1 ghế
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
    }

    const userAllKeys = await this.redis.keys(`hold:user:${userId}:showtime:*`);
    if (userAllKeys.length === 0) {
      await this.redis.del(`hold:session:${userId}`);
      this.logger.log(`Session cleared for ${userId}`);
    }
  }

  // ✅ Các hàm cache phụ trợ (giữ nguyên)
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

  async getSessionTTL(userId: string): Promise<number> {
    const sessionKey = `hold:session:${userId}`;
    const ttl = await this.redis.ttl(sessionKey);
    return ttl;
  }

  async getUserHeldSeats(
    showtimeId: string,
    userId: string
  ): Promise<string[]> {
    return this.redis.smembers(`hold:user:${userId}:showtime:${showtimeId}`);
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

  // HELPER
  private async clearOldShowtimeSession(userId: string, newShowtimeId: string) {
    const sessionKey = `hold:session:${userId}`;

    // Parse session safely
    const sessionRaw = await this.redis.get(sessionKey);
    const currentSession = sessionRaw
      ? (JSON.parse(sessionRaw) as { showtimeId: string })
      : null;

    // Không có session hoặc session trùng showtime -> không cần clear
    if (!currentSession || currentSession.showtimeId === newShowtimeId) return;

    const oldShowtimeId = currentSession.showtimeId;
    const oldUserKey = `hold:user:${userId}:showtime:${oldShowtimeId}`;

    // Lấy danh sách ghế đang giữ
    const oldSeatIds = await this.redis.smembers(oldUserKey);

    if (oldSeatIds.length > 0) {
      // Xoá tất cả hold keys của ghế
      const seatKeys = oldSeatIds.map(
        (seatId) => `hold:showtime:${oldShowtimeId}:${seatId}`
      );
      await this.redis.del(...seatKeys);

      // Emit event release cho phòng cũ
      await this.redis.publish(
        'cinema.seat_released',
        JSON.stringify({
          showtimeId: oldShowtimeId,
          seatIds: oldSeatIds,
          userId,
        })
      );
    }

    // Xoá user seat set + session cũ
    await Promise.all([this.redis.del(oldUserKey), this.redis.del(sessionKey)]);

    this.logger.warn(
      `User ${userId} switched showtime from ${oldShowtimeId} to ${newShowtimeId}. Old session cleared.`
    );
  }
}

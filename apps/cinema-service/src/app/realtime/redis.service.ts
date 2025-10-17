import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private pub: Redis;
  private sub: Redis;

  private readonly HOLD_LIMIT = 8;
  private readonly HOLD_TTL = 300; // 5 phút

  constructor() {
    // 🔧 Khởi tạo kết nối Redis (chỉ tạo, chưa sub)
    this.pub = new Redis({
      host: process.env.REDIS_HOST ?? 'localhost',
      port: +(process.env.REDIS_PORT ?? 6379),
      /* Production properties */
      // password: process.env.REDIS_PASSWORD,
      // db: +(process.env.REDIS_DB ?? 0),
      keyPrefix: 'cinema-service:',
    });

    this.sub = this.pub.duplicate();
  }

  // 🔄 Setup Redis sau khi module khởi tạo
  async onModuleInit() {
    await this.enableKeyspaceEvents();
    await this.subscribeToGatewayChannels();
    await this.subscribeToKeyExpiration();
  }

  // 🧩 Bật Redis TTL event
  private async enableKeyspaceEvents() {
    await this.pub.config('SET', 'notify-keyspace-events', 'Ex');
  }

  // 📡 Đăng ký listener cho các channel từ gateway
  private async subscribeToGatewayChannels() {
    await this.sub.subscribe('gateway.hold_seats', 'gateway.release_seats');
    this.sub.on('message', (channel, message) =>
      this.handleGatewayMessage(channel, message)
    );
  }

  // ⏱️ Lắng nghe khi key TTL hết hạn
  private async subscribeToKeyExpiration() {
    await this.sub.psubscribe('__keyevent@0__:expired');
    this.sub.on('pmessage', (_, __, key) => this.handleKeyExpiration(key));
  }

  // 💬 Xử lý message từ Gateway
  private async handleGatewayMessage(channel: string, message: string) {
    const data = JSON.parse(message);
    if (channel === 'gateway.hold_seats') {
      await this.handleHoldSeats(data);
    } else if (channel === 'gateway.release_seats') {
      await this.handleReleaseSeats(data);
    }
  }

  // ⏰ Khi session TTL hết hạn → cleanup ghế user đó
  private async handleKeyExpiration(key: string) {
    if (!key.startsWith('hold:session:')) return;

    const clientKey = key.split(':')[2];
    console.log(`[Redis] Session expired for ${clientKey}`);

    const userShowtimeKeys = await this.pub.keys(
      `hold:user:${clientKey}:showtime:*`
    );
    for (const userShowtimeKey of userShowtimeKeys) {
      const showtimeId = userShowtimeKey.split(':')[5];
      const seatIds = await this.pub.smembers(userShowtimeKey);

      for (const seatId of seatIds) {
        const seatKey = `hold:showtime:${showtimeId}:${seatId}`;
        await this.pub.del(seatKey);
        await this.pub.publish(
          'cinema.seat_expired',
          JSON.stringify({ showtimeId, seatIds: [seatId], clientKey })
        );
      }

      await this.pub.del(userShowtimeKey);
    }

    console.log(`[Redis] Cleared all held seats for ${clientKey}`);
  }

  // 🟢 Lấy tất cả ghế đang bị giữ của 1 suất chiếu
  async getAllHeldSeats(showtimeId: string): Promise<Record<string, string>> {
    const keys = await this.pub.keys(`hold:showtime:${showtimeId}:*`);
    if (keys.length === 0) return {};

    const pipeline = this.pub.pipeline();
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

  // 🟣 Lấy danh sách ghế mà 1 user đang giữ trong 1 showtime
  async getUserHeldSeats(
    showtimeId: string,
    clientKey: string
  ): Promise<string[]> {
    return this.pub.smembers(`hold:user:${clientKey}:showtime:${showtimeId}`);
  }

  // ⚙️ Giữ ghế
  private async handleHoldSeats({ showtimeId, seatIds, clientKey }) {
    const userKey = `hold:user:${clientKey}:showtime:${showtimeId}`;
    const sessionKey = `hold:session:${clientKey}`;

    const currentSeats = await this.pub.smembers(userKey);
    if (currentSeats.length + seatIds.length > this.HOLD_LIMIT) {
      await this.pub.publish(
        'cinema.seat_limit_reached',
        JSON.stringify({ clientKey, limit: this.HOLD_LIMIT })
      );
      return;
    }

    const sessionExists = await this.pub.exists(sessionKey);
    if (!sessionExists) {
      await this.pub.set(sessionKey, 'active', 'EX', this.HOLD_TTL);
      console.log(`[Redis] New session created for ${clientKey}`);
    }

    await this.refreshTTL(userKey, this.HOLD_TTL, true);

    for (const seatId of seatIds) {
      const seatKey = `hold:showtime:${showtimeId}:${seatId}`;
      const exists = await this.pub.exists(seatKey);

      if (!exists) {
        await this.pub.set(seatKey, clientKey, 'EX', this.HOLD_TTL);
        await this.pub.sadd(userKey, seatId);
        await this.pub.publish(
          'cinema.seat_held',
          JSON.stringify({ showtimeId, seatIds: [seatId], clientKey })
        );
      }
    }
  }

  // ⚙️ Bỏ giữ ghế
  private async handleReleaseSeats({ showtimeId, seatIds, clientKey }) {
    const userKey = `hold:user:${clientKey}:showtime:${showtimeId}`;

    for (const seatId of seatIds) {
      await this.pub.del(`hold:showtime:${showtimeId}:${seatId}`);
      await this.pub.srem(userKey, seatId);
      await this.pub.publish(
        'cinema.seat_released',
        JSON.stringify({ showtimeId, seatIds: [seatId], clientKey })
      );
    }

    const remaining = await this.pub.scard(userKey);
    if (remaining === 0) {
      console.log(
        `[Redis] No held seats left for ${clientKey} in showtime ${showtimeId}`
      );
    }

    const userAllKeys = await this.pub.keys(
      `hold:user:${clientKey}:showtime:*`
    );
    if (userAllKeys.length === 0) {
      await this.pub.del(`hold:session:${clientKey}`);
      console.log(`[Redis] Session cleared for ${clientKey}`);
    }
  }

  // ⏳ Refresh TTL
  private async refreshTTL(key: string, ttl: number, createIfMissing = false) {
    const exists = await this.pub.exists(key);
    if (exists) {
      await this.pub.expire(key, ttl);
    } else if (createIfMissing) {
      await this.pub.set(key, 'active', 'EX', ttl);
    }
  }

  // 💾 Cache helper
  async getOrSetCache<T>(
    key: string,
    ttlSeconds: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = await this.pub.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fetchFn();
    await this.pub.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    return data;
  }

  // 🧹 Xóa cache theo prefix
  async deleteCacheByPrefix(prefix: string): Promise<void> {
    const keys = await this.pub.keys(`${prefix}:*`);
    if (keys.length > 0) await this.pub.del(keys);
  }

  onModuleDestroy() {
    this.pub.quit();
    this.sub.quit();
  }
}

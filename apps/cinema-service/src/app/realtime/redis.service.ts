import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private pub: Redis;
  private sub: Redis;

  private readonly HOLD_LIMIT = 8;
  private readonly HOLD_TTL = 300; // 5 phút

  constructor() {
    this.pub = new Redis({ host: 'localhost', port: 6379 });
    this.sub = new Redis({ host: 'localhost', port: 6379 });

    // Subcribe các channel từ Gateway
    this.sub.subscribe('gateway.hold_seats');
    this.sub.subscribe('gateway.release_seats');

    // Bật notify TTL event
    this.pub.config('SET', 'notify-keyspace-events', 'Ex');
    this.sub.psubscribe('__keyevent@0__:expired', () => {});

    // Lắng nghe message từ gateway
    this.sub.on('message', async (channel, message) => {
      const data = JSON.parse(message);
      if (channel === 'gateway.hold_seats') {
        await this.handleHoldSeats(data);
      } else if (channel === 'gateway.release_seats') {
        await this.handleReleaseSeats(data);
      }
    });

    // Lắng nghe khi key TTL hết hạn
    this.sub.on('pmessage', async (pattern, channel, key) => {
      // Session hết hạn => cleanup tất cả seat của user đó
      if (
        pattern === '__keyevent@0__:expired' &&
        key.startsWith('hold:session:')
      ) {
        const clientKey = key.split(':')[2];
        console.log(`[Redis] Session expired for ${clientKey}`);

        // Tìm tất cả showtime user này từng giữ ghế
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
    });
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

    // Kiểm tra giới hạn ghế
    const currentSeats = await this.pub.smembers(userKey);
    if (currentSeats.length + seatIds.length > this.HOLD_LIMIT) {
      await this.pub.publish(
        'cinema.seat_limit_reached',
        JSON.stringify({ clientKey, limit: this.HOLD_LIMIT })
      );
      return;
    }

    // Tạo session TTL nếu chưa có
    const sessionExists = await this.pub.exists(sessionKey);
    if (!sessionExists) {
      await this.pub.set(sessionKey, 'active', 'EX', this.HOLD_TTL);
      console.log(`[Redis] New session created for ${clientKey}`);
    }

    // Refresh TTL của userKey
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

    // Nếu user không còn giữ ghế nào ở showtime này
    const remaining = await this.pub.scard(userKey);
    if (remaining === 0) {
      console.log(
        `[Redis] No held seats left for ${clientKey} in showtime ${showtimeId}`
      );
    }

    // Nếu user không còn ghế ở tất cả showtime => clear session
    const userAllKeys = await this.pub.keys(
      `hold:user:${clientKey}:showtime:*`
    );
    if (userAllKeys.length === 0) {
      await this.pub.del(`hold:session:${clientKey}`);
      console.log(`[Redis] Session cleared for ${clientKey}`);
    }
  }

  getClient(): Redis {
    return this.pub;
  }

  private async refreshTTL(key: string, ttl: number, createIfMissing = false) {
    const exists = await this.pub.exists(key);
    if (exists) {
      await this.pub.expire(key, ttl);
    } else if (createIfMissing) {
      // set key "active" với TTL nếu chưa tồn tại
      await this.pub.set(key, 'active', 'EX', ttl);
    }
  }

  onModuleDestroy() {
    this.pub.quit();
    this.sub.quit();
  }
}

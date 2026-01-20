import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    // Prefer explicit adapter env var, then fall back to REDIS_URL (set by infra), then localhost for dev
    const redisUrl =
      process.env.REDIS_ADAPTER_URL || process.env.REDIS_URL || 'redis://localhost:6379';

    // Log resolved Redis host (avoid printing credentials)
    try {
      const u = new URL(redisUrl);
      console.log(`🔎 Redis adapter connecting to ${u.hostname}:${u.port || '6379'}`);
    } catch {
      console.log('🔎 Redis adapter using raw URL (could not parse hostname)');
    }

    // Tạo pub/sub client bằng ioredis
    const pubClient = new Redis(redisUrl, {
      maxRetriesPerRequest: null, // để tránh lỗi "Connection is closed"
      retryStrategy: (times) => Math.min(times * 100, 3000), // auto reconnect
    });

    const subClient = pubClient.duplicate();

    pubClient.on('error', (err) =>
      console.error('❌ Redis pubClient error:', err.message)
    );
    subClient.on('error', (err) =>
      console.error('❌ Redis subClient error:', err.message)
    );

    this.adapterConstructor = createAdapter(pubClient, subClient);

    console.log('✅ RedisIoAdapter connected via ioredis');
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}

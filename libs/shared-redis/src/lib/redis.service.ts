// libs/shared-redis/src/redis.service.ts
import { Logger } from '@nestjs/common';
import Redis, { ChainableCommander, Pipeline } from 'ioredis';

type MessageHandler = (msg: string, channel: string) => void;
type PMessageHandler = (pattern: string, channel: string, msg: string) => void;

export class RedisPubSubService {
  private readonly logger = new Logger(RedisPubSubService.name);
  private pub: Redis;
  private sub: Redis;
  private handlers = new Map<string, MessageHandler[]>();
  private pHandlers = new Map<string, PMessageHandler[]>();

  constructor(public readonly baseClient: Redis) {
    this.pub = this.baseClient.duplicate();
    this.sub = this.baseClient.duplicate();

    this.sub.on('message', (channel, message) => {
      const list = this.handlers.get(channel);
      list?.forEach((fn) => fn(message, channel));
    });

    this.sub.on('pmessage', (pattern, channel, message) => {
      const list = this.pHandlers.get(pattern);
      list?.forEach((fn) => fn(pattern, channel, message));
    });
  }

  // =========================
  // 🔔 PUB/SUB
  // =========================
  async publish(channel: string, message: any) {
    const payload =
      typeof message === 'string' ? message : JSON.stringify(message);
    await this.pub.publish(channel, payload);
  }

  async subscribe(channel: string, handler: MessageHandler) {
    if (!this.handlers.has(channel)) {
      await this.sub.subscribe(channel);
      this.handlers.set(channel, []);
    }
    this.handlers.get(channel)!.push(handler);
  }

  async psubscribe(pattern: string, handler: PMessageHandler) {
    if (!this.pHandlers.has(pattern)) {
      await this.sub.psubscribe(pattern);
      this.pHandlers.set(pattern, []);
    }
    this.pHandlers.get(pattern)!.push(handler);
  }

  async unsubscribe(channel: string) {
    await this.sub.unsubscribe(channel);
    this.handlers.delete(channel);
  }

  async punsubscribe(pattern: string) {
    await this.sub.punsubscribe(pattern);
    this.pHandlers.delete(pattern);
  }

  // =========================
  // 💾 DATA OPERATIONS
  // =========================
  async set(key: string, value: any, ttlSeconds?: number) {
    const payload = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttlSeconds) return this.baseClient.set(key, payload, 'EX', ttlSeconds);
    return this.baseClient.set(key, payload);
  }

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.baseClient.get(key);
    try {
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return data as any;
    }
  }

  async exists(key: string): Promise<boolean> {
    return (await this.baseClient.exists(key)) > 0;
  }

  async del(...keys: string[]) {
    return this.baseClient.del(...keys);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.baseClient.keys(pattern);
  }

  async expire(key: string, ttlSeconds: number) {
    return this.baseClient.expire(key, ttlSeconds);
  }

  async sadd(key: string, ...members: string[]) {
    return this.baseClient.sadd(key, ...members);
  }

  async srem(key: string, ...members: string[]) {
    return this.baseClient.srem(key, ...members);
  }

  async smembers(key: string) {
    return this.baseClient.smembers(key);
  }

  async scard(key: string) {
    return this.baseClient.scard(key);
  }

  pipeline(): ChainableCommander {
    return this.baseClient.pipeline();
  }

  // =========================
  // 🔧 UTILITIES
  // =========================
  async enableKeyspaceEvents() {
    await this.pub.config('SET', 'notify-keyspace-events', 'Ex');
  }

  async flushByPrefix(prefix: string) {
    const keys = await this.keys(`${prefix}:*`);
    if (keys.length > 0) await this.del(...keys);
  }

  duplicate(): Redis {
    return this.baseClient.duplicate();
  }

  async quitAll() {
    await this.pub.quit();
    await this.sub.quit();
    await this.baseClient.quit();
  }
}

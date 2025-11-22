import { DynamicModule, Module, Global } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSubService } from './redis.service';

export interface RedisModuleOptions {
  name?: string;
  url?: string; // thêm url
  config?: RedisOptions; // optional nếu dùng url
}

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    const connectionName = options.name || 'default';

    const redisProvider = {
      provide: `REDIS_${connectionName.toUpperCase()}_CLIENT`,
      useFactory: async () => {
        const client = options.url
          ? new Redis(options.url) // Upstash, Docker, Cloud...
          : new Redis(options.config!); // Local (host/port)

        return client;
      },
    };

    const pubSubProvider = {
      provide: `REDIS_${connectionName.toUpperCase()}`,
      useFactory: (client: Redis) => new RedisPubSubService(client),
      inject: [`REDIS_${connectionName.toUpperCase()}_CLIENT`],
    };

    return {
      module: RedisModule,
      providers: [redisProvider, pubSubProvider],
      exports: [pubSubProvider],
    };
  }

  // Nếu dùng ConfigModule hoặc env, thì có bản async
  static forRootAsync(options: {
    name?: string;
    useFactory: (
      ...args: any[]
    ) => RedisModuleOptions | Promise<RedisModuleOptions>;
    inject?: any[];
    imports?: any[];
  }): DynamicModule {
    const connectionName = options.name || 'default';

    const redisProvider = {
      provide: `REDIS_${connectionName.toUpperCase()}_CLIENT`,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);

        const client = config.url
          ? new Redis(config.url)
          : new Redis(config.config!);

        return client;
      },
      inject: options.inject || [],
    };

    const pubSubProvider = {
      provide: `REDIS_${connectionName.toUpperCase()}`,
      useFactory: (client: Redis) => new RedisPubSubService(client),
      inject: [`REDIS_${connectionName.toUpperCase()}_CLIENT`],
    };

    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [redisProvider, pubSubProvider],
      exports: [pubSubProvider],
    };
  }
}

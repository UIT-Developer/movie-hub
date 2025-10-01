import {clerkClient } from '@clerk/clerk-sdk-node';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getPermissions(userId: string): Promise<string[]> {

    const cacheKey = `permissions:${userId}`;
    const cached = await this.cacheManager.get<string[]>(cacheKey);
    if (cached) return cached;

    const permissions = await this.prismaService.permission
      .findMany({
        where: {
          rolePermissions: {
            some: {
              role: {
                userRoles: {
                  some: { userId },
                },
              },
            },
          },
        },
        select: { name: true },
      })
      .then((r) => r.map((p) => p.name));

    await this.cacheManager.set(cacheKey, permissions);
    return permissions;
  }

  async getUser() {
    return clerkClient.users.getUserList();
  }
}

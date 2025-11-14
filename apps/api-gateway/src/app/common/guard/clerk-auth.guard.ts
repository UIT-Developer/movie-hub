import { clerkClient } from '@clerk/clerk-sdk-node';
import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { SERVICE_NAME, UserMessage } from '@movie-hub/shared-types';
import { lastValueFrom } from 'rxjs';

export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);
  constructor(
    private reflector: Reflector,
    @Inject(SERVICE_NAME.USER) private userClient: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();


    // ====== 1️⃣ Auth via Clerk ======
    const token = request.cookies?.__session;
    if (!token) {
      this.logger.warn('No token found');
      return false;
    }

    try {
      const session = await clerkClient.verifyToken(token);
      request.userId = session.sub;
    } catch (err) {
      this.logger.error('Clerk verification failed', err);
      return false;
    }

    // ====== 2️⃣ Permission check ======
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler()
    );
    if (!requiredPermission) return true; // không có permission metadata => cho qua

    const userId = request.userId;
    if (!userId) return false;

    try {
      const permissions: string[] = await lastValueFrom(
        this.userClient.send<string[], { userId: string }>(
          UserMessage.GET_PERMISSIONS,
          { userId }
        )
      );

      this.logger.debug(`User ${userId} permissions: ${permissions}`);
      return permissions.includes(requiredPermission);
    } catch (error) {
      this.logger.error('Permission check failed', error);
      return false;
    }
  }
}

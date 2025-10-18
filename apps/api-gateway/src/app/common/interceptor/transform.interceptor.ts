import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const request: Request = context.switchToHttp().getRequest();
        if (
          data &&
          Object.prototype.hasOwnProperty.call(data, 'meta') &&
          !data.meta
        ) {
          delete data.meta; // Xóa meta nếu nó là null hoặc undefined
        }
        return {
          success: true,
          ...data,
          timestamp: new Date().toISOString(),
          path: request.path,
        };
      })
    );
  }
}

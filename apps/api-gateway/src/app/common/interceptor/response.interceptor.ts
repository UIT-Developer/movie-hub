import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        // Lấy request từ context
        const request: Request = context.switchToHttp().getRequest();

        return {
          success: true,
          data: data || null, // Nếu không có data thì trả về null
          timestamp: Date.now().toString(),
          path: request.path,
        };
      })
    );
  }
}

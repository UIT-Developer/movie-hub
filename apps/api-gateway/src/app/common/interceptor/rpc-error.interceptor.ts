// interceptors/rpc-error.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RpcErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        console.log(error instanceof RpcException);

        this.logger.error('RPC Error:', {
          handler: context.getHandler().name,
          error: error,
        });

        return throwError(() => new RpcException(error));
      })
    );
  }
}

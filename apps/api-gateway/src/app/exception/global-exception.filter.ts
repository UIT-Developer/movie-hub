import { ApiErrorResponse } from '@movie-hub/shared-types/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod/v4/classic/errors.cjs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getResponse<Request>();
    // const status = exception.getStatus();

    let errorResponse: ApiErrorResponse;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ZodValidationException) {
      status = exception.getStatus();
      errorResponse = {
        success: false,
        message: exception.message,
        errors: (exception.getZodError() as ZodError).issues.map((e) => {
          return {
            message: e.message,
            code: e?.code || 'invalid_type',
            field: e?.path.join('.'),
          };
        }),
        timestamp: new Date().toISOString(),
        path: request.path,
      };
    } else if (exception instanceof RpcException) {
      const error = exception.getError() as any;
      status = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        success: false,
        message: error?.summary || 'Internal server error',
        errors: [
          {
            code: error?.code || 'UNKNOWN_ERROR',
            field: error?.field,
            message: error?.message || 'Internal server error',
          },
        ],
        path: request.path,
        timestamp: new Date().toISOString(),
      };
    } else {
      errorResponse = {
        success: false,
        message: 'Unexpected error',
        errors: [
          {
            code: 'INTERNAL_ERROR',
            field: null,
            message: (exception as any)?.message || 'Something went wrong',
          },
        ],
        path: request.path,
        timestamp: new Date().toISOString(),
      };
    }

    response.status(status).json(errorResponse);
  }
}

import { ApiErrorResponse } from '@movie-hub/libs/common';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod/v4/classic/errors.cjs';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getResponse<Request>();
    const status = exception.getStatus();


    const errorResponse: ApiErrorResponse = {
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

    response.status(status).json(errorResponse);
  }
}

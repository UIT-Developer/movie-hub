/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResourceNotFoundException } from '@movie-hub/libs';
import { Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';

@Catch() // Catch all exceptions
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any) {
    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2003') {
        const response = {
          summary: 'Failed to create movie',
          statusCode: 400,
          code: exception.code,
          message: 'One or more genre IDs do not exist in the database.',
        };

        return throwError(() => response);
      }

      if (exception.code === 'P2025') {
        const response = {
          summary: 'Failed to delete movie',
          statusCode: 404,
          code: exception.code,
          message: 'No movie found with the provided ID for deletion.',
        };

        return throwError(() => response);
      }

      const response = {
        summary: 'Database error',
        statusCode: 500,
        code: exception.code,
        message: exception.message,
      };

      return throwError(() => response);
    } else if (exception instanceof ResourceNotFoundException) {
      return throwError(() => exception.getError());
    }

    const response = {
      summary: 'Unexpected error',
      statusCode: 500,
      code: 'UNKNOWN_ERROR',
      message: exception.message || 'An unexpected error occurred',
    };

    return throwError(() => response);
  }
}

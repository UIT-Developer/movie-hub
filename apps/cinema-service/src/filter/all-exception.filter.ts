/* eslint-disable @typescript-eslint/no-explicit-any */
import { Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { ResourceNotFoundException } from '@movie-hub/shared-types';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any) {
    // Prisma lỗi
    if (exception instanceof PrismaClientKnownRequestError) {
      let response: any;

      switch (exception.code) {
        case 'P2002':
          response = {
            summary: 'Duplicate record',
            statusCode: 400,
            code: exception.code,
            message: 'A record with the same unique value already exists.',
          };
          break;

        case 'P2003':
          response = {
            summary: 'Foreign key constraint failed',
            statusCode: 400,
            code: exception.code,
            message: 'One or more related IDs do not exist in the database.',
          };
          break;

        case 'P2025':
          response = {
            summary: 'Record not found',
            statusCode: 404,
            code: exception.code,
            message: 'No record found with the provided identifier.',
          };
          break;

        default:
          response = {
            summary: 'Database error',
            statusCode: 500,
            code: exception.code,
            message: exception.message,
          };
      }

      return throwError(() => response);
    }

    // Custom not found
    if (exception instanceof ResourceNotFoundException) {
      return throwError(() => exception.getError());
    }

    // Lỗi khác
    const response = {
      summary: 'Unexpected error',
      statusCode: 500,
      code: 'UNKNOWN_ERROR',
      message: exception.message || 'An unexpected error occurred',
    };

    return throwError(() => response);
  }
}

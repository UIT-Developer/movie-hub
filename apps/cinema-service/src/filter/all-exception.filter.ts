/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { ResourceNotFoundException } from '@movie-hub/shared-types';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // ✅ Nếu đã là RpcException → để BaseRpcExceptionFilter xử lý
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    }

    // Prisma
    if (exception instanceof PrismaClientKnownRequestError) {
      let response;

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

      return super.catch(new RpcException(response), host);
    }

    // Custom not found
    if (exception instanceof ResourceNotFoundException) {
      return super.catch(new RpcException(exception.getError()), host);
    }

    // Fallback
    return super.catch(
      new RpcException({
        summary: 'Unexpected error',
        statusCode: 500,
        code: 'UNKNOWN_ERROR',
        message: exception?.message || 'An unexpected error occurred',
      }),
      host
    );
  }
}

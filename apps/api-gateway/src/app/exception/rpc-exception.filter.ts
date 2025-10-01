import { ApiErrorResponse } from '@movie-hub/libs/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error = exception.getError() as any;

    const errortResponse: ApiErrorResponse = {
      success: false,
      message: error?.summary || 'Internal server error',
      errors: [
        {
          code: error?.code || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error?.message || 'Internal server error',
          field: error?.field,
        },
      ],
      path: request.path,
      timestamp: new Date().toISOString(),
    };

    response
      .status(error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errortResponse);
  }
}

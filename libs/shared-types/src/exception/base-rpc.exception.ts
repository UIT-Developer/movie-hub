import { RpcException } from '@nestjs/microservices';
import { ErrorDetail } from '../common';

export class BaseRpcException extends RpcException {
  constructor(
    public readonly statusCode: number, // HTTP status code
    public readonly errorDetail: ErrorDetail,
    public readonly summary: string
  ) {
    super({
      statusCode,
      ...errorDetail,
      summary,
    });
  }
}

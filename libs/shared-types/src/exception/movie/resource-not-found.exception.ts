import { BaseRpcException } from '../base-rpc.exception';

export class ResourceNotFoundException extends BaseRpcException {
  constructor(entity: string, field: string, value: string | number) {
    super(
      404,
      {
        code: `${entity.toUpperCase()}_NOT_FOUND`,
        message: `${entity} with ${field} = ${value} not found`,
        field,
      },
      'Resource not found'
    );
  }
}

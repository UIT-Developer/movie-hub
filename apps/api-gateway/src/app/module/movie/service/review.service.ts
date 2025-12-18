import {
  MovieServiceMessage,
  ReviewQuery,
  SERVICE_NAME,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(@Inject(SERVICE_NAME.Movie) private client: ClientProxy) {}

  async findAll(query: ReviewQuery) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.REVIEW.GET_LIST, query)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async remove(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.REVIEW.DELETED, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

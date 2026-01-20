import {
  GenreRequest,
  MovieServiceMessage,
  SERVICE_NAME,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GenreService {
  constructor(@Inject(SERVICE_NAME.Movie) private client: ClientProxy) {}

  async findAll() {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.GENRE.GET_LIST, {})
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.GENRE.GET_DETAIL, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async create(request: GenreRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.GENRE.CREATED, request)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(id: string, request: GenreRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.GENRE.UPDATED, { id, request })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async remove(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.GENRE.DELETED, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

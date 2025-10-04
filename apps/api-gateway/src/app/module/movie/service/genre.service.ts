import {
  GenreRequest,
  MovieServiceMessage,
  SERVICE_NAME,
} from '@movie-hub/libs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GenreService {
  constructor(@Inject(SERVICE_NAME.Movie) private client: ClientProxy) {}

  async findAll() {
    return firstValueFrom(
      this.client.send(MovieServiceMessage.GENRE.GET_LIST, {})
    );
  }

  async findOne(id: string) {
    return firstValueFrom(
      this.client.send(MovieServiceMessage.GENRE.GET_DETAIL, id)
    );
  }

  async create(request: GenreRequest) {
    return firstValueFrom(
      this.client.send(MovieServiceMessage.GENRE.CREATED, request)
    );
  }

  async update(id: string, request: GenreRequest) {
    return firstValueFrom(
      this.client.send(MovieServiceMessage.GENRE.UPDATED, { id, request })
    );
  }

  async remove(id: string) {
    firstValueFrom(this.client.send(MovieServiceMessage.GENRE.DELETED, id));
  }
}

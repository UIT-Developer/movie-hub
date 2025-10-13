import { GenreRequest, MovieServiceMessage } from '@movie-hub/shared-types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @MessagePattern(MovieServiceMessage.GENRE.CREATED)
  async createGenre(@Payload() request: GenreRequest) {
    return this.genreService.createGenre(request);
  }

  @MessagePattern(MovieServiceMessage.GENRE.GET_LIST)
  async getGenres() {
    return this.genreService.getGenres();
  }

  @MessagePattern(MovieServiceMessage.GENRE.GET_DETAIL)
  async findGenreById(@Payload() id: string) {
    return this.genreService.findGenreById(id);
  }

  @MessagePattern(MovieServiceMessage.GENRE.UPDATED)
  async updateGenre(
    @Payload() { id, request }: { id: string; request: GenreRequest }
  ) {
    return this.genreService.updateGenre(id, request);
  }

  @MessagePattern(MovieServiceMessage.GENRE.DELETED)
  async deleteGenre(@Payload() id: string) {
    await this.genreService.deleteGenre(id);
    return null;
  }
}

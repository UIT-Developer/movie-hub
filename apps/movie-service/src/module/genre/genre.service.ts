import { GenreRequest, GenreResponse } from '@movie-hub/libs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private db: PrismaService) {}

  async createGenre(createGenreDto: GenreRequest): Promise<GenreResponse> {
    return this.db.genre.create({
      data: { ...createGenreDto },
    });
  }

  async getGenres(): Promise<GenreResponse[]> {
    return this.db.genre.findMany();
  }

  async findGenreById(id: string): Promise<GenreResponse> {
    return this.db.genre.findUnique({
      where: { id },
    });
  }

  async updateGenre(
    id: string,
    updateGenreDto: GenreRequest
  ): Promise<GenreResponse> {
    return this.db.genre.update({
      data: { ...updateGenreDto },
      where: { id },
    });
  }

  async deleteGenre(id: string) {
    await this.db.genre.delete({ where: { id } });
  }
}

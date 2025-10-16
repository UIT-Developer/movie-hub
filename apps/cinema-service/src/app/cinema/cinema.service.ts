import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CinemaService {
  constructor(private readonly prisma: PrismaService) {}

  async getCinemas() {
    return this.prisma.cinemas.findMany();
  }
}

import { SERVICE_NAME } from '@movie-hub/shared-types';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MovieService } from './service/movie.service';
import { MovieController } from './controller/movie.controller';
import { GenreController } from './controller/genre.controller';
import { GenreService } from './service/genre.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.Movie,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MOVIE_HOST'),
            port: configService.get<number>('MOVIE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [MovieController, GenreController],
  providers: [MovieService, GenreService],
  exports: [],
})
export class MovieModule {}

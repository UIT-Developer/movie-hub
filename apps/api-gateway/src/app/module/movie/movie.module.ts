import { SERVICE_NAME } from "@movie-hub/libs";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MovieService } from "./service/movie.service";
import { MovieController } from "./controller/movie.controller";

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
  controllers: [MovieController],
  providers: [MovieService],
  exports: [],
})
export class MovieModule {}

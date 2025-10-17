/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './app/exception/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors()
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  // app.useGlobalFilters(new ZodValidationExceptionFilter());
  // app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

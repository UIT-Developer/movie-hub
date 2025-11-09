import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './module/movie/movie.module';
import { GenreModule } from './module/genre/genre.module';

describe('Movie Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Set test environment variables
    process.env.TCP_PORT = '3001';
    process.env.DATABASE_URL = 'file:./test.db';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true, // Don't load .env file for tests
          load: [
            () => ({
              TCP_PORT: '3001',
              DATABASE_URL: 'file:./test.db',
            }),
          ],
        }),
        MovieModule,
        GenreModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('/movies/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies/1')
      .expect((res) => {
        // Should return either 200 with data or 404 if not found
        if (res.status === 200) {
          expect(res.body).toHaveProperty('data');
        } else {
          expect(res.status).toBe(404);
        }
      });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HOME_MESSAGE } from '../src/const';
import { CreateMovieDto } from 'src/movies/dto/create-video.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const homeURL: string = '/';
  const moviesURL: string = '/movies';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // should set the setting in the main.ts.
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  describe(homeURL, () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get(homeURL)
        .expect(200)
        .expect(HOME_MESSAGE);
    });
  });
  
  describe(moviesURL, () => {
    describe('GET', () => {
      const newMovie: CreateMovieDto = {
        title: "test",
        description: "test description",
        genres: ["test1", "test2"]
      };

      beforeEach(()=>{  
        return request(app.getHttpServer())
          .post(moviesURL)
          .send(newMovie)
          .expect(201);
      });

      // Get all movies
      it('GET', () => {
        return request(app.getHttpServer())
          .get(moviesURL)
          .expect(200);
      });
      
      // Get a movie
      it('GET /:id', () => {
        return request(app.getHttpServer())
          .get(moviesURL + "/0")
          .expect(200);
      });
    })

    // Register a new movie
    it('POST', () => {
      const newMovie: CreateMovieDto = {
        title: "test",
        description: "test description",
        genres: ["test1", "test2"]
      };
      return request(app.getHttpServer())
        .post(moviesURL)
        .send(newMovie)
        .expect(201);
    });
  })
});

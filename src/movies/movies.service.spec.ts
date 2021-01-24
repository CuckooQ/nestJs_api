import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-video.dto';
import { UpdateMovieDto } from './dto/update-video.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array', () => {
      // sort
      let testMovies;

      // action
      testMovies = service.getAllMovies();
      
      // assertion
      expect(Array.isArray(testMovies)).toEqual(true);
    });
  });

  describe('getMovieById', () => {
    // return type
    // Why it can't?

    // normal
    it('should return a movie', () => {
      // sort
      const testId: number = 0;
      const testTitle: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovie: CreateMovieDto = {
        title: testTitle,
        description: testDescription,
        genres: testGenres
      };
      service.registerMovie(testMovie);
  
      // action
      const movie: Movie = service.getMovieById(testId);
  
      // assertion
      expect(movie.id).toEqual(testId);
      expect(movie.title).toEqual(testTitle);
      expect(movie.description).toEqual(testDescription);
      expect(movie.genres).toEqual(testGenres);
      expect(new Date(movie.createDate).getTime())
        .toBeLessThan(Date.now());
      expect(new Date(movie.createDate).getTime())
        .toBeGreaterThan(Date.now() - 10 * 1000);      
      expect(movie.createDate).toEqual(movie.updateDate);
    });

    // not found
    it('should throw not found when video not exist', () => {
      // sort
      let isErrorOccured: boolean = false;
      const testId: number = 0;
      // Not register

      try {
        // action
        service.getMovieById(testId);
      }
      catch(e){
        isErrorOccured = true;

        // assertion
        expect(e instanceof NotFoundException).toEqual(true);
      }

      // assertion
      !isErrorOccured ? expect(true).toEqual(false) : {};
    });
  });

  describe('getdMoviesByText', () => {
    // exist
    it('should return the movie with text in title when exist', () => {
      // sort
      const targetId: number = 0;
      const searchText: string = "cuckoo";
      const testTitleTargeted: string = "test" + searchText;
      const testTitleNotTargeted: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovieTargeted: CreateMovieDto = {
        title: testTitleTargeted,
        description: testDescription,
        genres: testGenres
      };
      const testMovieNotTargeted: CreateMovieDto = {
        title: testTitleNotTargeted,
        description: testDescription,
        genres: testGenres
      };
      service.registerMovie(testMovieTargeted); // targetId = 0
      service.registerMovie(testMovieNotTargeted);

      // action
      const searchedMovies: Movie[] = service.getdMoviesByText(searchText);

      // assertion
      expect(searchedMovies.length).toEqual(1);
      expect(searchedMovies[0].id).toEqual(targetId);
    });

    // not exist 
    it('should return empty list when not exist' , () => {
      // sort
      const searchText: string = "cuckoo";
      const testTitle: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovie: CreateMovieDto = {
        title: testTitle,
        description: testDescription,
        genres: testGenres
      };
      service.registerMovie(testMovie);

      // action
      const searchedMovies = service.getdMoviesByText(searchText);

      // assertion
      expect(searchedMovies.length).toEqual(0);
    });
  });

  describe('registerMovie', () => {
    // normal
    it('should exist in the movie list after registered', () => {
      // sort
      const testId: number = 0;
      const testTitle: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovie: CreateMovieDto = {
        title: testTitle,
        description: testDescription,
        genres: testGenres
      };
    
      // action
      const beforeMoviesCount: number = service.getAllMovies().length;
      service.registerMovie(testMovie);  
      const afterMovies: Movie[] = service.getAllMovies();

      // assertion
      expect(afterMovies.length).toEqual(beforeMoviesCount + 1);
      expect(afterMovies.find((movie) => movie.id === testId) !== undefined)
        .toEqual(true); 
    });
  });

  describe('updateMovie', () => {
    // normal
    it('should be changed the movie when it updated', () => {
      // sort
      const testId: number = 0;
      const updatedTitle: string = "testCuckoo";
      const updatedDescription: string = "for testCuckoo";
      const updatedGenres: string[] = ["test3", "test4"];
      const testTitle: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovie: CreateMovieDto = {
        title: testTitle,
        description: testDescription,
        genres: testGenres
      };
      const updatedMovie: UpdateMovieDto = {
          title: updatedTitle,
          description: updatedDescription,
          genres: updatedGenres
      }
      service.registerMovie(testMovie);
      
      // action
      const beforeMovie: Movie = service.getMovieById(testId);
      service.updateMovie(testId, updatedMovie);
      const targetMovie: Movie = service.getMovieById(testId);

      // assertion
      expect(targetMovie.title).toEqual(updatedTitle);
      expect(targetMovie.description).toEqual(updatedDescription);
      expect(targetMovie.genres).toEqual(updatedGenres);
      expect(targetMovie.createDate).toEqual(beforeMovie.createDate);
      expect(new Date(targetMovie.updateDate).getTime())
        .toBeLessThan(Date.now());
      expect(new Date(targetMovie.updateDate).getTime())
        .toBeGreaterThan(Date.now() - 10 * 1000);
    });
  });

  describe('deleteMovie', () => {
    // normal
    it('should not exist when the movie is deleted',  () => {
      // sort
      let isErrorOccured: boolean = false;
      const testId: number = 0;
      const testTitle: string = "test";
      const testDescription: string = "for test";
      const testGenres: string[] = ["test1", "test2"];
      const testMovie: CreateMovieDto = {
        title: testTitle,
        description: testDescription,
        genres: testGenres
      };
      service.registerMovie(testMovie);  

      // action
      const targetMovie: Movie = service.getMovieById(testId);
      service.deleteMovie(targetMovie.id);
      try {
        service.getMovieById(targetMovie.id);
      } catch (e) {
        isErrorOccured = true;

        // assertion
        expect(e instanceof NotFoundException).toEqual(true);
      }
      
      // assertion
      !isErrorOccured ? expect(true).toEqual(false) : {};
    });
    
    // not exist
    it('should not be an error when deleted movie not exist', () => {
      // sort
      const testId: number = 0;

      try { 
        // action
        service.deleteMovie(testId);
      } catch(e) {
        // assertion
        expect(true).toEqual(false);
      }
    });
  });
});
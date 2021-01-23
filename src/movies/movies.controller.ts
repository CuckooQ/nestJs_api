import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getMovies() : Movie[] {
    return this.movieService.getAllMovies();
  }

  @Get("search")
  search(@Query("text") text: string): Movie[] {
    return this.movieService.getdMoviesByText(text);
  }

  @Get("/:id")
  getMovie(@Param("id") id: string) : Movie {
    return this.movieService.getMovieById(id);
  }

  @Post()
  registerMovie(@Body() movie: Movie): void {
    this.movieService.registerMovie(movie);
  }

  /*
  @Put("/:id")
  updateMovie(@Param("id") id: string): string {
    return `Update the movie: ${id}`;
  }
  */

  @Patch("/:id")
  updateDetailOfMovie(@Param("id") id: string, @Body() movie: Movie): void {
    this.movieService.updateMovie(id, movie);
  }

  @Delete("/:id")
  deleteMovie(@Param("id") id: string): void {
    this.movieService.deleteMovie(id);  
  }
}

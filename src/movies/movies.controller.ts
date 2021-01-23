import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-video.dto';
import { UpdateMovieDto } from './dto/update-video.dto';
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
  getMovie(@Param("id") id: number) : Movie {
    return this.movieService.getMovieById(id);
  }

  @Post()
  registerMovie(@Body() movie: CreateMovieDto): void {
    this.movieService.registerMovie(movie);
  }

  /*
  @Put("/:id")
  updateMovie(@Param("id") id: string): string {
    return `Update the movie: ${id}`;
  }
  */

  @Patch("/:id")
  updateDetailOfMovie(@Param("id") id: number, @Body() movie: UpdateMovieDto): void {
    this.movieService.updateMovie(id, movie);
  }

  @Delete("/:id")
  deleteMovie(@Param("id") id: number): void {
    this.movieService.deleteMovie(id);  
  }
}

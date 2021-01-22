import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getMovies() : string {
    return "Get all movies";
  }

  @Get("/:id")
  getMovie(@Param("id") id: string) : string {
    return `Get the movie: ${id}`;
  }

  @Post()
  registerMovie(): string {
    return "Register a movie";
  }

  @Put("/:id")
  updateMovie(@Param("id") id: string): string {
    return `Update the movie: ${id}`;
  }

  @Patch("/:id")
  updateDetailOfMovie(@Param("id") id: string): string {
    return `Update a detail of the movie: ${id}`;
  }

  @Delete("/:id")
  deleteMovie(@Param("id") id: string): string {
      return `Delete the movie: ${id}`;
  }
}

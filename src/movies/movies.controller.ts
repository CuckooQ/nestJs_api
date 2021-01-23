import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getMovies() : string {
    return "Get all movies";
  }

  @Get("search")
  search(@Query("name") name: string): string {
    return `We are searching the title: ${name}`;
  }

  @Get("/:id")
  getMovie(@Param("id") id: string) : string {
    return `Get the movie: ${id}`;
  }

  @Post()
  registerMovie(@Body() movieData: any): string {
    return `Register a movie: ${movieData.name}`;
  }

  @Put("/:id")
  updateMovie(@Param("id") id: string): string {
    return `Update the movie: ${id}`;
  }

  @Patch("/:id")
  updateDetailOfMovie(@Param("id") id: string, @Body() movieData: any): string {
    return `Update a detail of the movie: ${id}, ${movieData.description}`;
  }

  @Delete("/:id")
  deleteMovie(@Param("id") id: string): string {
      return `Delete the movie: ${id}`;
  }
}

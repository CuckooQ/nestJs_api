import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-video.dto';
import { UpdateMovieDto } from './dto/update-video.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie {
    // +id == parseInt(id)
    const seltectedMovie: Movie 
      = this.movies.find((movie: Movie) => movie.id === +id);
    
    if(!seltectedMovie) {
      throw new NotFoundException(`Movie with id ${id} not found.`);  
    }
    
    return seltectedMovie;
  }

  getdMoviesByText(text: string): Movie[] {
    return this.movies.filter((movie: Movie) => movie.title.includes(text));
  }
   
  registerMovie(movie: CreateMovieDto): void {
    const newMovie: Movie = {
      id: this.movies.length,
      createDate: new Date(Date.now()).toString(),
      updateDate: new Date(Date.now()).toString(),
      ...movie
    }
    this.movies.push(newMovie);
  }

  updateMovie(id: number, movie: UpdateMovieDto): void {
    let selectedMovie: Movie = this.getMovieById(id);
    selectedMovie = {
      ...selectedMovie,
      updateDate: new Date(Date.now()).toString(),
      ...movie,
    };
    
    this.movies = this.movies.map((mo: Movie) => 
      (mo.id === selectedMovie.id) ? selectedMovie : mo
    );
  }
  
  deleteMovie(id: number): void {
    this.movies = this.movies.filter((movie: Movie)=> movie.id !== +id);
  }
}

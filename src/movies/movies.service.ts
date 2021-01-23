import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: string): Movie {
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
   
  registerMovie(movie: Movie): void {
    movie = {
      id: this.movies.length,
      createDate: Date.now,
      updateDate: Date.now,
      ...movie
    }
    this.movies.push(movie);
  }

  updateMovie(id: string, movie: Movie): void {
    let selectedMovie: Movie = this.getMovieById(id);
    selectedMovie = {
      ...selectedMovie,
      updateDate: Date.now,
      ...movie,
    };
    
    this.movies = this.movies.map((mo: Movie) => 
      (mo.id === selectedMovie.id) ? selectedMovie : mo
    );
  }
  
  deleteMovie(id: string): void {
    this.movies = this.movies.filter((movie: Movie)=> movie.id !== +id);
  }
}

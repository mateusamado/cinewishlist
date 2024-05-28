import { makeAutoObservable } from "mobx";
import { searchMovies, getMovieDetails } from "../services/api";

class MovieViewModel {
  movies = [];
  selectedMovie = null;

  constructor() {
    makeAutoObservable(this);
  }

  async search(query) {
    const response = await searchMovies(query);
    this.movies = response.data.results;
  }

  async selectMovie(id) {
    const response = await getMovieDetails(id);
    this.selectedMovie = response.data;
  }
}

export default new MovieViewModel();

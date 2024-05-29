import { makeAutoObservable } from "mobx";
import { searchMovies, getMovieDetails } from "../services/api";

class MovieViewModel {
  movies = [];
  selectedMovie = null;
  toWatchList = [];

  constructor() {
    makeAutoObservable(this);
    this.loadToWatchList();
  }

  async search(query) {
    const response = await searchMovies(query);
    this.movies = response.data.results;
  }

  async selectMovie(id) {
    const response = await getMovieDetails(id);
    this.selectedMovie = response.data;
  }

  markAsToWatch(movieId) {
    const movie = this.movies.find((m) => m.id === movieId);
    if (movie && !this.toWatchList.includes(movie)) {
      this.toWatchList.push(movie);
    }
  }

  loadToWatchList() {
    const toWatchList = JSON.parse(localStorage.getItem("toWatchList")) || [];
    this.toWatchList = toWatchList;
  }

  saveToWatchList() {
    localStorage.setItem("toWatchList", JSON.stringify(this.toWatchList));
  }

  getToWatchList() {
    return this.toWatchList;
  }
}

export default new MovieViewModel();

import { makeAutoObservable } from "mobx";
import { searchMovies, getMovieDetails } from "../services/api";

class MovieViewModel {
  movies = [];
  selectedMovie = null;
  profiles = {};

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  async search(query) {
    const response = await searchMovies(query);
    this.movies = response.data.results;
  }

  async selectMovie(id) {
    const response = await getMovieDetails(id);
    this.selectedMovie = response.data;
  }

  markAsToWatch(movieId, profileId) {
    const movie = this.movies.find((m) => m.id === movieId);
    if (!this.profiles[profileId]) {
      this.profiles[profileId] = [];
    }
    if (movie && !this.profiles[profileId].includes(movie)) {
      this.profiles[profileId].push(movie);
      this.saveToLocalStorage();
    }
  }

  getToWatchList(profileId) {
    return this.profiles[profileId] || [];
  }

  saveToLocalStorage() {
    localStorage.setItem("movieViewModel", JSON.stringify(this.profiles));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem("movieViewModel");
    if (data) {
      this.profiles = JSON.parse(data);
    }
  }
}

const movieViewModel = new MovieViewModel();
export default movieViewModel;

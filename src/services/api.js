import axios from "axios";

const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = (query) =>
  api.get(`/search/movie`, { params: { query } });
export const getMovieDetails = (id) => api.get(`/movie/${id}`);

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import MovieViewModel from "../viewModels/MovieViewModel";
import MovieModal from "../components/MovieModal";
import "../styles/Home.css";

const Home = observer(() => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toWatchList, setToWatchList] = useState([]);

  useEffect(() => {
    const selectedProfileId = localStorage.getItem("selectedProfileId");
    const toWatchList = MovieViewModel.getToWatchList(selectedProfileId);
    setToWatchList(toWatchList);
  }, [toWatchList]);

  const handleSearch = async () => {
    await MovieViewModel.search(query);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const addToWatchList = (movieId) => {
    const selectedProfileId = localStorage.getItem("selectedProfileId");
    MovieViewModel.markAsToWatch(movieId, selectedProfileId);
  };

  return (
    <div className="home-container">
      <h1>Movie List</h1>
      <h2>To Watch List</h2>
      <div className="movies-container">
        {toWatchList.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Popularity:</strong> {movie.popularity}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre_ids}
            </p>
            <button onClick={() => openModal(movie)}>Details</button>
          </div>
        ))}
      </div>
      <h2>Search Results</h2>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="movies-container">
        {MovieViewModel.movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <button onClick={() => addToWatchList(movie.id)}>To Watch</button>
            <button onClick={() => openModal(movie)}>Details</button>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
});

export default Home;

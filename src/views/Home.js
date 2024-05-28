import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import MovieViewModel from "../viewModels/MovieViewModel";
import MovieModal from "../components/MovieModal";
import "../styles/Home.css";

const Home = observer(() => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    await MovieViewModel.search(query);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="home-container">
      <h1>Movie List</h1>
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

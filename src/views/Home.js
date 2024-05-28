import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import MovieViewModel from "../viewmodels/MovieViewModel";
import "../styles/Home.css";

const Home = observer(() => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    await MovieViewModel.search(query);
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
          </div>
        ))}
      </div>
    </div>
  );
});

export default Home;

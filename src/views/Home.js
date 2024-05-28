import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import MovieViewModel from "../viewmodels/MovieViewModel";

const Home = observer(() => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    await MovieViewModel.search(query);
  };

  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {MovieViewModel.movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Home;

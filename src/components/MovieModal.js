import React from "react";
import "../styles/MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
        />
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
      </div>
    </div>
  );
};

export default MovieModal;

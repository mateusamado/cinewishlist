import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../views/Home";
import MovieViewModel from "../viewModels/MovieViewModel";
import { searchMovies } from "../services/api";

jest.mock("../services/api");

const mockMovies = [
  {
    id: 1,
    title: "The Crack: Inception",
    overview:
      "Madrid, Spain, 1975; shortly after the end of the Franco dictatorship. Six months after the mysterious death of his lover, a prestigious tailor, a married woman visits the office of the young Germán Areta, a former police officer turned private detective, to request his professional services.",
    poster_path:
      "https://image.tmdb.org/t/p/w342/kzgPu2CMxBr4YZZxC1Off4cUfR9.jpg",
    release_date: "2019-10-04",
    popularity: 4.138,
    genres: 1853,
  },
  {
    id: 2,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path:
      "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-16",
    popularity: 97.679,
    genres: 18288053,
  },
];

describe("Home Component", () => {
  beforeEach(() => {
    searchMovies.mockResolvedValue({ data: { results: mockMovies } });
  });

  it("renders search input and button", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByPlaceholderText("Search for movies...")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("searches for movies and displays results", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Search for movies..."), {
      target: { value: "The Crack: Inception" },
    });
    fireEvent.click(getByText("Search"));

    await waitFor(() =>
      expect(MovieViewModel.movies.length).toBeGreaterThan(0)
    );

    expect(await findByText("The Crack: Inception")).toBeInTheDocument();
    expect(
      await findByText(
        "Madrid, Spain, 1975; shortly after the end of the Franco dictatorship. Six months after the mysterious death of his lover, a prestigious tailor, a married woman visits the office of the young Germán Areta, a former police officer turned private detective, to request his professional services."
      )
    ).toBeInTheDocument();
    expect(await findByText("The Dark Knight")).toBeInTheDocument();
    expect(
      await findByText(
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
      )
    ).toBeInTheDocument();
  });
});

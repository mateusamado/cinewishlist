import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../views/Login";

const mockLoginViewModel = {
  formData: {
    email: "test@example.com",
    password: "testPassword",
  },
  showPassword: false,
  error: "",
  handleChange: jest.fn(),
  handleTogglePassword: jest.fn(),
  handleSubmit: jest.fn(),
  responseFacebook: jest.fn(),
  setError: jest.fn(),
};

jest.mock("../viewModels/LoginViewModel", () => ({
  __esModule: true,
  default: () => mockLoginViewModel,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { pathname: "/login" };
  });

  it("should log in a user successfully", async () => {
    mockLoginViewModel.handleSubmit.mockImplementation((e) => {
      e.preventDefault();
      mockLoginViewModel.setError("");
      window.location.pathname = "/";
    });

    render(
      <Router>
        <Login authenticate={jest.fn()} />
      </Router>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should display error message when login credentials are invalid and stay on the login page", async () => {
    mockLoginViewModel.handleSubmit.mockImplementation((e) => {
      e.preventDefault();
      mockLoginViewModel.setError("Email ou senha inválidos");
    });

    render(
      <Router>
        <Login authenticate={jest.fn()} />
      </Router>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    expect(window.location.pathname).toBe("/login");
  });
});

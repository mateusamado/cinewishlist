import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../views/SignUp";

jest.mock("../viewModels/SignUpViewModel", () => ({
  __esModule: true,
  default: () => ({
    formData: {
      email: "test@example.com",
      password: "testPassword",
      name: "Test User",
      birthDate: "1990-01-01",
    },
    showPassword: false,
    error: "Email já existe. Por favor use um email diferente.",
    handleChange: jest.fn(),
    handleTogglePassword: jest.fn(),
    registerUser: jest.fn(() => ({ success: false })),
    setError: jest.fn(),
  }),
}));

describe("SignUp Component", () => {
  it("should register a user successfully", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Crie sua conta/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  it("should display error message when email is already registered", async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Crie sua conta/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Email já existe. Por favor use um email diferente.")
      ).toBeInTheDocument();
    });
  });
});

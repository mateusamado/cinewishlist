import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CreateProfile from "../views/CreateProfile";
import { BrowserRouter as Router } from "react-router-dom";

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: jest.fn(function (key, value) {
      store[key] = value.toString();
    }),
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

jest.mock("react-router-dom", () => {
  const navigate = jest.fn();
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigate,
  };
});

describe("CreateProfile Component", () => {
  it("should create a new profile", async () => {
    const { getByLabelText, getByTestId } = render(
      <Router>
        <CreateProfile />
      </Router>
    );

    const profileNameInput = getByLabelText("Nome do Perfil:");
    fireEvent.change(profileNameInput, { target: { value: "New Profile" } });

    const createButton = getByTestId("create-profile-button");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "profiles",
        expect.any(String)
      );

      expect(require("react-router-dom").useNavigate()).toHaveBeenCalled();
      expect(require("react-router-dom").useNavigate()).toHaveBeenCalledWith(
        "/profiles"
      );
    });
  });
});

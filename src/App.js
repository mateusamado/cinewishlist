import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import ListProfiles from "./views/ListProfiles";
import CreateProfile from "./views/CreateProfile";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = () => {
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/profiles" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login authenticate={authenticateUser} />}
        />
        <Route
          path="/profiles"
          element={isAuthenticated ? <ListProfiles /> : null}
        />
        <Route
          path="/create-profile"
          element={isAuthenticated ? <CreateProfile /> : null}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home logout={logoutUser} /> : null}
        />
      </Routes>
    </div>
  );
}

export default App;

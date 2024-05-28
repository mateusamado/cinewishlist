import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = () => {
    // Adicionar lógica para autenticar o usuário
    // Por exemplo, verificando se há um token de autenticação válido
    // Exemplo simples por enquanto
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    // Adicionar lógica para desautenticar o usuário
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Home logout={logoutUser} />
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
    </Routes>
  );
}

export default App;

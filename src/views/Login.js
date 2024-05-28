import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ authenticate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicionar a lógica para autenticar o usuário
    // Simulando por quanto uma autenticação simples apenas para demonstração
    if (
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
      authenticate();
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    birthDate: "",
    facebookId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.email === formData.email || user.facebookId === formData.id
    );
    if (existingUser) {
      setError("Email já existe. Por favor use um email diferente.");
      return;
    }

    const newUser = { ...formData };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Crie sua conta</h2>
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
          <label>Senha:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={handleTogglePassword}
            >
              <i className={`material-icons ${showPassword ? "visible" : ""}`}>
                {showPassword ? "visibility_off" : "visibility"}
              </i>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Data de nascimento:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Crie sua conta</button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;

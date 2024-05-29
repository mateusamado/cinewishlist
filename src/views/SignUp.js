import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import SignUpViewModel from "../viewModels/SignUpViewModel";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    formData,
    showPassword,
    error,
    handleChange,
    handleTogglePassword,
    registerUser,
    setError,
  } = SignUpViewModel();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerUser(formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            defaultValue=""
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              defaultValue=""
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
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue=""
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Data de nascimento:</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            defaultValue=""
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

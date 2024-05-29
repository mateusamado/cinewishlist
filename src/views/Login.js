import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import LoginViewModel from "../viewModels/LoginViewModel";
import "../styles/Login.css";

const Login = ({ authenticate }) => {
  const navigate = useNavigate();
  const {
    formData,
    showPassword,
    error,
    handleChange,
    handleTogglePassword,
    handleSubmit,
    responseFacebook,
    setError,
  } = LoginViewModel({ authenticate, navigate });

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
          <label>Senha:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
        <div>
          <LoginSocialFacebook
            appId="1179493686395436"
            fields="name,email,birthday"
            onResolve={responseFacebook}
            onReject={(error) => setError("Falha ao logar com o Facebook")}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;

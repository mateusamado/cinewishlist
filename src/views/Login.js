import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import "../styles/Login.css";

const Login = ({ authenticate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const user = storedUsers.find(
      (user) =>
        user.email === formData.email || user.facebookId === formData.facebookId
    );
    if (!user || user.password !== formData.password) {
      setError("Email ou senha inválidos");
      return;
    }
    authenticate();
    navigate("/");
  };

  const responseFacebook = (response) => {
    const { email, name, id, birthday } = response;
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(
      (user) => user.email === email || user.facebookId === ""
    );

    if (user) {
      if (user.facebookId === "") {
        setError("Email já possui cadastro na aplicação.");
      } else {
        authenticate();
        navigate("/");
      }
      return;
    }

    user = storedUsers.find((user) => user.facebookId === id);

    if (!user) {
      user = {
        email: email,
        name: name,
        password: "",
        birthDate: birthday
          ? new Date(birthday).toISOString().split("T")[0]
          : "",
        facebookId: id,
      };
      storedUsers.push(user);
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    authenticate();
    navigate("/");
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
            onResolve={(response) => {
              console.log(response);
              responseFacebook(response);
            }}
            onReject={(error) => {
              console.log(error);
              setError("Falha ao logar com o Facebook");
            }}
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

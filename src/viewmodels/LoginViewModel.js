import { useState } from "react";
import User from "../models/User";

const LoginViewModel = ({ authenticate, navigate }) => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (formData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) =>
        user.email === formData.email || user.facebookId === formData.facebookId
    );
    if (!user || user.password !== formData.password) {
      return { error: "Email ou senha inválidos" };
    }
    return { success: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    authenticate();
    navigate("/");
  };

  const handleFacebookResponse = async (response) => {
    const { email, name, id, birthday } = response;
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(
      (user) => user.email === email || user.facebookId === ""
    );

    if (user) {
      if (user.facebookId === "") {
        return { error: "Email já possui cadastro na aplicação." };
      } else {
        return { success: true };
      }
    }

    user = storedUsers.find((user) => user.facebookId === id);

    if (!user) {
      user = new User(
        email,
        "",
        name,
        birthday ? new Date(birthday).toISOString().split("T")[0] : "",
        id
      );
      storedUsers.push(user);
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    return { success: true };
  };

  const responseFacebook = async (response) => {
    const result = await handleFacebookResponse(response);
    if (result.error) {
      setError(result.error);
      return;
    }
    authenticate();
    navigate("/");
  };

  return {
    formData,
    showPassword,
    error,
    handleChange,
    handleTogglePassword,
    handleSubmit,
    responseFacebook,
    setError,
  };
};

export default LoginViewModel;

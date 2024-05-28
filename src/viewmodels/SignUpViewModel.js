import { useState } from "react";
import User from "../models/User";

const SignUpViewModel = () => {
  const initialFormData = new User("", "", "", "", "");
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

  const registerUser = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.email === formData.email || user.facebookId === formData.id
    );
    if (existingUser) {
      return { error: "Email já existe. Por favor use um email diferente." };
    }

    const newUser = new User(
      formData.email,
      formData.password,
      formData.name,
      formData.birthDate,
      ""
    );
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    return { success: true };
  };

  return {
    formData,
    showPassword,
    error,
    handleChange,
    handleTogglePassword,
    registerUser,
    setError,
  };
};

export default SignUpViewModel;

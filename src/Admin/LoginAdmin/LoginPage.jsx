import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error(`Please fill your username and password!`);
      return;
    }

    const adminEmail = process.env.REACT_APP_ADMIN_MAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username !== adminEmail) {
      toast.error(`Username is not correct!`);
      console.log(adminEmail);
      return;
    }

    if (password !== adminPassword) {
      toast.error(`Password is not correct!`);
      return;
    }

    if (username === adminEmail && password === adminPassword) {
      navigate("/adminpanel");
      toast.success(`Welcome, ${username}!`);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="login-form-container">
      <button
        className={`buttonLogin ${showForm ? "hide" : ""}`}
        onClick={toggleFormVisibility}
      >
        Login
      </button>
      <form
        onSubmit={handleSubmit}
        className={`login-form ${showForm ? "show" : ""}`}
      >
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username or email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

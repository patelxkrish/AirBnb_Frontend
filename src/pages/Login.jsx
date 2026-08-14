import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function validate({ username, password }) {
  const errors = {};
  if (!username.trim()) errors.username = "Username is required.";
  if (!password.trim()) errors.password = "Password is required.";
  return errors;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = validate({ username, password });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container-md" style={{ marginTop: "6%", marginBottom: "20.5%" }}>
      <form onSubmit={handleLogin}>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1 className="mb-3 pb-3">Welcome To Go-Far</h1>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              <div id="usernameHelp" className="form-text">
                *Kindly enter your username.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              <div id="passwordHelp" className="form-text">
                *Kindly enter your password.
              </div>
            </div>

            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
          <div className="col-2"></div>
        </div>
      </form>
    </div>
  );
}

export default Login;

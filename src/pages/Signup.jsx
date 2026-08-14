import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_RE = /\S+@\S+\.\S+/;

function validate({ username, email, password }) {
  const errors = {};
  if (!username.trim()) errors.username = "Username is required.";
  if (!email.trim() || !EMAIL_RE.test(email)) errors.email = "Valid email is required.";
  if (!password.trim() || password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    const newErrors = validate({ username, email, password });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await signup({ username, email, password });
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container-md" style={{ marginTop: "6%", marginBottom: "13.5%" }}>
      <form onSubmit={handleSignup}>
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              <div id="emailHelp" className="form-text">
                *Kindly enter your email.
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
                *Password must be at least 6 characters.
              </div>
            </div>

            <button type="submit" className="btn btn-dark">
              Sign Up
            </button>
          </div>
          <div className="col-2"></div>
        </div>
      </form>
    </div>
  );
}

export default Signup;

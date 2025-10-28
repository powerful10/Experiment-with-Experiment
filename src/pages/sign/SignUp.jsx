import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

export default function SignUp({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Server not available");

      const data = await res.json();
      alert(data.message || "Signup successful!");
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });
      navigate("/profile");
    } catch (err) {
      console.warn("Backend not running — demo mode activated");
      alert("Demo signup successful (no backend). Redirecting...");
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });
      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign up</button>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

export default function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Server not available");

      const data = await res.json();
      alert(data.message || "Login successful!");
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });
      navigate("/profile");
    } catch (err) {
      console.warn("Backend not running — demo mode activated");
      alert("Demo login successful (no backend). Redirecting...");
      const demoUser = { email, name: "Demo User" };
      localStorage.setItem("user", JSON.stringify(demoUser));
      setUser(demoUser);
      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin} className="auth-form">
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

        <button type="submit">Sign In</button>

        <div className="auth-links">
          <Link to="/recover">Forgot password?</Link>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

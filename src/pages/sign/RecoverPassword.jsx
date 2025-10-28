import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Server not available");

      const data = await res.json();
      alert(data.message || "If that email exists, we sent recovery instructions.");
    } catch (err) {
      console.warn("Backend not running — demo mode activated");
      alert("Demo mode: Pretend recovery email sent to " + email);
    }
  };

  return (
    <div className="auth-container">
      <h2>Recover Password</h2>
      <form onSubmit={handleRecover} className="auth-form">
        <label>Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Recovery Link</button>

        <div className="auth-links">
          <p>
            Remembered your password? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

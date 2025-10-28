import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user?.email || "Guest"}</h2>
      <p>This is your profile page.</p>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

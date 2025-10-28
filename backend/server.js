// backend/server.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

// open (or create) a local SQLite database file named users.db
const db = await open({
  filename: "./users.db",
  driver: sqlite3.Database,
});

// make users table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
`);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running. 🎉");
});

/*  SIGN UP  */
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*  SIGN IN  */
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ success: false, message: "Wrong password" });

    res.json({ success: true, message: "Login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*  RECOVER (mock)  */
app.post("/api/recover", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: "Email is required" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.json({
        success: true,
        message: "If that email exists, recovery instructions were sent.",
      });
    }

    res.json({
      success: true,
      message: "If that email exists, recovery instructions were sent.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));

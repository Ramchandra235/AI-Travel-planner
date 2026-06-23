const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const aiRoutes = require("./routes/aiRoutes");

const authMiddleware = require("./middleware/authMiddleware");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/ai", aiRoutes);

// Protected Profile Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("AI Travel Planner API Running");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
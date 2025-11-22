const express = require("express");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Simple test route
app.get("/", (req, res) => {
  res.send("Car Maintenance Log Running");
});

// Listen on Render port or 3000 locally
const PORT = process.env.PORT || 3000;
console.log("App started, about to listen on port", PORT);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

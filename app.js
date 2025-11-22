const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Use Render's PORT or fallback locally
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Car Maintenance Log Running");
});

// Tell Express to listen on Render's port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

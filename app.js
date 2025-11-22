const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const carRoutes = require("./routes/cars");

// Mount routes on the homepage
app.use("/", carRoutes);

// Listen on Render port or local 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

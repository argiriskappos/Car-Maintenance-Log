require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./config/passport")(passport); // Load Passport strategies

const app = express();

// -----------------------
// CONNECT TO DATABASE
// -----------------------
connectDB();

// -----------------------
// MIDDLEWARE
// -----------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----------------------
// SESSIONS (REQUIRED FOR AUTH)
// -----------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 Day
  })
);

// -----------------------
// PASSPORT INITIALIZATION
// -----------------------
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all EJS views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

// -----------------------
// ROUTES
// -----------------------
app.get("/", async (req, res) => {
  const Record = require("./models/MaintenanceRecord");
  const records = await Record.find({});
  res.render("records/index", { records });
});

// Main CRUD routes
const recordRoutes = require("./routes/records");
app.use("/records", recordRoutes);

// Authentication routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

// -----------------------
// PORT LISTENING (IMPORTANT FOR RENDER)
// --------

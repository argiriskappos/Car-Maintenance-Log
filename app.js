
// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const recordsRouter = require('./routes/records');
app.use('/', recordsRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Server start
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000")
);



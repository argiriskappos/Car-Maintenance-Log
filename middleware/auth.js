// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  // For APIs you might return 401; for web, redirect or flash message
  res.redirect('/'); // or res.status(401).send('Unauthorized');
}
module.exports = { ensureAuthenticated };

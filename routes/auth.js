// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  (req, res) => res.redirect('/records'));

// GitHub
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/', failureMessage: true }),
  (req, res) => res.redirect('/records'));

// Logout
router.get('/auth/logout', (req, res) => {
  req.logout(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

module.exports = router;

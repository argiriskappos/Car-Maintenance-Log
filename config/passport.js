const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  // Serialize & deserialize
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const providerId = profile.id;
      let user = await User.findOne({ provider: 'google', providerId });
      if (!user) {
        user = await User.create({
          provider: 'google',
          providerId,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  // GitHub Strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const providerId = profile.id;
      let email = profile.emails?.[0]?.value || null;
      let user = await User.findOne({ provider: 'github', providerId });
      if (!user) {
        user = await User.create({
          provider: 'github',
          providerId,
          displayName: profile.displayName || profile.username,
          email,
          avatar: profile.photos?.[0]?.value
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));
};

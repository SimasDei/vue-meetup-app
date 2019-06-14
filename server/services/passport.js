const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => done(error, user));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false);
        user.comparePassword(password, (error, isMatch) => {
          if (error) return done(error);
          if (!isMatch) return done(null, false);
          return done(null, user);
        });
      });
    },
  ),
);

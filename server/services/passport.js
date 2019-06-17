const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config/dev');
const User = require('../models/users');

/**
 * @auth - Alternative for session based authentication
 *  
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => done(error, user));
});
*/

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.id, (error, user) => {
      if (error) return done(error, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  }),
);

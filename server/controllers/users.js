const User = require('../models/users');
const passport = require('passport');

exports.getUsers = function(req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.getCurrentUser = function(req, res) {
  const user = req.user;
  if (!user) return res.sendStatus(422);
  return res.json(user);
};

exports.register = function(req, res) {
  const registerData = req.body;
  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  if (registerData.password !== registerData.password2) {
    return res.status(422).json({
      errors: {
        password: "password's do not match",
      },
    });
  }
  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({ errors });
    }
    return res.json(savedUser);
  });
};

exports.login = function(req, res, next) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate('local', (err, passportUser) => {
    if (err) return next(err);
    if (passportUser) {
      req.login(passportUser, err => {
        if (err) return next(err);
        return res.json(passportUser);
      });
    } else {
      return res.status(422).send({
        errors: {
          authentication: 'The server has exploded',
        },
      });
    }
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  return res.json({ status: 'Session Closed' });
};

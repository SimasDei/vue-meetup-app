const User = require('../models/users');

exports.getUsers = function(req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.register = function(req, res) {
  console.log('Ahoy Sailor o/');
  return res.json({ status: 'A OK!' });
};

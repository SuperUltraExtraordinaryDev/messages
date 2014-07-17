var mongoose = require('mongoose');
var User = mongoose.model('user');
var controller = {}

controller.index = [
  function(res, req, next) {
    User.find({}, function(err, users) {
      if(err) return next(err);
      res.json(users);
    });
  }
]

controller.new = [
  function(res, req) {
    res.render(''); // New user form
  }
]


controller.create = [
  function(res, req, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(req.body.password_digest, salt, function(err, hash) {    // Take in password from form field, salt and hash.
        res.body.password_digest = hash;                                   // Then store it in place of it in response body.
      });
    });
    next();
  },
  function(res, req, next) {
    User.create(req.body, function(err, post) {
      if(err) return next(err);
      res.redirect('/users');
    });
  }
];


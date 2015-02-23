"use strict";

var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
User = mongoose.model('User'),
jwt = require('jsonwebtoken'),
config = rRequire('config/config'),
ctrlHelpers = rRequire('app/utils/ctrlHelpers'),
handleHttpCodeError = ctrlHelpers.handleHttpCodeError,
createError = ctrlHelpers.createError;

var convertReqToUser = function(req) {
  var user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    country: req.body.country,
    city: req.body.city,
    role: req.body.role
  });

  return user;
}

var createAuthResponse = function (user){
  var profile = {
    email: user.email,
    role: user.role
  };

  //Generate Token
  var token = jwt.sign(profile, config.passport.secret, { expiresInMinutes: config.passport.tokenExpirationMinutes });
  return { user: profile, token : token };
}


module.exports = function (app) {
  app.use('/api/auth', router);
};

router.post('/register', function(req, res, next) {
  var userModel = convertReqToUser(req);

  User.register(new User(userModel), req.body.password, function(err, user) {
    if (err) return next(handleHttpCodeError(err));
    res.status(201).send(userModel);
  });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if(!username || !password ){
    return next(createError(400, 'Missing username or password'));
  }

  User.findOne({email: username}, function(err, user){
    if (err) return next(handleHttpCodeError(err));
    if(!user) return next(createError(404, 'Invalid username'));

    user.authenticate(password, function(err, user, passwordErr){
      if (err) return next(handleHttpCodeError(err));
      if(passwordErr) return next(createError(400, passwordErr.message));
      res.json(createAuthResponse(user));
    });
  });
});

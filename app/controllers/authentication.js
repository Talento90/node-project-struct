var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
User = mongoose.model('User'),
passport = require('passport'),
jwt = require('jsonwebtoken');


var createAuthResponse = function (req){
  var user = req.user._doc;

  var profile = {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  //Generate Token
  var token = jwt.sign(profile, 'mysecret', { expiresInMinutes: 5 });
  return { user: profile, token : token };
}

router.post('/register', function(req, res) {

  var userModel = {
    username : req.body.username,
    email: req.body.email
  };

  User.register(new User(userModel), req.body.password, function(err, user) {

    if (err) {
      return res.status(400).send(err);
    }

    res.status(201).send(user);
  });
});

router.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
  res.json(createAuthResponse(req));
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise, authentication has failed.
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), function(req, res) {
  res.json(createAuthResponse(req));
});


router.post('/facebook/token', passport.authenticate('facebook-token', { session: false }), function (req, res) {
  res.status(200).send(req.user);
});


router.get('/data', passport.authenticate('bearer', { session: false }), function(req, res) {
  res.json('Some restricted data...');
});


module.exports = function (app) {
  app.use('/auth', router);
};

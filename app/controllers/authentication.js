var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport');


router.post('/register', function(req, res) {

    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {

        if (err) {
            return res.status(400).send(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.status(201).send(user);
        });
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = function (app) {
  app.use('/auth', router);
};

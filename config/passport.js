var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;
var jwt = require('jsonwebtoken');
var User  = require('../app/models/user');


module.exports = function(passport, config){

  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(new BearerStrategy(
    function(token, done) {

      //Check if token is valid
      jwt.verify(token, config.passport.secret, function(err, decoded){

        if(err){
          return done(null, false, err.message);
        }

        return done(null, decoded);
      });
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: config.passport.facebook.clientID,
    clientSecret: config.passport.facebook.clientSecret,
    callbackURL: config.passport.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({ facebookId: profile.id }, function(err, user) {
      if(err) { return done(err, null); }

      //Search if exist user with same email
      User.findOne({ email: profile._json.email }, function(err, user) {
        if(err) { return done(err, null); }

        //Exists user with same email
        if(user){
          //Update User
          user._doc.facebookId = profile._json.id;
          user._doc.firstName = user.firstName || profile._json.first_name;
          user._doc.lastName = user.lastName || profile._json.last_name;

          user.save(function (err, user) {
            if (err){ return done(err, null); }
            return done(err, user);
          });

        }else{
          //Create new user
          user = {
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            email: profile._json.email
          };

          User.create(user, function(err, user){
            if(err){ return done(err, null); }
            return done(err, user);
          });
        }

      });
    });
  }));

  passport.use(new FacebookTokenStrategy({
    clientID: config.passport.facebook.clientID,
    clientSecret: config.passport.facebook.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }));

}

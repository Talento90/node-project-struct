var LocalStrategy    = require('passport-local').Strategy;
var User  = require('../app/models/user');





module.exports = function(passport){

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

}

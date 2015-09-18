var mongoose = require('mongoose'),
User = mongoose.model('User'),
jwt = require('jsonwebtoken'),
config = require('config');

var AUTH_HEADER = "authorization";
var DEFAULT_AUTH_SCHEME = "jwt";

var jwtOpts = {
  issuer: '',
  audience: '',
  tokenBodyField: '',
  tokenHeader: ''
};


var createError = function(status, message){
  var error = new Error(message);
  error.status = status;
  return error;
};


module.exports.isAuthorized = function (roles) {
  return function(req, res, next) {

    var userRole = req.user.role;

    if(!userRole){
      return next(createError(401,'No authorization'));
    }

    for (var i = 0; i < roles.length; i++){
          if(roles[i] === userRole) return next();
    }

    return res.send(401, 'No authorization')
  }
}

module.exports.isAuthenticated = function(req, res, next) {
  var authentication = req.headers[AUTH_HEADER];

  if(!authentication) {
    return next(createError(401,'Missing authorization header'));
  }

  var values = authentication.split(' ');

  if(values.length != 2){
    return next(createError(401, 'Invalid Authorization header'));
  }

  var schema = values[0].toLowerCase();
  var token = values[1];

  if(schema != DEFAULT_AUTH_SCHEME){
    return next(createError(401, 'Invalid Schema'));
  }

  jwt.verify(token, config.jwt.secret, function(err, decoded){
    if(err){
      return next(createError(401, err.message));
    }

    //Check if user exists
    User.findById(decoded.id, function(err, user) {
      if (err) return next(err);

      if (user) {
        req.user = user; //Add user property to request
        return next();
      } else {
        return next(createError(401, 'Invalid user'));
      }
    });
  });
}

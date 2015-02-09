//User Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  email: {type: String, required: true},
  username: {type: String},
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  city: String,
  createdDate: { type: Date, default: Date.now },
  facebookId: String
});


UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);

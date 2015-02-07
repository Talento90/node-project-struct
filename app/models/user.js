//User Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  city: String,
  createdDate: { type: Date, default: Date.now },
});


UserSchema.plugin(passportLocalMongoose, {usernameField: 'username'});

module.exports = mongoose.model('User', UserSchema);

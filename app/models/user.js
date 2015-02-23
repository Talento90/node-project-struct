"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: {type: String, required: true, index: true },
  firstName: String,
  lastName: String,
  role: {type: String, enum: ['user', 'admin'], required: true},
  createdDate: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'username'}); //Create Hash and Salt Field

module.exports = mongoose.model('User', UserSchema);

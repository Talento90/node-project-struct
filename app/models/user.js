"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  email: {type: String, required: true, index: true },
  firstName: String,
  lastName: String,
  role: {type: String, enum: ['user', 'admin'], required: true},
  createdDate: { type: Date, default: Date.now }
});


UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'}); //Create Hash and Salt Field


UserSchema.methods.getViewModel = function(){
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      createdDate: this.createdDate
    };
};

module.exports = mongoose.model('User', UserSchema);

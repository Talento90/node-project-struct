"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: String,
  completed: Boolean,
  createdBy: {type: String, required: true},
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);

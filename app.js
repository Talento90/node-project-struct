var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  passport = require('passport');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

//Configure PassportJs
require('./config/passport')(passport, config);

//Configure ExpressJs
var app = express();
require('./config/express')(app, passport, config);

app.listen(config.port);

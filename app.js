"use strict";

//Create a wrapper for require - rRequire('path')
global.rRequire = function(name) {
    return require(__dirname + '/' + name);
}

var express = require('express'),
  config = rRequire('config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  logger = rRequire('libs/logger');

//Connect to mongo database
mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', function () {
  logger.error('unable to connect to database at ' + config.db);
});

//Load all Mongoose models
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

//Configure Expressjs
var app = express();
require('./config/express')(app, config);

//Start WebServer
app.listen(config.port);
logger.info('['+ config.environment + '] - Application running at port: ' + config.port);

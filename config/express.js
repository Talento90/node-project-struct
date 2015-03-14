"use strict";

var express = require('express');
var glob = require('glob');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var logger = rRequire('libs/logger');

module.exports = function(app, config) {
  //Need to put in Configs (dev,common,short) common is apache style
  //Output stream for writing log lines, defaults to process.stdout
  morgan.token('processId', function(req, res){ return process.pid; });
  app.use(morgan(config.morgan, { "stream": logger.stream }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  app.disable('x-powered-by');

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  /*Handle 404 Error*/
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    logger.info('Error handling request', {error: err});
    res.status(err.status || 500).send({message: err.message});
  });

};

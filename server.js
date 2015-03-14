
module.exports = function() {
  var config = require('./config'),
  express = require('express'),
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
  logger.info('['+ config.environment + '-' + process.pid + '] - Application running at port: ' + config.port);
}

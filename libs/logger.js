'use strict';

var config = rRequire('config');
var fs = require( 'fs' );
var winston = require('winston');


//Create directory if not exists
if(config.logger.dirname){
  if ( !fs.existsSync(config.logger.dirname) ) {
    fs.mkdirSync( config.logger.dirname );
  }
}

var logger = new winston.Logger({
  transports: config.logger.transports,
  exitOnError: false
});

module.exports = logger;

module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

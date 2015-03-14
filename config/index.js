var path = require('path'),
winston = require('winston'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';


var config = require('./' + env)(winston);
config.root = rootPath;
config.environment = env;
module.exports = config;

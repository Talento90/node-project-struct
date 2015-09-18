"use strict";
require('app-module-path').addPath(__dirname);

var config = require('config');
var server = require('server');


//Check if clustering is activated
if(config.clustering){
  require('./libs/clustering')(server);
}else{
  server();
}

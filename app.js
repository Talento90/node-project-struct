"use strict";

//Create a wrapper for require - rRequire('path')
global.rRequire = function(name) {
  return require(__dirname + '/' + name);
}

var config = rRequire('config');
var server = rRequire('server');


//Check if clustering is activated
if(config.clustering){
  rRequire('libs/clustering')(server);
}else{
  server();
}

var cluster = require('cluster');
var os = require('os');
var logger = require('./logger');


cluster.on('exit', function(worker, code) {
  if(code != 0 && !worker.suicide) {
    logger.info('Worker crashed.', worker.process.pid, 'Starting a new worker');
    cluster.fork();
  }
});

cluster.on('online', function(worker){
	logger.info('Start a worker process (workerid) ', worker.process.pid);
});


module.exports = function(wordToDo){
  if(cluster.isMaster) {
    var cpus = os.cpus().length;
    //Start as many children as the number of CPUs
    for (var i = 0; i < cpus; i++) {
      cluster.fork();
    }
  } else {
    wordToDo();
  }
}

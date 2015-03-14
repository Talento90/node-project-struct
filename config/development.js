
module.exports = function(winston){

  var config = {
    app: {
      name: 'node-project-struct'
    },
    clustering: true,
    port: 3000,
    db: 'mongodb://localhost:27017/node-project-struct-dev',
    morgan: ':processId :method :url :status :response-time ms - :res[content-length]', //Check https://github.com/expressjs/morgan
    logger: {
      dirname: __dirname + '/../logs',
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true
        }),
        new winston.transports.DailyRotateFile({
          datePattern: '.yyyy-MM-dd',
          filename: __dirname + '/../logs/nodeprojectstruct.log',
          level: 'info',
          handleExceptions: true,
          json: true,
          maxsize: '5242880', //5MB
          colorize: false
        })
      ]
    },
    jwt: {
      secret: 'mysecret',
      tokenExpirationMinutes: 5
    }
  };

  return config;
};

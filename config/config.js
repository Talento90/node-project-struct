var path = require('path'),
winston = require('winston'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';


var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node-auth'
    },
    port: 3000,
    db: 'mongodb://localhost:27017/node-auth-dev',
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
          filename: __dirname + '/../logs/node-auth.log',
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
      tokenExpirationMinutes: 60
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'node-auth'
    },
    port: 3000,
    db: 'mongodb://localhost/node-auth-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'node-auth'
    },
    port: 3000,
    db: 'mongodb://localhost/node-auth-production'
  }
};

config[env].environment = env;
module.exports = config[env];

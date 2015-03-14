
module.exports = function(winston){

  var config = {
    app: {
      name: 'tourstracker'
    },
    port: process.env.PORT,
    db: 'production-db-connection-string',
    morgan: 'common',
    logger: {
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true
        })
      ]
    },
    jwt: {
      secret: 'mysecret',
      tokenExpirationMinutes: 120
    }
  };

  return config;
}

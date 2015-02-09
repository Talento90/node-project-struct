var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';


var config = {
  development: {
    root: rootPath,
    app: {
      name: 'sso-node'
    },
    port: 3001,
    db: 'mongodb://localhost:27017/sso',
    passport: {
      secret: 'mysecret',
      tokenExpirationMinuts: 5,
      facebook: {
        clientID: '1714893965403614', // your App ID
        clientSecret: '75be3f2a6ca946a96788bf1f81230d99', // your App Secret
        callbackURL: 'http://localhost:3001/auth/facebook/callback'
      }
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'sso-node'
    },
    port: 3000,
    db: 'mongodb://localhost/sso-node-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'sso-node'
    },
    port: 3000,
    db: 'mongodb://localhost/sso-node-production'
  }
};

module.exports = config[env];

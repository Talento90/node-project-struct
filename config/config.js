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
      facebookAuth: {
        clientID: 'your-secret-clientID-here', // your App ID
        clientSecret: 'your-client-secret-here', // your App Secret
        callbackURL: 'http://localhost:' + this.port + '/auth/facebook/callback'
      },
      twitterAuth: {
        consumerKey: 'your-consumer-key-here',
        consumerSecret: 'your-client-secret-here',
        callbackURL: 'http://localhost:' + this.port + '/auth/twitter/callback'
      },
      googleAuth: {
        clientID: 'your-secret-clientID-here',
        clientSecret: 'your-client-secret-here',
        callbackURL: 'http://localhost:'+ this.port +'/auth/google/callback'
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

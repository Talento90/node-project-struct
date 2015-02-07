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
    db: 'mongodb://localhost:27017/sso'
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

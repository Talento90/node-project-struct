'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-node-inspector');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: ["node_modules/**", ".git/", "Gruntfile.js"]
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 9000,
          'web-host': 'localhost',
          'debug-port': 5857,
          'save-live-edit': true,
          'no-preload': false // Disables preloading *.js to speed up startup
        }
      }
    },
    jshint: {
      src: ['app.js','app/**/*.js' ],
      options: {
        node: true,
        reporter: 'checkstyle', // Reporter options control output to file
        reporterOutput: './reports/checkstyle.xml',
        force: true
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'xunit',
          captureFile: 'reports/testResults.xml',
          quiet: false // Suppress output to standard out (defaults to false)
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('inspector', ['node-inspector']);
  grunt.registerTask('build', ['jshint', 'mochaTest']);
};

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
          ext: 'js,html',
          watch: ['app.js', 'config/**/*.js', 'app/**/*.js', 'lib/**/*.js']
        }
      },
      debug: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: ['app.js', 'config/**/*.js', 'app/**/*.js', 'lib/**/*.js']
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    'node-inspector': {
      debug: { }
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

  grunt.registerTask('default', ['concurrent:dev']);
  grunt.registerTask('debug', ['concurrent:debug']);
  grunt.registerTask('build', ['jshint', 'mochaTest']);
};

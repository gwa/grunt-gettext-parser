/*
 * grunt-gettext-parser
 * https://github.com/gwa/grunt-gettext-parser
 *
 * Copyright (c) 2015 Great White Ark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    gettext_parser: {
      wordpress: {
        options: {
            textdomain: 'bar',
        },
        files: {
          'tmp/wordpress.php': ['test/fixtures/index.twig', 'test/fixtures/wp/*.php']
        }
      },

      wordpress_add_textdomain: {
        options: {
            textdomain: 'bar',
            add_textdomain: true
        },
        files: {
          'tmp/wordpress_add_textdomain.php': ['test/fixtures/index.twig', 'test/fixtures/wp/*.php']
        }
      },

      wordpress_custom_function: {
        options: {
            textdomain: 'bar',
            output_function: 'fooMethod',
        },
        files: {
          'tmp/wordpress_custom_function.php': ['test/fixtures/index.twig', 'test/fixtures/wp/*.php']
        }
      },

      drupal: {
        options: {
            style: 'drupal',
        },
        files: {
          'tmp/drupal.php': ['test/fixtures/drupal.twig']
        }
      },

      i18n: {
        options: {
            style: 'i18n',
        },
        files: {
          'tmp/i18n.php': ['test/fixtures/i18n.twig']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'gettext_parser', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

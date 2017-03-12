'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gettext_parser = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },

  default_options: function(test) {
    test.expect(3);

    var actual = grunt.file.read('tmp/wordpress.php');
    var expected = grunt.file.read('test/expected/wordpress.php');
    test.equal(actual, expected, 'parses and extracts gettext calls from wordpress PHP and twig files.');

    actual = grunt.file.read('tmp/drupal.php');
    expected = grunt.file.read('test/expected/drupal.php');
    test.equal(actual, expected, 'parses and extracts gettext calls from drupal twig files.');

    actual = grunt.file.read('tmp/i18n.php');
    expected = grunt.file.read('test/expected/i18n.php');
    test.equal(actual, expected, 'parses and extracts gettext calls from twig files using the i18n extension.');

    test.done();
  },

  add_textdomain: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/wordpress_add_textdomain.php');
    var expected = grunt.file.read('test/expected/wordpress_add_textdomain.php');
    test.equal(actual, expected, 'adds the textdomain to the rendered functions.');

    test.done();
  },

  custom_function_option: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/wordpress_custom_function.php');
    var expected = grunt.file.read('test/expected/wordpress_custom_function.php');
    test.equal(actual, expected, 'writes a custom function call.');

    test.done();
  },

};

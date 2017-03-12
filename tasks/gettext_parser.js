/*
 * grunt-gettext-parser
 * https://github.com/gwa/grunt-gettext-parser
 *
 * Copyright (c) 2017 Great White Ark
 * Licensed under the MIT license.
 */

'use strict';

var ParserWordpress = require('./parser/parser_wordpress');
var ParserDrupal = require('./parser/parser_drupal');
var ParserI18n = require('./parser/parser_i18n');

module.exports = function(grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var options = {};

    grunt.registerMultiTask('gettext_parser', 'Extract gettext calls to a single file.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        options = this.options({
            style: 'wordpress',
            textdomain: null,
            output_function: 'gettext',
            add_textdomain: false
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var files = f.src.filter(filterFilepath),
                parser = getParser(options.style),
                calls = [],
                output = '<?php\n';

            files.forEach(function(filepath) {
                var i,
                    filecalls = parser.parse(grunt.file.read(filepath));

                for (i in filecalls) {
                    calls.push(filecalls[i]);
                }
            });

            if (calls.length) {
                output += calls.join(';\n');
                output += ';\n';
            }

            // Write the destination file.
            grunt.file.write(f.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

    /**
     * @param {String} filepath
     * @return {Boolean}
     */
    function filterFilepath(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
        }

        return true;
    }

    /**
     * @param {String} style
     * @return {Object}
     */
    function getParser(style) {
        switch (style) {
            case 'i18n':
                return new ParserI18n(options);
            case 'drupal':
                return new ParserDrupal(options);
            default:
                return new ParserWordpress(options);
        }
    }
};

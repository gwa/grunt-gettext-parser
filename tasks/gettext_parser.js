/*
 * grunt-gettext-parser
 * https://github.com/gwa/gettext-parser
 *
 * Copyright (c) 2015 Great White Ark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var PATTERN_WORDPRESS = /_[_e]\((['"])((?:(?!\1).)*)\1,\s?\1((?:(?!\1).)*)\1/g;

    grunt.registerMultiTask('gettext_parser', 'Extract gettext calls to a single file.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            textdomain: null
        });

        grunt.log.writeln('Parsing domain "' + options.textdomain + '".');

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            // Concat specified files.
            var files = f.src.filter(filterFilepath),
                calls = [],
                pattern = PATTERN_WORDPRESS,
                output = '<?php\n';

            files.forEach(function(filepath) {
                var i, filecalls = getCallsInFile(filepath, pattern, options.textdomain);
                for (i in filecalls) {
                    calls.push(filecalls[i]);
                }
            });


            output += calls.join(';\n');
            output += ';\n';
            // Write the destination file.

            grunt.file.write(f.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');

        });

    });

    /**
     * @param String filepath
     * @return Boolean
     */
    function filterFilepath(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
        } else {
            return true;
        }
    }

    /**
     * @param String filepath
     * @param String pattern
     * @param String textdomain
     * @return Array
     */
    function getCallsInFile(filepath, pattern, textdomain) {
        var source = grunt.file.read(filepath),
            match,
            calls = [];

        while (match = pattern.exec(source)) {
            if (!textdomain || textdomain === getWordpressMatchTextDomain(match)) {
                calls.push(formatWordpressMatch(match));
            }
        }

        return calls;
    }

    /**
     * @param Array match
     * @return String
     */
    function getWordpressMatchTextDomain(match) {
        return match[3];
    }

    /**
     * @param Array match
     * @return String
     */
    function formatWordpressMatch(match) {
        return getGettextCall(match[2]);
    }

    /**
     * @param String slug
     * @return String
     */
    function getGettextCall(slug) {
        return "gettext('" + slug + "')";
    }

};

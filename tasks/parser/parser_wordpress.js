'use strict';

function Parser(options) {

    var PATTERN = /_[_e]\(\s?(['"])((?:(?!\1).)*)\1,\s?\1((?:(?!\1).)*\s?)\1/g;

    /**
     * @param {String} source
     * @return {Array}
     */
    function parseCalls(source) {
        var match,
            calls = [];

        while (match = PATTERN.exec(source)) {
            if (!options.textdomain || options.textdomain === getMatchedTextDomain(match)) {
                calls.push(formatGettextMatch(match));
            }
        }

        return calls;
    }

    /**
     * @param {Array} match
     * @return {String}
     */
    function getMatchedTextDomain(match) {
        return match[3];
    }

    /**
     * @param {Array} match
     * @return {String}
     */
    function formatGettextMatch(match) {
        return getGettextCall(match[2], match[3]);
    }

    /**
     * @param {String} slug
     * @return {String}
     */
    function getGettextCall(slug, textdomain) {
        if (options.add_textdomain) {
            return options.output_function + "('" + slug + "', '" + textdomain + "')";
        }

        return options.output_function + "('" + slug + "')";
    }

    return {
        parseCalls: parseCalls
    };
}

module.exports = Parser;

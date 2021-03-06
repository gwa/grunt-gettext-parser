'use strict';

function Parser(options) {

    var PATTERN = new RegExp('{{ ?([\'"])((?:(?!\\1).)*)\\1\\|t ?}}', 'g');

    /**
     * @param {String} source
     * @return {Array}
     */
    function parse(source) {
        var match,
            calls = [];

        while (match = PATTERN.exec(source)) {
            calls.push(formatGettextMatch(match));
        }

        return calls;
    }

    /**
     * @param {Array} match
     * @return {String}
     */
    function formatGettextMatch(match) {
        return getGettextCall(match[2]);
    }

    /**
     * @param {String} slug
     * @return {String}
     */
    function getGettextCall(slug) {
        return options.output_function + "('" + slug + "')";
    }

    return {
        parse: parse
    };

}

module.exports = Parser;

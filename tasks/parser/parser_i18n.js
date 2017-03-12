'use strict';

function Parser(options) {

    var PATTERN = new RegExp('{% ?trans ([\'"])((?:(?!\\1).)*)\\1\\ ?%}', 'g'),
        PATTERN_MULTILINE = /{% trans %}([\s\S]+?){% endtrans %}/gm;

    /**
     * @param {String} source
     * @return {Array}
     */
    function parse(source) {
        var match,
            calls = [];

        while (match = PATTERN.exec(source)) {
            calls.push(getGettextCall(match[2]));
        }

        while (match = PATTERN_MULTILINE.exec(source)) {
            calls.push(
                getGettextCall(
                    parseMultilineMatch(match[1])
                )
            );
        }

        return calls;
    }

    function parseMultilineMatch(source) {
        var pattern = /{{ ?(.+?) ?}}/g,
            match;

        while (match = pattern.exec(source)) {
            source = source.replace(match[0], '%' + match[1] + '%');
        }

        return source.trim();
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

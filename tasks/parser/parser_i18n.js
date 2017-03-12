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
            parseMultilineMatch(match[1]).forEach(function(value) {
                calls.push(
                    getGettextCall(value)
                );
            });
        }

        return calls;
    }

    /**
     * @param {String} source
     * @return {Array}
     */
    function parseMultilineMatch(source) {
        var pattern_variable = /{{ ?(.+?) ?}}/g,
            pattern_plural = /{% plural .+? %}/gm,
            match,
            singular,
            plural;

        while (match = pattern_variable.exec(source)) {
            source = source.replace(new RegExp(match[0], 'g'), '%' + match[1] + '%');
        }

        // Check for plural
        if (match = pattern_plural.exec(source)) {
            singular = source.substring(0, match.index).trim();
            plural = source.substring(match.index + match[0].length).trim();
            return[singular, plural];
        }

        return [source.trim()];
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

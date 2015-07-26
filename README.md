# grunt-gettext-parser

Extracts `gettext` calls for a specified textdomain from [twig](http://twig.sensiolabs.org/) templates in the [Timber](http://upstatement.com/timber/) framework to a single PHP file.

[grunt-pot](https://www.npmjs.com/package/grunt-pot) can subsequently be used to create a `.pot` file and update any existing `.po` files.

> Extract gettext calls from templates to a single file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gettext-parser --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gettext-parser');
```

## The "gettext_parser" task

### Overview
In your project's Gruntfile, add a section named `gettext_parser` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    gettext_parser: {
        your_target: {
            options: {
                textdomain: 'mydomain'
            },
            'path/to/output.php': ['views/**/*.twig']
        },
    },
});
```

### Options

#### textdomain

The textdomain to be parsed. gettext calls to other domains will be ignored. Set to `null` to parse all text domains.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

# grunt-gettext-parser

[![Build Status](https://travis-ci.org/gwa/grunt-gettext-parser.svg?branch=master)](https://travis-ci.org/gwa/grunt-gettext-parser)

> Extract gettext calls from templates to a single PHP file that can then be used to create a `.po` file for translations.

A grunt task that parses `gettext` calls from [twig](http://twig.sensiolabs.org/) ([i18n Extension](http://twig-extensions.readthedocs.io/en/latest/i18n.html), [Timber](http://upstatement.com/timber/) for Wordpress, or Drupal 8) files and creates a "dummy" PHP file with gettext calls.

The dummy file can then be parsed [using grunt-pot](https://www.npmjs.com/package/grunt-pot) to create a `.pot` or `.po` file.

### i18n

Running the task in `i18n` mode on the following:

```markup
<!-- twig template with i18n extension -->
<span>{{ trans "my text" }}</span>
<div>
{% trans %}
    other text with a {{ variable }}
{% endtrans %}
</div>
```

results in:

```php
<?php
gettext('my text');
gettext('other text with a %variable%');
```

### Wordpress

Running the task in `wordpress` mode for the `mydomain` text domain on the following:

```markup
<!-- twig template for Timer -->
<span>{{ __('my text', 'mydomain') }}</span>
<span>{{ __('other text', 'otherdomain') }}</span>
```

results in:

```php
<?php
gettext('my text');
```

(Note that `otherdomain` translations are excluded.)

### Drupal

Running the task in `drupal` mode on the following:

```markup
<!-- Drupal 8 module twig template -->
<span>{{ 'my text'|t }}</span>
```

also results in:

```php
<?php
gettext('my text');
```

[grunt-pot](https://www.npmjs.com/package/grunt-pot) can subsequently be used to create a `.pot` file and update any existing `.po` files.

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
                style: 'wordpress',
                textdomain: 'mydomain',
                // Changes the name of the rendered function. Defaults to `gettext`.
                output_function: 'myFunction'
            },
            'path/to/output.php': ['views/**/*.twig']
        },
    },
});
```

### Options

#### style

`wordpress` (default) or `drupal`.

#### textdomain

Wordpress only: The textdomain to be parsed. gettext calls to other domains will be ignored. Set to `null` to parse all text domains.

#### output_function

`gettext` (default)

#### add_textdomain

`false` (default)

Write the textdomain to the php file. Helpful for use with checktextdomain libraries.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

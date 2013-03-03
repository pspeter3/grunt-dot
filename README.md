# grunt-dot

> Precompile doT templates into a single file

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dot --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dot');
```

## The "dot" task

### Overview
In your project's Gruntfile, add a section named `dot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dot: { 
    compile: {
      options: {
        /*
         * root: Sets the json root
         * templateSettings: override doT's default settings 
         */
      },
      files: {
        'target': [/* Files */],
      }
    }
  }
})
```

### Options

#### options.root
Type: `String`

A string value that is the root key

#### options.fileExtensions
Type: `String`
Default value: `'dot'`

A string value that is the file extension for the template

#### options.templateSettings
Type: `Object`
Default value: `{selfcontained: true}`

A string value that is the file extension for the template

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.1 Basic version working

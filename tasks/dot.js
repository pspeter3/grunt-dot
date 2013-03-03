/*
 * grunt-dot
 * https://github.com/pspeter3/grunt-dot
 *
 * Copyright (c) 2013 Phips Peter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('dot', 'Compiles templates', function() {
    // Required modules
    var dot = require('dot');
    var path = require('path');
    var util = require('util');
    var toSource = require('tosource');

    // Assigns to the template object
    var assign = function(obj, keyPath, value) {
      var lastKeyIndex = keyPath.length - 1;
      for (var i = 0; i < lastKeyIndex; ++i) {
        var key = keyPath[i];
        if (!(key in obj)) obj[key] = {}
        obj = obj[key];
      }
      obj[keyPath[lastKeyIndex]] = value;
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      templateSettings: {
        selfcontained: true
      },
      fileExtention: 'dot'
    });

    // Merge template settings
    for (var key in options.templateSettings) {
      dot.templateSettings[key] = options.templateSettings[key];
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).reduce(function(templates, filepath) {
        var names = filepath.split(path.sep);
        if (options.fileExtention) {
          names[names.length - 1] = names[names.length - 1].replace('.' + options.fileExtention, '');
        }
        var template = dot.template(grunt.file.read(filepath));
        assign(templates, names, template);
        return templates;
      }, {});

      if (options.root && src[options.root]) {
        src = src[options.root];
      }

      var js = util.format('define(function(){return %s;});', toSource(src));

      // Write the destination file.
      grunt.file.write(f.dest, js);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
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
    // Assigns to the template object
    var assign = function(obj, keyPath, value) {
       var lastKeyIndex = keyPath.length-1;
       for (var i = 0; i < lastKeyIndex; ++ i) {
         var key = keyPath[i];
         if (!(key in obj))
           obj[key] = {}
         obj = obj[key];
       }
       obj[keyPath[lastKeyIndex]] = value;
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      templateSettings: { selfcontained: true }
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
        var template = dot.template(grunt.file.read(filepath)).toString();
        assign(templates, names, template);
        return templates;
      }, {});

      if (options.root && src[options.root]) {
        src = src[options.root];
      }
      
      src = JSON.stringify(src);
      src = src.replace(/\\n/g, '');
      var matches = src.match(/".+?":".+?"/g);
      matches.forEach(function(fn) {
        var match = fn.match(/"(.+?)":"(.+?)"/);
        var str = util.format('"%s":%s', match[1], match[2]);
        src = src.replace(fn, str);
      });

      src = util.format('define(function(){return %s});', src);

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};

/*
 * grunt-dox
 * https://github.com/mattmcmanus/grunt-dox
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    rimraf = require('rimraf');


module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('dox', 'Generate dox output ', function() {

    var dir = this.filesSrc,
        dest = this.data.dest,
        done = this.async(),
        doxPath = path.resolve(__dirname,'../'),
        _opts = this.options(),
        _args = [];

    // Absolute path to the formatter
    var formatter = [doxPath, 'node_modules', '.bin', 'dox-foundation'].join(path.sep);

    // Cleanup any existing docs
    rimraf.sync(dest);

    _args.push('--source');
    _args.push(dir);
    _args.push('--target');
    _args.push(dest);

    // Set options to arguments
    if(_opts.title){
      _args.push('--title');
      _args.push(_opts.title);
    }


    exec(formatter + ' ' + _args.join(" "), {maxBuffer: 5000*1024}, function(error, stout, sterr){
      if (error) grunt.log.error("WARN:  "+ error);
      if (!error) {
        grunt.log.ok('Directory "' + dir + '" doxxed.');
        done();
      }
    });
  });

};

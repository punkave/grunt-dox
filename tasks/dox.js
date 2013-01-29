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

function parentDir(files) {
  var dirs = [];

  files.forEach(function(file){
    // Grab the first folder listed
    var dir = path.dirname(file).split(path.sep)[0];

    if (dirs.indexOf(dir) == -1) {
      dirs.push(dir);
    }
  });

  if (dirs.length > 1) {
    dirs = parentDir(dirs);
  }

  return dirs;
}

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('dox', 'Generate dox output ', function() {
    
    var files = grunt.file.expandFiles(this.file.src),
        dest = this.file.dest;
        done = this.async(),
        doxPath = path.resolve(__dirname,'../') + path.sep;
    
    var formatter = [doxPath, 'node_modules', '.bin', 'dox-foundation'].join(path.sep);
    
    var dir = parentDir(files);

    // Cleanup any existing docs
    rimraf.sync(dest);

    exec(formatter + ' --source "' + dir + '" --target ' + dest, {maxBuffer: 5000*1024}, function(error, stout, sterr){
      if (error) grunt.log.error("WARN:  "+ error);
      if (!error) {
        grunt.log.writeln('Directory "' + dir + '" doxxed.');
        done();
      };
    });
  });

};
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
    
    var files = grunt.file.expandFiles(this.file.src),
        dest = this.file.dest;
        done = this.async(),
        doxCmd = '',doxPath = path.resolve(__dirname,'../') + path.sep;
    
    // Cleanup any existing docs
    rimraf.sync(dest);

    // A nasty way, but it solves it, currently, we use cat here instead of type
    // I can't seeem to get type to pass the string on to dox-foundation atm
    // We currently assume that windows users have unix-shell commands baked in with cmd (for example, mSysGit installed)
    if(process.platform == 'win32'){

      doxCmd = 'cat ' + files.join(' ') + ' |' + doxPath + 'node_modules' + path.sep + '.bin' + path.sep + 'dox-foundation.cmd';
    } else {

      doxCmd = 'cat ' + files.join(' ') + ' |' + doxPath + 'node_modules' + path.sep + '.bin' + path.sep + 'dox-foundation';
    }

    exec(doxCmd, function(error, stout, sterr){
      grunt.file.write(dest + '/' + 'api.html', stout);
      grunt.log.writeln('Files \n"' + files.join('\n') + '" doxxed.');
      if (!error) done();
      if (error) grunt.log.writeln("ERROR "+ error);
      
    })
  });

};
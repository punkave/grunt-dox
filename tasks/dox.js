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
    
    if(process.platform == 'win32'){

      doxCmd = 'type ' + path.normalize(files) + ' | ' + doxPath + 'node_modules' + path.sep + '.bin' + path.sep + 'dox-foundation';
    } else {

      doxCmd = 'cat ' + files.join(' ') + ' | ' + doxPath + 'node_modules' + path.sep + '.bin' + path.sep + 'dox-foundation';
    }
    

    exec(doxCmd, {maxBuffer: 5000*1024}, function(error, stout, sterr){
      grunt.file.write(dest + '/' + 'api.html', stout);
      grunt.log.writeln('Files \n"' + files.join('\n') + '" doxxed.');
      if (!error) done();
      if (error) grunt.log.error("WARN:  "+ error);
      
    })
  });

};
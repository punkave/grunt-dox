/*
 * grunt-dox
 * https://github.com/mattmcmanus/grunt-dox
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec,
    fs = require('fs'),
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
        done = this.async();
    
    // Cleanup any existing docs
    rimraf.sync(dest);

    exec('cat ' + files.join(' ') + ' | dox-foundation', function(error, stout, sterr){
      grunt.file.write(dest + '/' + 'api.html', stout);
      grunt.log.writeln('Files "' + files.join(' ') + '" doxxed.');
      if (!error) done();
    })
  });

};

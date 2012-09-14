/*
 * grunt-dox
 * https://github.com/mattmcmanus/grunt-dox
 *
 * Copyright (c) 2012 Matt McManus
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec;

var fs = require('fs');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('dox', 'Generate dox output ', function() {
    
    var filesSrc = grunt.file.expandFiles(this.file.src),
        dest = this.file.dest;
        //done = this.async();
    
    var files = filesSrc.map(function(file){
      return { src: file, dest: dest + file.replace(/\.js/,".json")}
    })

    grunt.utils.async.forEach( files,
      function dox(file, callback){
        exec('dox < ' + file.src, function(error, stout, sterr){
          grunt.file.write(file.dest, stout);
          grunt.log.writeln('File "' + file.src + '" doxxed.');
          if (!error) callback()
        })
      },
      function(err){
        done();
      })
  });  
};

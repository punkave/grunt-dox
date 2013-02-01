# grunt-dox

Dox grunt plugin to automatically generate documentation for you project. Currently generates HTML output using [dox-foundaiton](https://github.com/punkave/dox-foundation)

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-dox`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-dox');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Inside of your grunt file, add:
```javascript
dox: {
  files: {
    src: ['js/lib/'],
    dest: 'docs'
  }
},
```

This will run all of your files in `lib` through dox and dox-foundation and  put the output in `docs`.

Since the `grunt-dox` task is a multi task, you can create several tasks for dox:

```js
dox: {
  libdocs :{
    files: {
      src: ['js/lib/'],
      dest: 'docs'
    }
  },
  sourcedocs :{
    files: {
      src: ['js/src/'],
      dest: 'docs'
    }
  }
},
```

**Note:** This will completely delete and recreate the docs folder

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* **0.1.0**: Initial release
* **0.2.0**: Pass multiple files at once. Use dox-foundation for html output
* **0.3.0**: Now relies solely on folder parsing done by dox-foundation v0.4

## License
Copyright (c) 2012 P'unk Ave
Licensed under the MIT license.

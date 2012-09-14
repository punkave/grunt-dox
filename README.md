# grunt-dox

Dox grunt plugin

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
    src: ['dir/*', '*.js'],
    dest: 'docs/'
  }
},
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* **0.1.0**: Initial release

## License
Copyright (c) 2012 P'unk Ave
Licensed under the MIT license.

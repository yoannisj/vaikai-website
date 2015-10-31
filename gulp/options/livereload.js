// livereload options
// @link https://github.com/vohof/gulp-livereload#options-optional

module.exports = function(config, env) {

  return {
    // Static connect server
    host: 'localhost',
    port: 35729,
    // Path to prepend all given paths
    basePath: '',
    // Whether to automatically start listening
    // when running `livereload()`
    start: true,
    // Whether to log activity in the command line
    quiet: false
  };

};
var path = require('path');
var importOnce = require('node-sass-import-once');

// sass compiling options - more infos:
// @link https://github.com/dlmanning/gulp-sass
// @link https://github.com/sass/node-sass#options
// @link https://github.com/at-import/node-sass-import-once
module.exports = function(config, env) {
  return {
    // choose syle of CSS output
    // - minified in task when --dev flag is set
    outputStyle: env.dev ? 'expanded' : 'compressed',
    // add path to source file on on top of all css blocks
    sourceComments: env.dev,
    // custom importer to import scss files only once in each compiled css file
    importer: importOnce,
    // importOnce options
    importOnce: {
      // search in bower_components folder
      bower: true,
      // import css files as well
      css: true
    },
    // add include paths in case files can not be found automatically
    includePaths: [
      // allow imports relative to the project's src folder
      path.resolve(config.paths.src),
      // allow imports relative to the stylesheets base folder
      path.resolve(config.tasks.stylesheets.paths.base),
      // fix importing sassy-cast and calls to '@import' inside of sassy-cast
      path.resolve(config.paths.bower, './sassy-cast/stylesheets/'),
      path.resolve(config.paths.bower, './sassy-cast/stylesheets/private'),
      path.resolve(config.paths.bower, './sassy-cast/stylesheets/public'),
    ],
    // number of digits after the comma in output values
    // - defaults to 5, bootstrap-sass requires at least 8
    precision: 5
  };

};
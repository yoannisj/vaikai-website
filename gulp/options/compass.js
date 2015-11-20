var path = require('path');

// Options passed to the 'gulp-compass' plugin
// @link https://github.com/appleboy/gulp-compass#configuration

module.exports = function(config, env) {

  return {
    // The output style for the compiled css
    // - 'nested', 'expanded', 'compact', or 'compressed'
    style: env.dev ? 'expanded' : 'compressed',
    // Show line comments or not.
    comments: !!(env.dev),
    // Are assets relative
    relative: true,
    // The location where all your assets are store
    // - base for the following path options
    project: path.resolve(__dirname, '../../'),
    // The target directory where you keep your css stylesheets
    css: './' + config.tasks.stylesheets.paths.dest,
    // The source directory where you keep your sass stylesheets
    sass: './' + config.tasks.stylesheets.paths.base,
    // The directory where you keep your javascripts
    javascripts: './' + config.tasks.javascripts.paths.dest,
    // The directory where you keep your fonts
    font: './' + path.join(config.tasks.assets.paths.dest, 'fonts'),
    //  show/hide compile log message
    logging: true,
    // The directory where you keep external plugins and extensions
    // that you would like to make available using the @import function
    import_path: [
      // allow imports relative to the project's src folder
      path.resolve(config.paths.src),
    ],
    // Require the given Ruby library before running commands.
    // Used to access Compass plugins without using a 'config.rb' file
    require: [
      'compass-import-once',
      'sass-json-vars',
      'sass-aleksi',
      'shift',
      'sass-css-importer'
    ],
    // Run compass compile with bundle exec
    // - would run `bundle exec compass compile`
    bundle_exec: false,
    // Generate standard JSON source maps
    // - requires sass >= 3.3.3 and compass >= 1.0.1
    sourcemap: !!(env.dev),
    // Output sass debugging information using `@media` queries
    debug: false,
    // The environment mode used by compass for compilation
    environment: env.dev ? 'development' : 'production',
    // Set this to the root of your project when deployed
    http_path: config.paths.public,
    // Support --generated-images-path parameter.
    generated_images_path: false,
    // Support compass primary commands
    // - 'compile' or 'watch'
    task: 'compile'
  };

};
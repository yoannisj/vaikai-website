var path = require('path');

module.exports = function(config, env) {

  return {

    ui: false,
    port: 8080,
    server: {
      baseDir: config.paths.dest
    },
    files: (env.watch ? [
      path.join(config.paths.dest, '**/*.html'),
      path.join(config.paths.dest, 'css/**/*.css'),
      path.join(config.paths.dest, 'js/**/*.js'),
      path.join(config.paths.dest, 'images/**/*')
    ] : false),
    online: false,
    open: 'local',
    browser: 'google chrome',

  };

};
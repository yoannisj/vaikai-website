var gutil = require('gulp-util');

module.exports = function(config, env) {

  return {
    errorHandler: function(err) {
      gutil.log('error:', err.message);
    }
  };

};
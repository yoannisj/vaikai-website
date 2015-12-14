var slurp = require('../slurp');

module.exports = function(done) {

  return slurp.src('images', {
      base: slurp.config.paths.assets
    })
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('responsiveImages'))
    .pipe(slurp.dest('images'));
};
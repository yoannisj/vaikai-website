var slurp = require('../slurp');

module.exports = function(done) {

  return slurp.src('images')
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('responsiveImages'))
    .pipe(slurp.dest('images'));
};
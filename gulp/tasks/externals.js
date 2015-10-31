var slurp = require('../slurp');

module.exports = function(done) {

  return slurp.src('externals')
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('uglify'))
    .pipe(slurp.dest('externals'));

};
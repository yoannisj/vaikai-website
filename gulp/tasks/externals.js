var slurp = require('../slurp');

module.exports = function(done) {

  slurp.log('externals src', slurp.path('externals', 'main'));

  return slurp.src('externals')
    .pipe(slurp.debug())
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('uglify'))
    .pipe(slurp.dest('externals'));

};
var slurp = require('../slurp');

module.exports = function(done) {

  return slurp.src('assets', {
      base: slurp.path('assets', 'base')
    })
    .pipe(slurp.dest('assets'));

};
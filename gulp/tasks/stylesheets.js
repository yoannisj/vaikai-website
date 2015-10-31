var slurp = require('../slurp');

// compilation of stylesheets
function compileStylesheets() {
  return slurp.src('stylesheets')
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('sass'))
    .pipe(slurp.plugin('postcss'))
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('minifyCss'))
    .pipe(slurp.dest('stylesheets'))
    .pipe(slurp.env.watch ? slurp.plugin('livereload') : slurp.noop());
}

module.exports = function(done) {

  // compile and reload on every change in development
  if (slurp.env.watch) {
    // reload on compilation
    slurp.plugins.livereload.listen();
    // re-compile on file change
    slurp.watch('stylesheets', compileStylesheets);
  }

  // compile stylesheets
  return compileStylesheets();

};
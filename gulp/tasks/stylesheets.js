var slurp = require('../slurp');

// compilation of stylesheets
function compileStylesheets() {
  return slurp.src('stylesheets')
    .pipe(slurp.plumber())
    // .pipe(slurp.plugin('compass'))
    .pipe(slurp.plugin('sass'))
    .pipe(slurp.plugin('postcss'))
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('minifyCss'))
    .pipe(slurp.dest('stylesheets'));
}

module.exports = function(done) {
  // watch source files for re-compiling
  if (slurp.env.watch) {
    // re-compile on file change
    slurp.watch('stylesheets', compileStylesheets);
  }

  // compile stylesheets
  return compileStylesheets();
};
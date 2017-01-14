var path = require('path');
var es = require('event-stream');
var gulp = require('gulp');
var slurp = require('../slurp');
var filter = require('gulp-filter');

function fallbackImages() {
  // filter svg images only
  var svgSrc = path.join(slurp.path('images', 'base'), './**/*.svg');

  return gulp.src(svgSrc)
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('svg2png'))
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('imagemin'))
    .pipe(slurp.dest('images'));
}

function resizeImages() {
  // NOTE: paths recieved from templates/data are:
  // - relative to 'assets' folder for input
  // - relative to 'dest' folder for output

  return slurp.src('images', {
      base: slurp.config.paths.assets
    })
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('responsiveImages'))
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('imagemin'))
    .pipe(gulp.dest(slurp.config.paths.dest));
}

function copyImages() {

  var f = filter(['**/*', '!**/*.gif'], { restore: true });

  return slurp.src('images')
    .pipe(slurp.plumber())
    .pipe(f)
    .pipe(slurp.env.dev ? slurp.noop() : slurp.plugin('imagemin'))
    .pipe(f.restore)
    .pipe(slurp.dest('images'));
}

module.exports = function(done) {

  var tasks = [
    fallbackImages(),
    resizeImages(),
    copyImages()
  ];

  es.merge(tasks)
    .on('end', done);
};
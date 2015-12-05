var gulp = require('gulp');
var slurp = require('./gulp/slurp');
var del = require('del');

slurp.load('templates');
slurp.load('images', ['templates']);
slurp.load('stylesheets');
slurp.load('externals');
slurp.load('javascripts', ['externals']);
slurp.load('assets', ['images', 'stylesheets', 'javascripts']);

gulp.task('clean', function() {
  return del('www/**/*');
});

gulp.task('build', ['templates', 'assets']);
gulp.task('default', ['build']);
var gulp = require('gulp');
var slurp = require('./gulp/slurp');

slurp.load('templates');
slurp.load('stylesheets');
slurp.load('externals');
slurp.load('javascripts', ['externals']);
slurp.load('assets', ['stylesheets', 'javascripts']);

gulp.task('build', ['templates', 'assets']);
gulp.task('default', ['build']);
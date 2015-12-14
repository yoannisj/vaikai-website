var gulp = require('gulp');
var slurp = require('./gulp/slurp');

slurp.load('clean');
slurp.load('templates');
slurp.load('images', ['templates']);
slurp.load('stylesheets', ['templates']);
slurp.load('externals');
slurp.load('javascripts', ['externals']);
slurp.load('assets', ['images', 'stylesheets', 'javascripts']);

// super tasks
gulp.task('build', ['templates', 'assets']);
slurp.load('serve', ['build']);

// default task
gulp.task('default', ['serve']);
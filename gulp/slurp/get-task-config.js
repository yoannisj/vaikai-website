var path = require('path');
var _ = require('lodash');
var prependGlobPattern = require('../slurp/prepend-glob-pattern');

module.exports = function(config, task) {
  var defaults = {
    dir: {
      src: config.paths.src,
      dest: config.paths.dest
    },
    base: {
      src: './',
      dest: './'
    },
    files: {
      main: '*',
      watch: '**/*'
    }
  };

  // inject default values
  var taskConf = _.merge({}, defaults, config.tasks[task]);

  // normalize 'src' and 'dest' dir declarations
  if (typeof taskConf.dir == 'string') {
    taskConf.dir = {
      src: taskConf.dir,
      dest: taskConf.dir
    };
  }

  // normalize 'src' and 'dest' base declarations
  if (typeof taskConf.base == 'string') {
    taskConf.base = {
      src: taskConf.base,
      dest: taskConf.base
    };
  }

  // normalize 'main' and 'watch' files declarations
  if (typeof taskConf.files == 'string' || Array.isArray(taskConf.files)) {
    taskConf.files = {
      main: taskConf.files,
      watch: taskConf.files,
    };
  }

  // normalize paths
  taskConf.dir.src = path.normalize(taskConf.dir.src);
  taskConf.dir.dest = path.normalize(taskConf.dir.dest);
  taskConf.base.src = path.normalize(taskConf.base.src);
  taskConf.base.dest = path.normalize(taskConf.base.dest);

  // calculate full paths
  taskConf.paths = {};
  taskConf.paths.base = path.join(taskConf.dir.src, taskConf.base.src);
  taskConf.paths.dest = path.join(taskConf.dir.dest, taskConf.base.dest);
  taskConf.paths.main = prependGlobPattern(taskConf.files.main, taskConf.paths.base);
  taskConf.paths.watch = prependGlobPattern(taskConf.files.watch, taskConf.paths.base);

  return taskConf;

};
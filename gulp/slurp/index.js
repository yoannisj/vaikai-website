var path = require('path');
var _ = require('lodash');
var expander = require('expander');
var globule = require('globule');
var hasGlob = require('has-glob');
var arrayify = require('array-ify');
var requireDir = require('require-dir');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var loadConfig = require('./load-config');
var loadOptions = require('./load-options');
var tasksPath = '../tasks/';

var slurp = {};

// =UTILS
// =============================================================================

// store plugins installed via npm
slurp.plugins = plugins;

// expose utility gulp plugins
slurp.util = plugins.util;

// shortcut to useful gulp-util properties/methods
slurp.env = plugins.util.env;
slurp.log = plugins.util.log;
slurp.noop = plugins.util.noop;

// shortcut for gulp-if
slurp.if = plugins.if;

// shortcut for gulp-plumber
slurp.plumber = function(options) {
  var opts = options || slurp.defaults.plumber;
  return slurp.plugin('plumber', opts);
};

// better API for gulp-debug
slurp.debug = function(title) {
  title = _.trimRight(title, '::') + '::';
  return plugins.debug({ title: title || 'debug::' });
};

// =PROPERTIES
// =============================================================================

slurp.config = loadConfig(slurp.env);
slurp.defaults = loadOptions(slurp.config, slurp.env);
// property to store/cache all task functions
slurp.tasks = {};

// =METHODS
// =============================================================================

// shortcut to access a given task's setting
slurp.setting = function(task, setting) {
  return this.config.tasks[task][setting];
};

// shortcut to access a given task's path
slurp.path = function(task, path) {
  // allow passing multiple tasks
  if (Array.isArray(task)) {
    // by returning an array of paths using recursion
    return _.flatten(task.map(function(t) {
      return slurp.path(t, path);
    }));
  }

  return this.setting(task, 'paths')[path];
};

// returns options for a given plugin, optionally merging them
// with a hash of overriding options
slurp.options = function(plugin, overrides) {
  // get default plugin options
  var def = this.defaults[plugin];

  // if not overriding, return default options
  if (!overrides) return def;

  // if there are no default options, don't try overriding
  if (!def) return overrides;

  // if a function is passed, invoke with defaults and return results
  if (typeof overrides == 'function') {
    return overrides(def, plugin);
  }

  // concatenate array options
  else if (Array.isArray(overrides) && Array.isArray(overrides)) {
    return def.concat(overrides);
  }

  // merge object options (dont modify defaults)
  else if (typeof overrides == 'object' && typeof def == 'object') {
    return _.merge({}, def, overrides);
  }

  // if we could not merge, return overrides
  return overrides;
};

// shortcut method to invoke a gulp plugin
// - if no options are provided, if will default to the
// options exported by the './options/<plugin-name>' file
slurp.plugin = function(plugin) {
  // merge options
  var fn = this.plugins[plugin];

  // if options where passed, pass them to the plugin
  if (arguments.length > 1) {
    var args = [];
    for (var i = 1, ln = arguments.length; i < ln; i++) {
      args.push(arguments[i]);
    }

    return fn.apply(this.plugins, args);
  }

  // default to options from 'options' folder
  var def = this.defaults[plugin];
  return def ? fn(def) : fn();
};

// helper returning the path to a given task's file
slurp.getTaskPath = function(task, filename) {
  return path.join(tasksPath, filename || _.kebabCase(task) + '.js');
};

// verify if a given task exists in 'tasks' folder
// - checks for tasks cached in 'slurp.tasks' first
// - checks for task configuration in 'slurp.config.tasks' first
slurp.hasTask = function(task, filename) {
  // check if task was cached before
  if (this.tasks.hasOwnProperty(task)) return true;

  // check if task has configuration options
  if (this.config.tasks.hasOwnProperty(task)) return true;

  // check if task's file exists
  var file = globule.find(this.getTaskPath(task, filename), {
    cwd: __dirname
  });

  return !!(file.length);
};

// get a task function based on its name
// - checks for tasks cached in 'slurp.tasks' first
slurp.get = function(task, filename) {
  // allow omitting the 'task' argument by fetching all
  // tasks found in the 'tasks' directory
  if (!task) {
    var taskFiles = path.join(tasksPath, '*');
    globule.find(taskFiles).forEach(function(file) {
      var name = path.basename(file, path.extname(file));
      // load each task file as a task
      this.load(name, deps);
    });
  }

  // if task was requested before
  else if (this.tasks.hasOwnProperty(task)) {
    // return cached task function
    return this.tasks[task];
  }

  // return false if task name does not match
  else if (!this.hasTask(task, filename)) {
    return false;
  }

  // fetch task function by requiring the file in 'tasks'
  var taskFile = path.join(tasksPath, filename || _.kebabCase(task));
  var fn = require(taskFile);

  // cache the function for later access
  this.tasks[task] = fn;

  return fn;
};

// register a task with `gulp.task` and use task's config
slurp.load = function(task, deps, filename) {
  // allow omitting the 'deps' argument
  if (!Array.isArray(deps)) {
    filename = deps;
    deps = [];
  }

  // get task's main function
  var fn = this.get(task, filename);

  // register task with 'gulp.task'
  gulp.task(task, deps, fn);
};

// monkey patch `gulp.src` to automatically use task's config
slurp.src = function(task, options) {
  // dont try to match glob patterns against task names
  if (hasGlob(task)) {
    return gulp.main(task, options);
  }

  // allow passing an array of tasks by filtering out inexisting tasks
  task = arrayify(task).filter(function(t) {
    return slurp.hasTask(t);
  });

  // collect watch paths for given task(s)
  var main = this.path(task, 'main');

  return gulp.src(main, options);
};

// monkey patch `gulp.dest` to automatically use task's config
slurp.dest = function(task, options) {
  // if the task's argument doesn't match a configured task
  if (!this.hasTask(task)) {
    // simply delegate to gulp
    return gulp.dest(task, options);
  }

  var dest = this.path(task, 'dest');
  return gulp.dest.call(gulp, dest, options);
};

// monkey patch `gulp.watch` to automatically use task's config
slurp.watch = function(task, options, cb) {
  // allow omitting options
  if (typeof options == 'function' || Array.isArray(options)) {
    cb = options;
    options = {};
  }

  // dont try to match glob patterns against task names
  if (hasGlob(task)) {
    return gulp.watch(task, options, cb);
  }

  // allow passing an array of tasks by filtering out inexisting tasks
  task = arrayify(task).filter(function(t) {
    return slurp.hasTask(t);
  });

  // collect watch paths for given task(s)
  var watch = this.path(task, 'watch');

  return cb ? gulp.watch(watch, options, cb) :
    gulp.watch(watch, options, task);
};

// =EXPORTS
// =============================================================================

module.exports = slurp;
var path = require('path');
var _ = require('lodash');
var expander = require('expander');
var getTaskConfig = require('../slurp/get-task-config');
var config = require('../config');

module.exports = function(env) {
  // Get raw configuration object
  // - pass 'env' for dynamic configuration settings
  var config = require('../config')(env);

  // normalize task configurations
  _.forOwn(config.tasks, function(conf, task) {
    config.tasks[task] = getTaskConfig(config, task);
  });

  // export expander interface which provides access to resolved
  // values of recursive templates inside the config object
  // - invoke the interface without arguments will return
  //    the complete resolved config object
  return expander.interface(config, {
    imports: {
      _: _,
      path: path
    }
  })();

};
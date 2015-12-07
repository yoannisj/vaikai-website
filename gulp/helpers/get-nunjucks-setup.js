var path= require('path');
var _ = require('lodash');
var requireDir = require('require-dir');
var slurp = require('../slurp');

var getAppData = require('../helpers/get-data-app');
var getSettingsData = require('../helpers/get-data-settings');

module.exports = function() {

  // fetch global data
  var appData = getAppData();
  var settingsData = getSettingsData();

  // fetch nunjucks filters fron the 'lib' folder
  var libPath = path.join('../../', slurp.config.paths.lib),
    filtersPath = path.join(libPath, 'nunjucks/filters'),
    filters = requireDir(filtersPath);

  return function(env) {

    // add 'app' global with environment infos
    env.addGlobal('app', appData);

    // add a 'settings' global with all settings inside the 'settings' folder
    env.addGlobal('settings', settingsData);

    // add custom filters to the nunjucks 'env'
    _.forOwn(filters, function(getFilter, filename) {
      // get custom filter's name and function
      // - filenames are reformatted to respect nunjucks' syntax
      // - getter gives the filter function access to nunjucks' environment
      var name = _.kebabCase(filename).replace('-', '').toLowerCase(),
        fn = getFilter(env);

      env.addFilter(name, fn);
    });

    return env;
  };

};
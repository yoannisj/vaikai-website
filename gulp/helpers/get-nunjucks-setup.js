var _ = require('lodash');
var requireDir = require('require-dir');
var getWebsiteData = require('../helpers/get-website-data');
var getAppData = require('../helpers/get-app-data');

var filtersPath = '../lib/nunjucks/filters';
var filters = requireDir(filtersPath);

module.exports = function(data) {

  return function(env) {

    // add website global with website infos
    env.addGlobal('site', getWebsiteData());

    // add 'app' global with environment infos
    env.addGlobal('app', getAppData());

    // add custom filters to the nunjucks 'env'
    _.forOwn(filters, function(getFilter, filename) {
      // get custom filter's name and function
      // - getter gives it access to the nunjucks env
      var name = _.kebabCase(filename).replace('-', ''),
        fn = getFilter(env);

      env.addFilter(name, fn);
    });

    return env;
  };

};
var path= require('path');
var _ = require('lodash');
var requireDir = require('require-dir');
var slurp = require('../slurp');

var getAppData = require('../helpers/get-data-app');
var getContentData = require('../helpers/get-data-content');
var getWebsiteData = require('../helpers/get-data-website');

module.exports = function() {

  // fetch global data
  var appData = getAppData();
  var websiteData = getWebsiteData();
  var contentData = getContentData();

  // fetch nunjucks filters fron the 'lib' folder
  var libPath = path.join('../../', slurp.config.paths.lib),
    filtersPath = path.join(libPath, 'nunjucks/filters'),
    filters = requireDir(filtersPath);

  return function(env) {

    // add 'app' global with environment infos
    env.addGlobal('app', appData);

    // expose website infos under the 'site' global
    env.addGlobal('site', websiteData.website);

    // add website global with website infos
    env.addGlobal('data', websiteData);

    // add 'content' global with website's full content
    // TODO: add a query function instead ?
    env.addGlobal('content', contentData);

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
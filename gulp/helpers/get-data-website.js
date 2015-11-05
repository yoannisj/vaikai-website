var path = require('path');
var _ = require('lodash');
var slurp = require('../slurp');
var requireDir = require('require-dir');

// get information about website
module.exports = function() {
  // get data from the 'data' folder

  var dataPath = path.join('../../', slurp.config.paths.data);
  // var data = requireDir(dataPath, {
  //   camelcase: true
  // });
  var data = require(dataPath);

  // move the data inside the 'website.json' file to
  // the root of the returned object (=templating global)
  // CAUTION: keys inside the 'website.json' file will
  // override data in files with the same name
  if (data.hasOwnProperty('website')) {
    _.forOwn(data.website, function(value, key) {
      data[key] = value;
    });

    delete data.website;
  }

  return data;
};
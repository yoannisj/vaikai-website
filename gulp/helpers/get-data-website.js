var path = require('path');
var _ = require('lodash');
var slurp = require('../slurp');
var requireDir = require('require-dir');

function snakeKeys(obj) {
  var res = {};

  _.forOwn(obj, function(val, key) {
    var k = _.snakeCase(key);

    if (typeof val == 'object' && !Array.isArray(val)) {
      res[k] = snakeKeys(val);
    }

    else {
      res[k] = val;
    }

  });

  return res;
}

function rmDoubleQuotes(val) {
  if (Array.isArray(val)) {
    return val.map(function(v) {
      return rmDoubleQuotes(v);
    });
  }

  else if (typeof val == 'object') {
    var res = {};

    _.forOwn(val, function(v, k) {
      res[k] = rmDoubleQuotes(v);
    });

    return res;
  }

  return _.trim(val, "'\"");
}

// get information about website
module.exports = function() {
  // get data from the 'data' folder

  var dataPath = path.join('../../', slurp.config.paths.data);
  // var data = requireDir(dataPath, {
  //   camelcase: true
  // });
  var data = require(dataPath);

  // transform all keys into camelcase, recursively
  data = snakeKeys(data);

  // cleanup string's wrapped twice into quotes for sass-json-vars
  data = rmDoubleQuotes(data);

  // // move the data inside the 'website.json' file to
  // // the root of the returned object (=templating global)
  // // CAUTION: keys inside the 'website.json' file will
  // // override data in files with the same name
  // if (data.hasOwnProperty('website')) {
  //   _.forOwn(data.website, function(value, key) {
  //     data[key] = value;
  //   });

  //   delete data.website;
  // }

  return data;
};
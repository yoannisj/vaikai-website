var _ = require('lodash');

var transformKeys = module.exports = function(obj, letterCase, recursive) {

  // default to recursive == true
  if (recursive === undefined) recursive = true;

  var res = {};

  _.forOwn(obj, function(val, key) {
    var k = _[letterCase](key);

    // recursion
    if (recursive && typeof val == 'object' && !Array.isArray(val)) {
      res[k] = transformKeys(val, letterCase, recursive);
    }

    else {
      res[k] = val;
    }

  });

  return res;

};
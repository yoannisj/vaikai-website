var path = require('path');
var del = require('del');
var slurp = require('../slurp');

module.exports = function(done) {
  return del(slurp.config.paths.dest);
};
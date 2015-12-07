var slurp = require('../slurp');
var bs = require('browser-sync').create(slurp.config.serverName);

module.exports = function(done) {
  // start browser sync server
  bs.init(slurp.options('browserSync'));
};
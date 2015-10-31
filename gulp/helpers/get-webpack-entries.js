var path = require('path');
var globule = require('globule');
var slurp = require('../slurp');

module.exports = function() {

  var entries = {};

  globule.find(slurp.path('javascripts', 'main'))
    .map(function(file) {
      var name = path.basename(file, path.extname(file));

      entries[name] = './' + file;
    });

  return entries;

};
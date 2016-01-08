var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var jsonFile = require('jsonfile');

var slurp = require('../../../gulp/slurp');

// get path to settings file (where all ratios get saved)
var dataDir = slurp.config.paths.data,
  dataFile = path.join(dataDir, './image-ratios.json'),
  ratios = {};

// reset data file
mkdirp.sync(dataDir);
jsonFile.writeFileSync(dataFile, ratios);

module.exports = function(env) {

  // register ratio
  function registerRatio(dimensions) {
    var ratioId = _.uniqueId();

    // add new dimensions to ratios
    ratios[ratioId] = dimensions;

    // update ratioSettings (can be imported in sass, etc.)
    jsonFile.writeFileSync(dataFile, ratios, {
      spaces: 2
    });

    return ratioId;
  }

  return function(imgSize) {
    // allow passing a dimensions array or a path to an image
    var imgDimen = typeof imgSize == 'string' ? env.getFilter('imgsize')(imgPath) : imgSize,
      ratioId;

    if (imgDimen) {
      // get already registered ratio's id
      _.forOwn(ratios, function(dimen, id) {
        if (dimen[0] == imgDimen[0] && dimen[1] == imgDimen[1]) {
          ratioId = id;
        }
      });

      if (ratioId) return ratioId;

      // return ratio of registered id
      return registerRatio(imgDimen);
    }

    return null;
  };

};
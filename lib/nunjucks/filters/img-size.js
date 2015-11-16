var path = require('path');
var imgSize = require('image-size');

module.exports = function(env) {

  var assetsBase = env.getGlobal('app').paths.root;

  return function(imgpath) {

    var dimen = imgSize(path.join(assetsBase, imgpath));

    // return dimentions as an array or `[width, height]` valuces
    return [dimen.width, dimen.height];
  };

};
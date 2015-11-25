var path = require('path');
var imgSize = require('image-size');

module.exports = function(env) {

  var assetsBase = env.getGlobal('app').paths.images_src;

  return function(imgpath) {
    // don't try to find image size of external images
    if (imgpath.startsWith('http')) return;

    var dimen = imgSize(path.join(assetsBase, imgpath));

    // return dimensions as an array or `[width, height]` valuces
    return [dimen.width, dimen.height];
  };

};
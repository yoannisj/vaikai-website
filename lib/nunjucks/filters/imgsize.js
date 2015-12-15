var path = require('path');
var imgSize = require('image-size');

module.exports = function(env) {

  var assetsBase = env.getGlobal('app').paths.assets;

  return function(imgPath) {
    // don't try to find image size of external images
    // TODO: get image-size asynchronously (see 'image-size' doc)
    if (imgPath.startsWith('http')) return;

    var dimen;

    // if file was found, return image file's size
    try {
      dimen = imgSize(path.join(assetsBase, imgPath));
    // else return null
    } catch(e) {
      return null;
    }

    // return dimensions as an array of `[width, height]` values
    return [dimen.width, dimen.height];
  };

};
var path = require('path');
var _ = require('lodash');
var slurp = require('../../../gulp/slurp');

// get current 'gulp-responsive-images' configuration options
var imgSizes = slurp.options('responsiveImages');

// adds a configuration unit to 'gulp-responsive' options
function registerImageSize(imgPath, options) {

  // add to image's existing size config units
  if (imgSizes.hasOwnProperty(imgPath)) {
    imgSizes[imgPath].push(options);
  }

  // or add image to 'gulp-responsive' config with new size config unit
  else {
    imgSizes[imgPath] = new Array(options);
  }

  slurp.defaults.responsiveImages = imgSizes;
}

module.exports = function(env) {

  return function(imgPath, size, options) {
    // default options
    options = options || {};

    // allow passing 'auto' for width and height
    var width = size[0] == 'auto' ? null : size[0],
      height = size[1] == 'auto' ? null : size[1];

    // don't resize if not upscaling and given image's original
    // size is smaller than target size
    if (!options.upscale) {
      // get original image size
      var imgSize = env.getFilter('imgsize'),
        oSize = imgSize(imgPath);

      // verify if target size is bigger
      if ((width && width >= oSize.width) ||
        (height && height >= oSize.height)) {
        // if so, simply return original path
        return imgPath;
      }
    }

    var crop = !!(width && height),
      ext = path.extname(imgPath),
      base = path.dirname(imgPath) + '/' + path.basename(imgPath, ext),
      suffix = '-' + width + 'x' + height,
      rsPath = base + suffix + ext;

    options = _.assign(options, {
      width: width,
      height: height,
      suffix: suffix,
      crop: crop
    });

    registerImageSize(imgPath, options);

    return rsPath;
  };

};
var path = require('path');
var _ = require('lodash');
var jsonFile = require('jsonfile');

var slurp = require('../../../gulp/slurp');

module.exports = function(env) {

  // get path to settings file (where all sizes get saved)
  var dataFile = path.join(slurp.config.paths.data, 'image-sizes.json'),
    // get currently defined image sizes
    imgSizes = jsonFile.readFileSync(dataFile);

  // helper function that updates the 'images' setting file
  // with new image size
  function registerImageSize(imgPath, options) {

    // verify if options were already registered
    var sizesConfig = imgSizes[imgPath] || [],
      alreadyRegistered = false;

    // verify if options were already registered
    sizesConfig.forEach(function(sizeOptions) {
      if (_.isEqual(sizeOptions, options)) alreadyRegistered = true;
    });

    // and register new options only to avoid duplicates
    if (!alreadyRegistered) {
      sizesConfig.push(options);
    }

    // register new options
    imgSizes[imgPath] = sizesConfig;

    // register sizes in slurp (passed to 'responsive-images')
    slurp.defaults.responsiveImages = imgSizes;

    // update imgSizeSettings (can be imported in sass, etc.)
    jsonFile.writeFileSync(dataFile, imgSizes, {
      spaces: 2
    });
  }

  // filter function
  return function(imgPath, size, options) {

    var imgSizeFilter = env.getFilter('imgsize');

    // default options
    options = options || {};

    // allow passing 'auto' for width and height
    var width = size[0] == 'auto' ? null : size[0],
      height = size[1] == 'auto' ? null : size[1];

    // don't resize if not upscaling and given image's original
    // size is smaller than target size
    if (!options.upscale) {
      // get original image size
      var oSize = imgSizeFilter(imgPath);

      // verify if target size is bigger
      if ((width && width >= oSize.width) ||
        (height && height >= oSize.height)) {
        // if so, simply return original path
        return imgPath;
      }
    }

    // get all resizing options
    // if both width and height are given => crop image
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

    // register new image size so 'gulp-responsive' can resize it
    registerImageSize(imgPath, options);

    // return path to resized image
    return rsPath;
  };

};
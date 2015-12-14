// options passed to 'gulp-imagemin'
// @link https://www.npmjs.com/package/gulp-imagemin
// list of svgo plugins ('svgoPlugins' option)
// @link https://github.com/svg/svgo/tree/master/plugins
// list of imagemin plugins to use ('use' option)
// @link https://www.npmjs.com/browse/keyword/imageminplugin

module.exports = function(config, env) {

  return {
    // Select an optimization level between 0 and 7.
    optimizationLevel: 3,
    // Lossless conversion to progressive (jpeg).
    progressive: true,
    // Interlace gif for progressive rendering.
    interlaced: true,
    // Optimize svg multiple times until it's fully optimized.
    multipass: true,
    // Customize which SVGO plugins to use
    svgoPlugins: [],
    // Additional plugins to use with imagemin.
    use: null
  };

};
var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

module.exports = function(config, env) {

  return {
    root: './',

    // entry is dynamically resolved inside the 'javascripts'
    // task, based on the build configuration (allows using globs)
    // entry: './index.js',

    output: {
      filename: '[name].js',
      path: config.tasks.javascripts.paths.dest,
      publicPath: config.paths.public
    },

    resolve: {
      // add directories in which 'require' should also search for
      // - CAUTION: always resolve to absolute paths
      root: [
        // allow requiring files relative to the project's src folder
        path.resolve(config.paths.src),
        /// allow requiring files relative to the javascripts folder
        path.resolve(config.tasks.javascripts.paths.base)
      ],
      // add aliases to bower components here
      // - [key]: string used for aliasing
      // - [value]: absolute target path to resolve to
      alias: {}
    },

    // external libraries/modules, made available via a <script> tag in the html
    // - these can be required without being bundled or throwing an error
    externals: {
      jquery: "jQuery",
      modernizr: "Modernizr"
    },

    // devServer options are passed to the 'webpack-dev-server'
    // inside the 'javascripts' task
    devServer: {
      // Server
      host: 'localhost',
      port: 8080,
      publicPath: config.paths.public + '/' + _.trimLeft(config.tasks.javascripts.base.dest, '/'),
      // CAUTION: with the nodejs api, the 'webpack-dev-server' can't
      // be inlined - you still need to incude it using a <script> tag
      inline: true,
      stats: {
        colors: true
      }
    },

    debug: (!!env.dev),
    devtool: (env.dev ? 'source-map' : undefined),

    // additional plugins are added inside the 'javascripts' task,
    // based on the environment and build configuration
    plugins: [
      // automatically 'require' externals inside modules that
      // use them (also shims externals in dependencies that use them)
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Modernizr: 'modernizr',
        'window.Modernizr': 'modernizr'
      }),
      // bundle common modules inside the 'main' entry (or create it)
      new webpack.optimize.CommonsChunkPlugin('main', 'main.js', 2)
    ]

  };
};
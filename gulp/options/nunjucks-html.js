// gulp-nunjucks-html options - more infos:
// @link https://github.com/gianlucamancini/gulp-nunjucks-html#nunjucksoptions
module.exports = function(config, env) {

  return {
    dev: env.dev,
    searchPaths: ['./src/templates'],
    ext: '.html',
    // setup function get's loaded in 'templates' task
    // - gives access to slurp and its configuration
    // setUp: setupNunjucks
  };

};
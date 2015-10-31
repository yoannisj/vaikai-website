var slurp = require('../slurp');
var getTemplateData = require('../helpers/get-template-data');
var getNunjucksSetup = require('../helpers/get-nunjucks-setup');

var njOptions = slurp.options('nunjucksHtml', {
  setUp: getNunjucksSetup()
});

function compileTemplates() {
  return slurp.src('templates')
    .pipe(slurp.plumber())
    .pipe(slurp.plugin('data', getTemplateData))
    .pipe(slurp.plugin('nunjucksHtml', njOptions))
    .pipe(slurp.plugin('prettify'))
    .pipe(slurp.dest('templates'))
    .pipe(slurp.env.watch ? slurp.plugin('livereload') : slurp.noop());
}

// exports
module.exports = function(done) {

  if (slurp.env.watch) {
    slurp.watch('templates', compileTemplates);
  }

  return compileTemplates();

};
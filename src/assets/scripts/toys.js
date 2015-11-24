// require widgets
require('widgets/control');
require('widgets/popup');
require('widgets/gallery');
require('widgets/carousel');
require('widgets/toggle');

var MultiFold = require('widgets/multifold');

$('#features-list').widget(MultiFold, {
  scrollOffset: -80
});

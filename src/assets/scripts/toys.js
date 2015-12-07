// third-party
// require('scrollme');

// require widgets
require('widgets/control');
require('widgets/popup');
require('widgets/gallery');
require('widgets/carousel');
require('widgets/toggle');
require('widgets/video');

// require modules
require('modules/svg');

// multifold on features-list
var MultiFold = require('widgets/multifold');
$('#features-list').widget(MultiFold, {
  scrollOffset: -80
});
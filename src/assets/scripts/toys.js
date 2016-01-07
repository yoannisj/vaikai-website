// third-party
// require('scrollme');

// require modules
require('modules/lazy-object');
require('modules/svg');

// require widgets
require('widgets/control');
require('widgets/popup');
require('widgets/gallery');
require('widgets/carousel');
require('widgets/toggle');
require('widgets/video');

// multifold on features-list
var MultiFold = require('widgets/multifold');
$('#features-list').widget(MultiFold, {
  scrollOffset: -80
});

// autoplay avakai video
// - video plays when popup gets opened
var isMobile = require('utils/is-mobile')();
var $window = $(window);

// if (!isMobile && $window.width() >= 700) {
//   $('#intro-video').widget('popup').expand();
// }
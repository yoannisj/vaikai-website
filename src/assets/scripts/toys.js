// third-party
// require('scrollme');

// require widgets
require('widgets/control');
require('widgets/popup');
require('widgets/gallery');
require('widgets/carousel');
require('widgets/toggle');

// reuqire modules
require('modules/svg');
require('modules/video');

// multifold on features-list
var MultiFold = require('widgets/multifold');
$('#features-list').widget(MultiFold, {
  scrollOffset: -80
});

// fit objects in popups inside the screen
var ObjectFit = require('widgets/object-fit');
var $body = $('body');
var $window = $(window);

$body.on('expand', '.js-popup', function(ev) {
  var $obj = $(ev.currentTarget).find('.js-objfit');

  if ($obj.length) {

    console.log('expand popup with objfit!', $obj[0]);

    $obj.widget(ObjectFit, {
      container: $window,
      scale: 0.75,
      center: false
    });
  }

});
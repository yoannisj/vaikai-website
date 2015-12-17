require('modules/lazy-object');
require('modules/menu');
require('jquery/widget');

// fit objects in popups inside the screen
var ObjectFit = require('widgets/object-fit');
var $body = $('body');
var $window = $(window);

$body.on('expand', '.js-popup', function(ev) {
  var $obj = $(ev.currentTarget).find('.js-objfit');

  if ($obj.length) {
    $obj.widget(ObjectFit, {
      container: $window,
      scale: 0.75,
      center: false
    });
  }
});

$body.on('after', '.js-cycler', function(ev, cycler) {
  // if current cycler-item has a video element
  var $vid = cycler.$current.find('.js-video');

  if ($vid.length) {
    var vid = $vid.widget('video');

    console.log('play video inside cycler item!');

    // play video
    vid.play();

    // pause when leaving current slide
    cycler.$el.one('before', function(ev) {
      vid.pause();
    });
  }
});

$body.on('expand', '.js-popup', function(ev, popup) {
  // exclude video's inside cyclers inside popups
  // - these should only be played when their cycle-item is active
  var $vid = popup.$el.find('.js-video');

  if ($vid.length) {
    var vid = $vid.widget('video');

    if ($vid.not('.js-cycler .js-video').length) {
      console.log('play video inside popup!');
      // play video
      vid.play();
    }

    // pause when closing popup
    popup.$el.one('collapse', function(ev) {
      vid.pause();
    });
  }

});

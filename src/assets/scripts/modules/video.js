var $video = $('.js-video');
var $body = $('body');

$video.on('play', function(ev) {
  var $el = $(this),
    $player = $el.find('.js-video-player'),
    playMsg = JSON.stringify({
      method: 'play'
    });

  $player[0].contentWindow.postMessage(playMsg, '*');
});

$video.on('stop', function(ev) {
  var $el = $(this),
    $player = $el.find('.js-video-player'),
    pauseMsg = JSON.stringify({
      method: 'pause'
    }),
    rewindMsg = JSON.stringify({
      method: 'seekTo',
      value: '00:00'
    });

  $player[0].contentWindow.postMessage(pauseMsg, '*');
  $player[0].contentWindow.postMessage(rewindMsg, '*');
});

// start playing video's inside popup widgets on 'expand'
$body.on('expand.video', '.has-popup', function(ev) {

  console.log('expand popup')

  var $popup = $(ev.currentTarget),
    $vid = $popup.find('.js-video');

  // if popup has a video AND video is not inside cycler/carousel/slider
  if ($vid.length && $vid.closest('.js-cycler, .js-gallery-cycler, .js-carousel, .js-slider').length == 0) {

    console.log('popup with video!');

    $vid.trigger('play');

    // stop video on 'collapse'
    $popup.one('collapse.video', function(ev) {
      $vid.trigger('stop');
    });
  }

});

// start playing videos inside gallery widgets on 'open/slide'
$body.on('before', '.js-gallery-cycler', function(ev, cycler, index) {

  console.log('before cycle!');

  var $target = cycler.$items.eq(index),
    $vid = $target.find('.js-video');

  if ($vid.length) {

    console.log('cycle item with video!');

    $vid.trigger('play');

    cycler.$el.one('before', function(ev) {
      $vid.trigger('stop');
    });
  }

});
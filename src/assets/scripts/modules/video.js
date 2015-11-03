var $ = require('jquery');
var $video = $('.js-video');

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
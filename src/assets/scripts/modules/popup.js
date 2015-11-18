var $ = require('jquery');
var $body = $('body');
var $popup = $('.popup');

require('modules/video');

$popup.on('toggle', function(ev) {
  var $lb = $(this);
  $lb.trigger( $lb.hasClass('active') ? 'close': 'open' );
});

$popup.on('open', function(ev) {
  var $el = $(this),
    $video = $el.find('.js-video');

  $body.css('overflow', 'hidden');
  $el.addClass('active');

  if($video.length) {
    $video.trigger('play');
  }

  $el.one('click.popup', '.popup-close, .popup-backdrop', function(ev) {
    ev.preventDefault();
    $el.trigger('close');
  });
});

$popup.on('close', function(ev) {
  var $el = $(this),
    $video = $el.find('.js-video');

  $body.css('overflow', '');
  $el.removeClass('active');
  $el.off('click.popup', '.popup-close, .popup-backdrop');

  if($video.length) {
    $video.trigger('stop');
  }

});

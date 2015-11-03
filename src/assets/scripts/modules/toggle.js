var $ = require('jquery');
var $toggle = $('.js-toggle');

$toggle.on('click.toggle', function(ev) {

  ev.preventDefault();

  var $el = $(this),
    $target = $( $el.attr('data-target') || $el.attr('href') );

  console.log('toggled target::', $target[0]);

  $target.trigger('toggle');

  if ($el.hasClass('is-on')) {
    $el.removeClass('is-on').addClass('is-off');
  }

  else if ($el.hasClass('is-off')) {
    $el.removeClass('is-off').addClass('is-on');
  }
});

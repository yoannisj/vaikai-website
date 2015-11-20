var $ = require('jquery');
var $body =$('body');
var $menu = $('.menu');

$menu.on('toggle', function(ev) {
  $(this).trigger( $body.hasClass('has-menu-open') ? 'close': 'open' );
});

$menu.on('open', function(ev) {

  $body.addClass('has-menu-open');
  $menu.on('click.menu', '.menu-backdrop', function(ev) {
    $menu.trigger('close');
  });
});

$menu.on('close', function(ev) {
  $body.removeClass('has-menu-open');
  $menu.off('click.menu');
});

$('.js-toggle[data-target*="#menu"]').on('click', function(ev) {
  ev.preventDefault();
  $menu.trigger('toggle');

  var $tgl = $(this);
  if ($tgl.hasClass('is-on')) {
    $tgl.removeClass('is-on').addClass('is-off');
  }

  else {
    $tgl.removeClass('is-off').addClass('is-on');
  }

});

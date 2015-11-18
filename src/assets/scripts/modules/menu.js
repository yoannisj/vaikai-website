var $ = require('jquery');
var $body =$('body');
var $menu = $('.menu');

require('modules/toggle');

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
